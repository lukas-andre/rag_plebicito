import { createClient } from '@supabase/supabase-js'
import { createHash } from 'crypto'
import dotenv from 'dotenv'
import { ObjectExpression } from 'estree'
import { readdir, readFile, stat } from 'fs/promises'
import GithubSlugger from 'github-slugger'
import { Content, Root } from 'mdast'
import { fromMarkdown } from 'mdast-util-from-markdown'
import { mdxFromMarkdown, MdxjsEsm } from 'mdast-util-mdx'
import { toMarkdown } from 'mdast-util-to-markdown'
import { toString } from 'mdast-util-to-string'
import { mdxjs } from 'micromark-extension-mdxjs'
import 'openai'
import { Configuration, OpenAIApi } from 'openai'
import { basename, dirname, join } from 'path'
import pdf from 'pdf-parse'
import { u } from 'unist-builder'
import { filter } from 'unist-util-filter'
import { inspect } from 'util'
import yargs from 'yargs'

dotenv.config()

const ignoredFiles = ['pages/404.mdx']

/**
 * Extracts ES literals from an `estree` `ObjectExpression`
 * into a plain JavaScript object.
 */
function getObjectFromExpression(node: ObjectExpression) {
  return node.properties.reduce<
    Record<string, string | number | bigint | true | RegExp | undefined>
  >((object, property) => {
    if (property.type !== 'Property') {
      return object
    }

    const key =
      (property.key.type === 'Identifier' && property.key.name) || undefined
    const value =
      (property.value.type === 'Literal' && property.value.value) || undefined

    if (!key) {
      return object
    }

    return {
      ...object,
      [key]: value,
    }
  }, {})
}

/**
 * Extracts the `meta` ESM export from the MDX file.
 *
 * This info is akin to frontmatter.
 */
function extractMetaExport(mdxTree: Root) {
  const metaExportNode = mdxTree.children.find((node): node is MdxjsEsm => {
    return (
      node.type === 'mdxjsEsm' &&
      node.data?.estree?.body[0]?.type === 'ExportNamedDeclaration' &&
      node.data.estree.body[0].declaration?.type === 'VariableDeclaration' &&
      node.data.estree.body[0].declaration.declarations[0]?.id.type ===
        'Identifier' &&
      node.data.estree.body[0].declaration.declarations[0].id.name === 'meta'
    )
  })

  if (!metaExportNode) {
    return undefined
  }

  const objectExpression =
    (metaExportNode.data?.estree?.body[0]?.type === 'ExportNamedDeclaration' &&
      metaExportNode.data.estree.body[0].declaration?.type ===
        'VariableDeclaration' &&
      metaExportNode.data.estree.body[0].declaration.declarations[0]?.id
        .type === 'Identifier' &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].id.name ===
        'meta' &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].init
        ?.type === 'ObjectExpression' &&
      metaExportNode.data.estree.body[0].declaration.declarations[0].init) ||
    undefined

  if (!objectExpression) {
    return undefined
  }

  return getObjectFromExpression(objectExpression)
}

/**
 * Splits a `mdast` tree into multiple trees based on
 * a predicate function. Will include the splitting node
 * at the beginning of each tree.
 *
 * Useful to split a markdown file into smaller sections.
 */
function splitTreeBy(tree: Root, predicate: (node: Content) => boolean) {
  return tree.children.reduce<Root[]>((trees, node) => {
    const [lastTree] = trees.slice(-1)

    if (!lastTree || predicate(node)) {
      const tree: Root = u('root', [node])
      return trees.concat(tree)
    }

    lastTree.children.push(node)
    return trees
  }, [])
}

type Meta = ReturnType<typeof extractMetaExport>

type Section = {
  content: string
  heading?: string
  slug?: string
}

type ProcessedMdx = {
  checksum: string
  meta: Meta
  sections: Section[]
}

/**
 * Processes MDX content for search indexing.
 * It extracts metadata, strips it of all JSX,
 * and splits it into sub-sections based on criteria.
 */
