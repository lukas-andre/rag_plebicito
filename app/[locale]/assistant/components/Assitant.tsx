'use client'

import AssistantComponent from '@/app/[locale]/assistant/chat/page'
import { Sidebar } from '@/app/[locale]/assistant/components/ui/sidebar'
import SidebarButton from '@/app/[locale]/assistant/components/ui/sidebarButton'
import SidebarHeader from '@/app/[locale]/assistant/components/ui/sidebarHeader'
import FileManagerComponent from '@/app/[locale]/assistant/fileManager/page'
import { useChangeLocale, useCurrentLocale, useI18n } from '@/locales/client'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import React from 'react'
import { FaAddressBook, FaFile } from 'react-icons/fa'

type Page = 'chat' | 'fileManager'

export function Assistant() {
  const t = useI18n()
  const locale = useCurrentLocale()
  const changeLocale = useChangeLocale()
  const [activePage, setActivePage] = React.useState<Page>('chat')
  const [user, setUser] = React.useState<User>()
  const [loading, setLoading] = React.useState(true)
  const [isModalOpen, setIsModalOpen] = React.useState(false)

  const supabase = createClientComponentClient()

  const getUser = React.useCallback(async () => {
    try {
      setLoading(true)
      const { data, error } = await supabase.auth.getUser()
      if (error) {
        throw error
      }

      if (data) {
        setUser(data.user)
      }
    } catch (error) {
      console.error('Error loading user data!')
    } finally {
      setLoading(false)
    }
  }, [user, supabase])

  React.useEffect(() => {
    getUser()
  }, [user, getUser])

  const sideBarResources = [
    {
      label: t('chat'),
      icon: <FaAddressBook />,
      onClick: () => setActivePage('chat'),
      page: 'chat',
    },
    {
      label: t('files'),
      icon: <FaFile />,
      onClick: () => setActivePage('fileManager'),
      page: 'fileManager',
    },
  ]

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar>
        <SidebarHeader title={t('teacher_assistant')} />
        <ul className="space-y-2 flex-grow">
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
        <section className="flex-shrink-0 p-4">
          <div className="flex items-center space-x-2">
            <div className="flex-grow">
              <p className="text-base text-gray-500">{user?.email}</p>
            </div>
          </div>
        </section>
        <div className="relative">
          {/* Botón para abrir el modal */}
          <button
            onClick={() => setIsModalOpen(true)}
            className="px-4 py-2 text-sm font-medium text-gray-700 bg-white border border-gray-300 rounded-md shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            {t('current_locale')}: {locale}
          </button>

          {/* Modal */}
          {isModalOpen && (
            <div className="fixed inset-0 flex items-center justify-center z-50">
              {/* Fondo oscuro semi-transparente */}
              <div
                className="absolute inset-0 bg-black opacity-50"
                onClick={() => setIsModalOpen(false)}
              ></div>

              <div className="bg-white p-4 rounded-lg shadow-xl z-10">
                <h2 className="text-lg font-semibold mb-4">
                  {t('select_language')}
                </h2>
                <button
                  onClick={() => {
                    changeLocale('en')
                    setIsModalOpen(false)
                  }}
                  className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {t('english')}
                </button>
                <button
                  onClick={() => {
                    changeLocale('es')
                    setIsModalOpen(false)
                  }}
                  className="mt-2 block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 rounded-md"
                >
                  {t('spanish')}
                </button>
                <button
                  onClick={() => setIsModalOpen(false)}
                  className="mt-4 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 hover:bg-gray-300 rounded-md"
                >
                  {t('cancel')}
                </button>
              </div>
            </div>
          )}
        </div>
      </Sidebar>
      <div className="flex-1 overflow-y-auto p-4 bg-fuchsia-50">
        {activePage === 'chat' ? <AssistantComponent /> : null}
        {activePage === 'fileManager' ? <FileManagerComponent /> : null}
      </div>
    </div>
  )
}
