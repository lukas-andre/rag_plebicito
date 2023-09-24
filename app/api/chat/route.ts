import { createClient } from '@supabase/supabase-js';
import { StreamingTextResponse } from 'ai';

import dotenv from 'dotenv';
import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { RunnableSequence } from 'langchain/schema/runnable';
import { NextRequest, NextResponse } from 'next/server';
import { getMatchesFromEmbeddings } from './matches';
import { templates } from './templates';

dotenv.config();

export async function POST(req: NextRequest) {
  try {
    if (!process.env.NEXT_PUBLIC_SUPABASE_URL) {
      return console.log(
        'Environment variables NEXT_PUBLIC_SUPABASE_URL is required: skipping pdf embeddings generation'
      );
    }

    if (!process.env.SUPABASE_SERVICE_ROLE_KEY) {
      return console.log(
        'Environment variables SUPABASE_SERVICE_ROLE_KEY is required: skipping pdf embeddings generation'
      );
    }

    if (!process.env.OPENAI_KEY) {
      return console.log(
        'Environment variables OPENAI_KEY is required: skipping pdf embeddings generation'
      );
    }

    console.log('headers', req.headers);
    const body = await req.json();
    console.log(body);
    const { prompt } = body;

    const openAiKey = process.env.OPENAI_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

    console.log(prompt);

    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });

    console.log('Getting matches from embeddings');

    const matches = await getMatchesFromEmbeddings(prompt, supabaseClient, 2);

    const chat = new ChatOpenAI({
      openAIApiKey: openAiKey,
      modelName: 'gpt-3.5-turbo',
      streaming: true,
      verbose: true,
    });

    const promptTemplate = new PromptTemplate({
      template: templates.schoolProtocolTemplate,
      inputVariables: ['userMessage', 'documents'],
    });

    const outputParser = new BytesOutputParser();

    const chain = RunnableSequence.from([promptTemplate, chat, outputParser]);

    const stream = await chain.stream({
      userMessage: prompt,
      documents: matches.map((match) => match.pageContent).join('\n'),
    });

    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
