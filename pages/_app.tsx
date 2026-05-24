import '../styles/globals.css'
import { useEffect } from 'react'
import type { AppProps } from 'next/app'
import { inject } from '@vercel/analytics'

export default function App({ Component, pageProps }: AppProps) {
  useEffect(() => {
    inject()
  }, [])

  return <Component {...pageProps} />
}