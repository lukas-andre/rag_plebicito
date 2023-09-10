'use client'
import * as React from 'react'
import { cn } from '@/lib/utils'

interface FileUploaderProps
  extends React.InputHTMLAttributes<HTMLInputElement> {}

const FileUploader = React.forwardRef<HTMLInputElement, FileUploaderProps>(
  ({ className, ...props }, ref) => {
    const baseStyles = 'p-2 border rounded'
    const computedClassName = cn(baseStyles, className)
    return (
      <input type="file" className={computedClassName} ref={ref} {...props} />
    )
  },
)
FileUploader.displayName = 'FileUploader'

export { FileUploader }