function processMdxForSearch(content: string): ProcessedMdx {
  const checksum = createHash('sha256').update(content).digest('base64')

  const mdxTree = fromMarkdown(content, {
    extensions: [mdxjs()],
    mdastExtensions: [mdxFromMarkdown()],
  })

  const meta = extractMetaExport(mdxTree)

  // Remove all MDX elements from markdown
  const mdTree = filter(
    mdxTree,
    (node) =>
      ![
        'mdxjsEsm',
        'mdxJsxFlowElement',
        'mdxJsxTextElement',
        'mdxFlowExpression',
        'mdxTextExpression',
      ].includes(node.type),
  )

  if (!mdTree) {
    return {
      checksum,
      meta,
      sections: [],
    }
  }

  const sectionTrees = splitTreeBy(mdTree, (node) => node.type === 'heading')

  const slugger = new GithubSlugger()

  const sections = sectionTrees.map((tree) => {
    const [firstNode] = tree.children

    const heading =
      firstNode.type === 'heading' ? toString(firstNode) : undefined
    const slug = heading ? slugger.slug(heading) : undefined

    return {
      content: toMarkdown(tree),
      heading,
      slug,
    }
  })

  return {
    checksum,
    meta,
    sections,
  }
}

async function processPDFForSearch(pdfBuffer: Buffer): Promise<ProcessedMdx> {
  // Extraer texto del PDF
  const content = await pdf(pdfBuffer)

  const checksum = createHash('sha256').update(content.text).digest('base64')

  // Aquí, asumimos que el contenido del PDF no es MDX, por lo que no necesitamos procesarlo como tal.
  // Sin embargo, si el PDF tiene una estructura específica que quieras procesar, deberás adaptar este código.

  // Usamos el contenido completo del PDF como una única sección para simplificar.
  // Si tu PDF tiene una estructura de encabezados que quieras dividir en secciones, deberás adaptar este código.
  const slugger = new GithubSlugger()
  const slug = slugger.slug(content.info.title || 'pdf-document')

  const sections = [
    {
      content: content.text,
      heading: content.info.title || 'PDF Document',
      slug,
    },
  ]

  return {
    checksum,
    // Meta puede incluir información adicional del PDF, como el título, autor, etc.
    meta: {
      title: content.info.title,
      author: content.info.author,
      // ... puedes agregar más metadatos aquí
    },
    sections,
  }
}

type WalkEntry = {
  path: string
  parentPath?: string
}

async function walk(dir: string, parentPath?: string): Promise<WalkEntry[]> {
  const immediateFiles = await readdir(dir)

  const recursiveFiles = await Promise.all(
    immediateFiles.map(async (file) => {
      const path = join(dir, file)
      const stats = await stat(path)
      if (stats.isDirectory()) {
        // Keep track of document hierarchy (if this dir has corresponding doc file)
        const docPath = `${basename(path)}.mdx`

        return walk(
          path,
          immediateFiles.includes(docPath)
            ? join(dirname(path), docPath)
            : parentPath,
        )
      } else if (stats.isFile()) {
        return [
          {
            path: path,
            parentPath,
          },
        ]
      } else {
        return []
      }
    }),
  )

  const flattenedFiles = recursiveFiles.reduce(
    (all, folderContents) => all.concat(folderContents),
    [],
  )

  return flattenedFiles.sort((a, b) => a.path.localeCompare(b.path))
}

abstract class BaseEmbeddingSource {
  checksum?: string
  meta?: Meta
  sections?: Section[]

  constructor(
    public source: string,
    public path: string,
    public parentPath?: string,
  ) {}

  abstract load(): Promise<{
    checksum: string
    meta?: Meta
    sections: Section[]
  }>
}

class MarkdownEmbeddingSource extends BaseEmbeddingSource {
  type: 'markdown' = 'markdown'

