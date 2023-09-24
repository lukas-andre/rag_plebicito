import { createClient } from '@supabase/supabase-js';
import dotenv from 'dotenv';
import { PDFLoader } from 'langchain/document_loaders/fs/pdf';
import { OpenAIEmbeddings } from 'langchain/embeddings/openai';
import {
  SupabaseLibArgs,
  SupabaseVectorStore,
} from 'langchain/vectorstores/supabase';

dotenv.config();

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
    '/Users/Ihenry/Lucas/IA/nextjs-openai-doc-search/pages/docs/RICE  OBISPO ALVEAR 2023 OFICIAL modif 20072023.pdf'
  );

  console.log('Loading PDF...');

  const docs = await loader.load();

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

  console.log('Generating embeddings...');

  const embeddings = new OpenAIEmbeddings({
    openAIApiKey: process.env.OPENAI_KEY,
  });

  console.log('Storing embeddings...');

  const dbConfig: SupabaseLibArgs = {
    client: supabaseClient,
    queryName: 'match_documents',
    tableName: 'documents',
  };

  await SupabaseVectorStore.fromDocuments(docs, embeddings, dbConfig);

  console.log('Done!');
}

async function main() {
  await generatePDFEmbeddings();
}

main().catch((err) => console.error(err));
