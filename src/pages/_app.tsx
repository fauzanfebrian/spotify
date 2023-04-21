import 'src/styles/globals.css'
import type { AppProps } from 'next/app'
import Head from 'next/head'

export default function App({ Component, pageProps }: AppProps) {
    return (
        <>
            <Head>
                <title>Spotify Profile</title>
            </Head>
            <Component {...pageProps} />
        </>
    )
}
