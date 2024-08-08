import { CSVProvider } from '@/app/CSVContext'
import '@/app/globals.css'
import Header from '@/app/Header'

export const metadata = {
  title: '2024市川ゼミ_ラベリングツール',
  description: 'Generated by Next.js, Vercel',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <CSVProvider>
      <html lang="ja">
        <body className="bg-gray-50">
          <div>
            <Header />
            <main>{children}</main>
          </div>
        </body>
      </html>
    </CSVProvider>
  )
}
