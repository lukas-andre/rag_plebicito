import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { Document } from 'langchain/dist/document';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import {
  SupabaseLibArgs,
  SupabaseVectorStore,
} from 'langchain/vectorstores/supabase';
import openaiTokenCounter from 'openai-gpt-token-counter';

dotenv.config();

const EMBEDDINGS_MAX_TOKENS = 8192;

function splitText(text: string, maxTokens: number) {
  const words = text.split(' ');
  let part = '';
  const parts = [];

  for (const word of words) {
    if (openaiTokenCounter.text(part + word, 'gpt-3.5-turbo') <= maxTokens) {
      part += `${word} `;
    } else {
      parts.push(part.trim());
      part = `${word} `;
    }
  }

  if (part) parts.push(part.trim());

  return parts;
}

async function generatePDFEmbeddings() {
  if (
    !process.env.NEXT_PUBLIC_SUPABASE_URL ||
    !process.env.SUPABASE_SERVICE_ROLE_KEY ||
    !process.env.OPENAI_KEY
  ) {
    return console.log(
      'Environment variables NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_KEY are required: skipping pdf embeddings generation'
    );
  }

  const loader = new PDFLoader(
    '/Users/Ihenry/Lucas/IA/plebicito2023/data/Propuesta-Nueva-Constitucion.pdf',
    {
      splitPages: false
    }
  );

  console.log('Loading PDF...');

  const docs = await loader.load();
  const splitedDocs: Document[] = [];
  const pageText = docs[0].pageContent.replace(/\n/g, ' ');
  const articlePattern = /(Artículo \d+[\.:]?)/;
  const articles = pageText.split(articlePattern).filter(text => text.trim() !== '');

  for (let i = 1; i < articles.length; i += 2) {
    if (articles[i + 1] === undefined) {
      continue;
    }
    console.log(`Spliting article ${articles[i]}...`);

    splitedDocs.push({
      metadata: {
        article: articles[i],
      },
      pageContent: articles[i] + ' ' + articles[i + 1],
    });
  }

  console.log('Spliting docs...');
  for (let i = 0; i < splitedDocs.length; i++) {
    const doc = splitedDocs[i];
    const tokenCount = openaiTokenCounter.text(doc.pageContent, 'gpt-3.5-turbo');
    if (tokenCount > EMBEDDINGS_MAX_TOKENS) {
      const parts = splitText(doc.pageContent, EMBEDDINGS_MAX_TOKENS);
      splitedDocs.splice(i, 1);
      parts.forEach((part, index) => {
        splitedDocs.push({
          metadata: {
            article: `${doc.metadata.article} - Parte ${index + 1}`
          },
          pageContent: part
        });
      });

      i += parts.length - 1;
    }
  }

  const supabaseClient = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL,
    process.env.SUPABASE_SERVICE_ROLE_KEY,
    {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    }
  );

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_KEY,
  });

  const dbConfig: SupabaseLibArgs = {
    client: supabaseClient,
    queryName: 'match_documents',
    tableName: 'documents',
  };

  console.log('Saving embeddings...');
  await SupabaseVectorStore.fromDocuments(splitedDocs, embeddings, dbConfig);

  console.log('Done!');
}

async function main() {
  await generatePDFEmbeddings();
}

main().catch((err) => console.error(err));
