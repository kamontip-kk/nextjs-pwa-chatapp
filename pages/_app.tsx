import '../styles/globals.css'
import '../styles/Mystyle.css'
import type { AppProps } from 'next/app'
import Header from '../Components/Header'
import Head from 'next/head'

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <>
    <Head>
        <title>Chat App</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
    </Head>

    <Header/>
    <Component {...pageProps} />
    </>
  )
}

export default MyApp
