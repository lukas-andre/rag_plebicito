import { FileUploader } from '@/app/[locale]/assistant/fileManager/components/ui/file-uploader';
import { useUser } from '@/app/hooks/useUser';
import { createClientComponentClient } from '@supabase/auth-helpers-nextjs';
import React from 'react';

export default function FileManagerComponent() {
  const [file, setFile] = React.useState<File | null>(null);
  const supabase = createClientComponentClient();
  const { user, loading } = useUser(supabase); // Us

  const handleFileUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const uploadedFile = event.target.files ? event.target.files[0] : null;
    if (uploadedFile) {
      setFile(uploadedFile);
      uploadFile(uploadedFile);
    }
  };

  const uploadFile = async (uploadedFile: File) => {
    const formData = new FormData();
    formData.append('file', uploadedFile);
    formData.append('userId', user?.id || '');

    try {
      const response = await fetch('/api/files/upload', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Failed to upload file');
      }

      const data = await response.json();
      console.log('File uploaded successfully:', data);
    } catch (error) {
      console.error('Error uploading file:', error);
    }
  };

  return (
    <div className='flex h-full flex-col'>
      <div className='p-4'>
        <label className='mb-2 block text-sm font-medium'>Upload File:</label>
        <FileUploader onChange={handleFileUpload} />
      </div>
      <div className='flex-1 overflow-y-auto p-4'>
        <h2 className='mb-4 text-xl'>Uploaded File:</h2>
        {file && (
          <div className='mb-2 rounded bg-gray-200 p-2'>{file.name}</div>
        )}
      </div>
    </div>
  );
}
