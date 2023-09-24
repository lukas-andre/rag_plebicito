import { createRouteHandlerClient } from '@supabase/auth-helpers-nextjs';
import dotenv from 'dotenv';
import { cookies } from 'next/headers';
import { NextRequest, NextResponse } from 'next/server';

dotenv.config();

export async function POST(request: NextRequest) {
  const formData = await request.formData();
  const file: File | null = formData.get('file') as unknown as File;
  const userId = formData.get('userId') as unknown as string;

  console.log({ file, userId });

  if (!file) {
    return NextResponse.json({ success: false, message: 'No file' });
  }

  if (!userId) {
    return NextResponse.json({ success: false, message: 'No user id' });
  }

  const supabase = createRouteHandlerClient({ cookies });

  // const userResponse = await supabase.auth.getUser()

  // if (userResponse.error) {
  //     console.log(userResponse.error)
  //     return NextResponse.json({ success: false })
  // }

  // if (!userResponse.data) {
  //     console.log('No user data')
  //     return NextResponse.json({ success: false })
  // }

  const { data, error } = await supabase.storage
    .from('documents')
    .upload(`${userId}/${file.name}`, file);

  console.log({ data });
  console.log({ error });

  return NextResponse.json({ success: true });
}

// async function generatePDFEmbeddings() {
//     if (
//         !process.env.NEXT_PUBLIC_SUPABASE_URL ||
//         !process.env.SUPABASE_SERVICE_ROLE_KEY ||
//         !process.env.OPENAI_KEY
//     ) {
//         return console.log(
//             'Environment variables NEXT_PUBLIC_SUPABASE_URL, SUPABASE_SERVICE_ROLE_KEY, and OPENAI_KEY are required: skipping pdf embeddings generation'
//         )
//     }

//     const loader = new PDFLoader('/Users/Ihenry/Lucas/IA/nextjs-openai-doc-search/pages/docs/RICE  OBISPO ALVEAR 2023 OFICIAL modif 20072023.pdf');

//     console.log('Loading PDF...')

//     const docs = await loader.load();

//     const supabaseClient = createClient(
//         process.env.NEXT_PUBLIC_SUPABASE_URL,
//         process.env.SUPABASE_SERVICE_ROLE_KEY,
//         {
//             auth: {
//                 persistSession: false,
//                 autoRefreshToken: false,
//             },
//         }
//     )

//     console.log('Generating embeddings...')

//     const embeddings = new OpenAIEmbeddings({
//         openAIApiKey: process.env.OPENAI_KEY
//     })

//     console.log('Storing embeddings...')

//     const dbConfig: SupabaseLibArgs = {
//         client: supabaseClient,
//         queryName: 'match_documents',
//         tableName: 'documents'
//     }

//     await SupabaseVectorStore.fromDocuments(docs, embeddings, dbConfig);

//     console.log('Done!')
// }

// async function main() {
//     await generatePDFEmbeddings()
// }

// main().catch((err) => console.error(err))