  constructor(
    source: string,
    public filePath: string,
    public parentFilePath?: string,
  ) {
    const path = filePath.replace(/^pages/, '').replace(/\.mdx?$/, '')
    const parentPath = parentFilePath
      ?.replace(/^pages/, '')
      .replace(/\.mdx?$/, '')

    super(source, path, parentPath)
  }

  async load() {
    const contents = await readFile(this.filePath, 'utf8')
    const { checksum, meta, sections } = processMdxForSearch(contents)

    console.log(`[${this.path}] Loaded ${sections.length} page sections`)
    console.log(`[${this.path}] Checksum: ${checksum}`)
    console.log(`[${this.path}] Meta: ${meta}`)
    this.checksum = checksum
    this.meta = meta
    this.sections = sections

    return {
      checksum,
      meta,
      sections,
    }
  }
}

class PDFEmbeddingSource extends BaseEmbeddingSource {
  type: 'pdf' = 'pdf'

  constructor(
    source: string,
    public filePath: string,
  ) {
    const path = filePath.replace(/^pages/, '').replace(/\.pdf$/, '')
    super(source, path)
  }

  async load() {
    const content = await readFile(this.filePath)
    const { checksum, meta, sections } = await processPDFForSearch(content)

    return {
      checksum,
      sections,
      meta,
    }
  }
}

type EmbeddingSource = MarkdownEmbeddingSource | PDFEmbeddingSource

