import { CartProvider } from '@/context/cartContext'
import './globals.css'

export const metadata = {
  title: 'Simple E-commerce product listing',
  description: 'Simple E-commerce product listing page and detail page',
}

export default function RootLayout({ children }) {
  return (
    <html lang='en'>
      <body>
        <CartProvider>{children}</CartProvider>
      </body>
    </html>
  )
}
