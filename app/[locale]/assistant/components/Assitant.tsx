// Assistant.tsx

'use client';

import AssistantComponent from '@/app/[locale]/assistant/chat/page';
import { Sidebar } from '@/app/[locale]/assistant/components/ui/sidebar';
import SidebarButton from '@/app/[locale]/assistant/components/ui/sidebarButton';
import SidebarHeader from '@/app/[locale]/assistant/components/ui/sidebarHeader';
import FileManagerComponent from '@/app/[locale]/assistant/fileManager/page';
import { Button } from '@/app/components/ui/button';
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';
import { FaAddressBook, FaFile } from 'react-icons/fa';

import { LanguageModal } from './LocaleModal'; // Importa el componente del modal
import { useUser } from '@/app/hooks/useUser';
import { Page as Pages } from '@/app/[locale]/assistant/types/pages.type';

export function Assistant() {
  const t = useI18n();
  const locale = useCurrentLocale();
  const [activePage, setActivePage] = React.useState<Pages>('assistant');
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  const supabase = createClientComponentClient();
  const { user, loading } = useUser(supabase); // Usa el hook personalizado

  const sideBarResources = [
    {
      label: t('chat'),
      icon: <FaAddressBook />,
      onClick: () => setActivePage('assistant'),
      page: 'assistant' as Pages,
    },
    {
      label: t('files'),
      icon: <FaFile />,
      onClick: () => setActivePage('files'),
      page: 'files' as Pages,
    },
  ];

  return (
    <div className='flex h-screen w-screen bg-gray-100'>
      <Sidebar>
        <SidebarHeader title={t('teacher_assistant')} />
        <ul className='flex-grow space-y-2'>
          {sideBarResources.map(({ label, icon, onClick, page }) => (
            <li key={label}>
              <SidebarButton
                icon={icon}
                label={label}
                state={activePage === page ? 'active' : 'inactive'}
                onClick={onClick}
              />
            </li>
          ))}
        </ul>
        <section className='flex-shrink-0 p-4'>
          <div className='flex items-center space-x-2'>
            <div className='flex-grow'>
              <p className='text-base text-gray-500'>{user?.email}</p>
            </div>
          </div>
        </section>
        <div>
          <Button
            variant='default'
            onClick={() => setIsModalOpen(true)}
            className='bottom-0 left-0 w-full rounded-none rounded-t-md'
          >
            {t('current_locale')}: {locale}
          </Button>
          <LanguageModal
            isOpen={isModalOpen}
            onClose={() => setIsModalOpen(false)}
          />
        </div>
      </Sidebar>
      <div className='flex-1 overflow-y-auto bg-fuchsia-50 p-4'>
        {activePage === 'assistant' ? <AssistantComponent /> : null}
        {activePage === 'files' ? <FileManagerComponent /> : null}
      </div>
    </div>
  );
}
