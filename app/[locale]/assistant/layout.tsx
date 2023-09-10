import { I18nProviderClient } from '@/locales/client'
import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}

export default function DashboardLayout({
  children,
  params,
}: {
  children: React.ReactNode
  params: { locale: string }
}) {
  return (
    <I18nProviderClient locale={params.locale}>
      <div className="flex h-screen w-screen">{children}</div>
    </I18nProviderClient>
  )
}
