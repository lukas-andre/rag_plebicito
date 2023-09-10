import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { Assistant } from '@/app/assistant/components/Assitant'

export default function Index() {
  return (
    <>
      <Head>
        <title>Teacher Assistant</title>
        <meta
          name="description"
          content="A platform for teachers to upload documents and ask questions."
        />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <main>
        <Assistant />
      </main>
    </>
  )
}