async function generateEmbeddings() {
  const argv = await yargs.option('refresh', {
    alias: 'r',
    description: 'Refresh data',
    type: 'boolean',
  }).argv

  const shouldRefresh = argv.refresh

  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.OPENAI_KEY
  ) {
    return console.log(
      'Environment variables NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_KEY are required: skipping embeddings generation',
    )
  }

  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    },
  )
  console.log('Connected to Supabase')

  const embeddingSources: EmbeddingSource[] = [
    ...(await walk('pages'))
      .filter(({ path }) => /\.mdx?$|\.pdf$/.test(path))
      .filter(({ path }) => !ignoredFiles.includes(path))
      .map((entry) => {
        if (entry.path.endsWith('.mdx') || entry.path.endsWith('.md')) {
          return new MarkdownEmbeddingSource(
            'guide',
            entry.path,
            entry.parentPath,
          )
        } else if (entry.path.endsWith('.pdf')) {
          return new PDFEmbeddingSource('guide', entry.path)
        } else {
          throw new Error(`Unexpected file extension for ${entry.path}`)
        }
      }),
  ]

  console.log(`Discovered ${embeddingSources.length} pages`)

  if (!shouldRefresh) {
    console.log('Checking which pages are new or have changed')
  } else {
    console.log('Refresh flag set, re-generating all pages')
  }

  for (const embeddingSource of embeddingSources) {
    const { type, source, path, parentPath } = embeddingSource

    try {
      const { checksum, meta, sections } = await embeddingSource.load()

      // Check for existing page in DB and compare checksums
      const { error: fetchPageError, data: existingPage } = await supabaseClient
        .from('nods_page')
        .select('id, path, checksum, parentPage:parent_page_id(id, path)')
        .filter('path', 'eq', path)
        .limit(1)
        .maybeSingle()

      // if (fetchPageError) {
      //   throw fetchPageError
      // }

      type Singular<T> = T extends any[] ? undefined : T
      // We use checksum to determine if this page & its sections need to be regenerated
      if (!shouldRefresh && existingPage?.checksum === checksum) {
        const existingParentPage = existingPage?.parentPage as Singular<
          typeof existingPage.parentPage
        >

        // If parent page changed, update it
        if (existingParentPage?.path !== parentPath) {
          console.log(
            `[${path}] Parent page has changed. Updating to '${parentPath}'...`,
          )
          const { error: fetchParentPageError, data: parentPage } =
            await supabaseClient
              .from('nods_page')
              .select()
              .filter('path', 'eq', parentPath)
              .limit(1)
          // .maybeSingle()

          if (fetchParentPageError) {
            throw fetchParentPageError
          }

          console.log({ fetchParentPageError, parentPage })

          const { error: updatePageError } = await supabaseClient
            .from('nods_page')
            .update({ parent_page_id: parentPage[0]?.id })
            .filter('id', 'eq', existingPage.id)

          if (updatePageError) {
            throw updatePageError
          }
        }

        console.log(`[${path}] Page has not changed, skipping`)
        continue
      }

      if (existingPage) {
        console.log(
          `[${path}] Page has changed. Removing old page sections and their embeddings...`,
        )
        if (!shouldRefresh) {
          console.log(
            `[${path}] Docs have changed, removing old page sections and their embeddings`,
          )
        } else {
          console.log(
            `[${path}] Refresh flag set, removing old page sections and their embeddings`,
          )
        }
        console.log('Deleting page sections')
        console.log({ existingPage })

        const { error: deletePageSectionError } = await supabaseClient
          .from('nods_page_section')
          .delete()
          .filter('page_id', 'eq', existingPage.id)

        console.log({ deletePageSectionError })

        if (deletePageSectionError) {
          throw deletePageSectionError
        }
      }

      const {
        error: fetchParentPageError,
        data: parentPage,
        count: selectedCount,
      } = await supabaseClient
        .from('nods_page')
        .select()
        .filter('path', 'eq', parentPath)
        .limit(1)
        .maybeSingle()

      console.log({ fetchParentPageError, parentPage, selectedCount })

      if (selectedCount && selectedCount > 1) {
        throw fetchParentPageError
      }

      // Create/update page record. Intentionally clear checksum until we
      // have successfully generated all page sections.
      const {
        error: upsertPageError,
        data: page,
        count: upsertCount,
      } = await supabaseClient
        .from('nods_page')
        .upsert(
          {
            checksum: null,
            path,
            type,
            source,
            meta,
            parent_page_id: parentPage?.id,
          },
          { onConflict: 'path' },
        )
        .select()
        .limit(1)
        .single()

      console.log({ upsertPageError, page })

      if (upsertCount && upsertCount != 1) {
        throw upsertPageError
      }

      console.log(
        `[${path}] Adding ${sections.length} page sections (with embeddings)`,
      )
      for (const { slug, heading, content } of sections) {
        // OpenAI recommends replacing newlines with spaces for best results (specific to embeddings)
        const input = content.replace(/\n/g, ' ')

        try {
          const configuration = new Configuration({
            apiKey: process.env.OPENAI_KEY,
          })
          const openai = new OpenAIApi(configuration)

          const embeddingResponse = await openai.createEmbedding({
            model: 'text-embedding-ada-002',
            input,
          })

          if (embeddingResponse.status !== 200) {
            throw new Error(inspect(embeddingResponse.data, false, 2))
          }

          const [responseData] = embeddingResponse.data.data

          const { error: insertPageSectionError, data: pageSection } =
            await supabaseClient
              .from('nods_page_section')
              .insert({
                page_id: page?.id,
                slug,
                heading,
                content,
                token_count: embeddingResponse.data.usage.total_tokens,
                embedding: responseData.embedding,
              })
              .select()
              .limit(1)
              .single()

          if (insertPageSectionError) {
            throw insertPageSectionError
          }
        } catch (err) {
          // TODO: decide how to better handle failed embeddings
          console.error(
            `Failed to generate embeddings for '${path}' page section starting with '${input.slice(
              0,
              40,
            )}...'`,
          )

          throw err
        }
      }

      // Set page checksum so that we know this page was stored successfully
      const { error: updatePageError } = await supabaseClient
        .from('nods_page')
        .update({ checksum })
        .filter('id', 'eq', page?.id)

      if (updatePageError) {
        throw updatePageError
      }
    } catch (err) {
      console.error(
        `Page '${path}' or one/multiple of its page sections failed to store properly. Page has been marked with null checksum to indicate that it needs to be re-generated.`,
      )
      console.error(err)
    }
  }

  console.log('Embedding generation complete')
}

async function main() {
  await generateEmbeddings()
}

main().catch((err) => console.error(err))
