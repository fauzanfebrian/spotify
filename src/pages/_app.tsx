import Hotjar from '@hotjar/browser'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { RefObject, useEffect, useState } from 'react'
import { AppContext } from 'src/context'
import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    const [audioPlayer, setAudioPlayer] = useState<RefObject<HTMLAudioElement>>()

    useEffect(() => {
        const siteId = +(process.env.HOTJAR_SITE_ID as string)
        const hotjarVersion = 6

        if (!siteId) return

        Hotjar.init(siteId, hotjarVersion)
    }, [])

    const playAudio = (player: RefObject<HTMLAudioElement>) => {
        if (audioPlayer) audioPlayer.current?.pause()
        player.current?.play()
        setAudioPlayer(player)
    }

    const pauseAudio = () => {
        if (!audioPlayer) return
        audioPlayer.current?.pause()
    }

    return (
        <>
            <Script src="https://www.googletagmanager.com/gtag/js?id=G-XPKPDC3WSB" />
            <Script id="google-analytics">
                {`window.dataLayer = window.dataLayer || [];
                    function gtag(){dataLayer.push(arguments);}
                    gtag('js', new Date());

                gtag('config', 'G-XPKPDC3WSB');`}
            </Script>
            <AppContext.Provider value={{ playAudio, pauseAudio }}>
                <Component {...pageProps} />
            </AppContext.Provider>
        </>
    )
}
