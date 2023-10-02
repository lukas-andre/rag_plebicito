'use client';

import { Button } from '@/app/[locale]/components/ui/button';
import { useUser } from '@/app/hooks/useUser';
import { useI18n } from '@/locales/client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import { useCompletion } from 'ai/react';
import { Wand } from 'lucide-react';
import React from 'react';
import ReactMarkdown from 'react-markdown';
import remarkGfm from 'remark-gfm';

export default function AssistantComponent() {
  const t = useI18n();
  const [query, setQuery] = React.useState<string>('');
  const supabase = createClientComponentClient();
  const { user, loading } = useUser(supabase); // Usa el hook personalizado

  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/chat',
    body: { userId: user?.id },
    onResponse: (response) => {
      console.log(response);
    },
  });

  const handleKeyDown: React.KeyboardEventHandler<HTMLInputElement> = (e) => {
    if (e.key === 'Enter' && query.trim()) {
      handleSubmit(e as any); // Convertimos el evento a un MouseEvent para que coincida con el tipo esperado por handleSubmit
    }
  };

  const handleSubmit: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();

    complete(query);
  };

  const suggestedQuestions = [
    t('questions.drugIssue'),
    t('questions.preventiveApproach'),
    t('questions.bullyingProtocol'),
    t('questions.mentalHealthHandling'),
    t('questions.homeIssuesProcedure'),
  ];

  return (
    <div className='flex h-full flex-col'>
      <div className='p-4'>
        <h4 className='mb-2 font-semibold'>{t('suggested_questions')}</h4>
        <ul>
          {suggestedQuestions.map((question, index) => (
            <li key={index} className='mb-1'>
              <button
                className='text-blue-500 hover:underline'
                onClick={() => setQuery(question)}
              >
                {question}
              </button>
            </li>
          ))}
        </ul>
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        {query?.length ? (
          <div className='mb-4 rounded bg-gray-200 p-2'>{query}</div>
        ) : null}

        {isLoading ? (
          <div className='flex items-center gap-4 dark:text-black'>
            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-yellow-500 p-2 text-center'>
              <Wand width={18} className='text-white' />
            </span>
            <h3 className='font-semibold'>{t('thinking')}</h3>
          </div>
        ) : null}

        {completion && !error ? (
          <div className='flex items-center gap-4 dark:text-black'>
            <span className='flex h-8 w-8 items-center justify-center rounded-full bg-green-500 p-2 text-center'>
              <Wand width={18} className='text-white' />
            </span>
            <h3 className='font-semibold'>{t('answer')}</h3>
            <div className='w-full'>
              <ReactMarkdown
                // eslint-disable-next-line react/no-children-prop
                children={completion}
                remarkPlugins={[remarkGfm]}
              />
            </div>
          </div>
        ) : null}
      </div>
      <div className='border-t bg-white p-4'>
        <div className='flex items-center'>
          <input
            type='text'
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={handleKeyDown} // Agrega el manejador de eventos aquí
            placeholder={t('type_message')}
            className='flex-1 rounded border p-2'
          />
          <Button onClick={handleSubmit} variant='default'>
            {t('send')}
          </Button>
        </div>
      </div>
    </div>
  );
}
