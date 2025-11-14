import type { Metadata } from 'next'
import { SpeedInsights } from '@vercel/speed-insights/next'
import '../src/App.css'

export const metadata: Metadata = {
  title: 'MTG Combo Finder',
  description: 'Find Magic the Gathering combos in your deck',
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en">
      <body>
        <script dangerouslySetInnerHTML={{
          __html: `
            // Disable right-click
            document.addEventListener('contextmenu', (e) => e.preventDefault());
            // Disable F12 and other dev tools shortcuts
            document.addEventListener('keydown', (e) => {
              if (e.key === 'F12' || 
                  (e.ctrlKey && e.shiftKey && e.key === 'I') ||
                  (e.ctrlKey && e.shiftKey && e.key === 'C') ||
                  (e.ctrlKey && e.shiftKey && e.key === 'J') ||
                  (e.key === 'F11')) {
                e.preventDefault();
              }
            });
          `
        }} />
        {children}
        <SpeedInsights />
      </body>
    </html>
  )
}
