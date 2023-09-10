import { Metadata } from 'next'

export const metadata: Metadata = {
  title: 'Next.js',
}

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return <div className="flex h-screen w-screen">{children}</div>
}
