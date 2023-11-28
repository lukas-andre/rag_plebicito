import { createClient } from '@supabase/supabase-js';
import { StreamingTextResponse } from 'ai';

import { ChatOpenAI } from 'langchain/chat_models/openai';
import { PromptTemplate } from 'langchain/prompts';
import { BytesOutputParser } from 'langchain/schema/output_parser';
import { RunnableSequence } from 'langchain/schema/runnable';
import { NextRequest, NextResponse } from 'next/server';
import { getMatchesFromEmbeddings } from './matches';
import { templates } from './templates';

export const runtime = 'edge';

function estimateTokens(text: string): number {
  const averageCharactersPerToken = 4;
  return Math.ceil(text.length / averageCharactersPerToken);
}

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

    const body = await req.json();
    const { prompt } = body;

    const openAiKey = process.env.OPENAI_KEY;
    const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
    const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;


    const supabaseClient = createClient(supabaseUrl, supabaseServiceKey, {
      auth: {
        persistSession: false,
        autoRefreshToken: false,
      },
    });



    const matches = await getMatchesFromEmbeddings(prompt, supabaseClient, 3);

    const chat = new ChatOpenAI({
      openAIApiKey: openAiKey,
      modelName: 'gpt-3.5-turbo-16k',
      streaming: true,
      verbose: true,
    });

    const promptTemplate = new PromptTemplate({
      template: templates.plebicitoTemplate,
      inputVariables: ['userMessage', 'documents'],
    });

    const outputParser = new BytesOutputParser();

    const chain = RunnableSequence.from([promptTemplate, chat, outputParser]);

    const documents = matches.map((match) => match.pageContent).join('\n')
    console.log({ tokenCount: estimateTokens(documents + prompt) });

    const stream = await chain.stream({
      userMessage: prompt,
      documents,
    });

    return new StreamingTextResponse(stream);
  } catch (error: any) {
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}
