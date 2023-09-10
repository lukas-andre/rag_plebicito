'use client'

import { Button } from '@/app/[locale]/components/ui/button'
import { useI18n } from '@/locales/client'
import { useState } from 'react'

export default function AssistantComponent() {
  const t = useI18n()
  const [message, setMessage] = useState('')
  const [chatLog, setChatLog] = useState<string[]>([])

  const handleSendMessage = () => {
    if (message.trim()) {
      setChatLog([...chatLog, message])
      setMessage('')
    }
  }

  return (
    <div className="flex flex-col h-full">
      <div className="flex-1 overflow-y-auto p-4">
        {chatLog.map((msg, index) => (
          <div key={index} className="mb-4 p-2 rounded bg-gray-200">
            {msg}
          </div>
        ))}
      </div>
      <div className="border-t p-4 bg-white">
        <div className="flex items-center">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            placeholder={t('type_message')}
            className="flex-1 p-2 rounded border"
          />
          <Button onClick={handleSendMessage} variant="default">
            {t('send')}
          </Button>
        </div>
      </div>
    </div>
  )
}
