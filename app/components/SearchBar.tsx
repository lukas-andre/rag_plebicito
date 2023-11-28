'use client'

import * as React from 'react'
import { Input } from './ui/input'
import { Button } from './ui/button'
import { useCompletion } from 'ai/react'
import { Loader, Search } from 'lucide-react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

export function SearchBox() {
  const [query, setQuery] = React.useState<string>('')
  const { complete, completion, isLoading, error } = useCompletion({
    api: '/api/chat',
  })

  const handleSubmit: React.FormEventHandler<HTMLFormElement> = (e) => {
    e.preventDefault()
    complete(query)
  }

  return (
    <div className='flex flex-col w-full items-center text-foreground'>
      <div className="my-4 flex w-full max-w-4xl">
        <form onSubmit={handleSubmit} className="w-full flex">
          <Input
            placeholder="Haz tu pregunta aquí..."
            name="search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            className="flex-grow rounded-l-full pl-4"
          />
          <Button type="submit" className="bg-blue-600 text-white rounded-r-full">
            <Search className="text-white" width={20} height={20} />
          </Button>
        </form>
      </div>
      {isLoading && (
        <div className="animate-spin my-2">
          <Loader />
        </div>
      )}
      {error && (
        <div className="my-2 text-red-500">
          Se ha producido un error al buscar. Por favor intenta nuevamente.
        </div>
      )}
      {completion && !error && (
        <div className="my-2 p-4 bg-green-100 rounded-lg shadow">
            {/* {completion} */}
            <ReactMarkdown
            // eslint-disable-next-line react/no-children-prop
            children={completion}
            remarkPlugins={[remarkGfm]}
            />
        </div>
      )}
    </div>
  )
}
