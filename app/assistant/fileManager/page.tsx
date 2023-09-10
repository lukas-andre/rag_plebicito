'use client'

import { FileUploader } from '@/app/assistant/fileManager/components/ui/file-uploader'
import { useState } from 'react'

export default function FileManagerComponent() {
  const [files, setFiles] = useState<File[]>([])

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFiles = Array.from(event.target.files || [])
    setFiles(uploadedFiles)
  }

  return (
    <div className="flex flex-col h-full">
      <div className="p-4">
        <label className="block text-sm font-medium mb-2">Upload Files:</label>
        <FileUploader multiple onChange={handleFileUpload} />
      </div>
      <div className="flex-1 overflow-y-auto p-4">
        <h2 className="text-xl mb-4">Uploaded Files:</h2>
        <ul>
          {files.map((file, index) => (
            <li key={index} className="mb-2 p-2 rounded bg-gray-200">
              {file.name}
            </li>
          ))}
        </ul>
      </div>
    </div>
  )
}
