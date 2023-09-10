'use client'

import AssistantComponent from '@/app/assistant/chat/page'
import { Sidebar } from '@/app/assistant/components/ui/sidebar'
import SidebarButton from '@/app/assistant/components/ui/sidebarButton'
import SidebarHeader from '@/app/assistant/components/ui/sidebarHeader'
import FileManagerComponent from '@/app/assistant/fileManager/page'
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs'
import { User } from '@supabase/supabase-js'
import React from 'react'
import { FaAddressBook, FaFile } from 'react-icons/fa'

type Page = 'chat' | 'fileManager'

export function Assistant() {
  const [activePage, setActivePage] = React.useState<Page>('chat')
  const [user, setUser] = React.useState<User>()
  const [loading, setLoading] = React.useState(true)

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
      label: 'Chat',
      icon: <FaAddressBook />,
      onClick: () => setActivePage('chat'),
      page: 'chat',
    },
    {
      label: 'Files',
      icon: <FaFile />,
      onClick: () => setActivePage('fileManager'),
      page: 'fileManager',
    },
  ]

  return (
    <div className="flex h-screen w-screen bg-gray-100">
      <Sidebar>
        <SidebarHeader title="Assistant App" />
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
      </Sidebar>
      <div className="flex-1 overflow-y-auto p-4 bg-fuchsia-50">
        {activePage === 'chat' ? <AssistantComponent /> : null}
        {activePage === 'fileManager' ? <FileManagerComponent /> : null}
      </div>
    </div>
  )
}
