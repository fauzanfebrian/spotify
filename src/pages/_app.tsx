import Hotjar from '@hotjar/browser'
import type { AppProps } from 'next/app'
import Script from 'next/script'
import { RefObject, useEffect, useState } from 'react'
import { AppContext } from 'src/context'
import 'src/styles/globals.css'

const hotjarSiteId = +(process.env.HOTJAR_SITE_ID as string)
const gTagId = process.env.GOOGLE_TAG_ID as string

export default function App({ Component, pageProps }: AppProps) {
    const [audioPlayer, setAudioPlayer] = useState<RefObject<HTMLAudioElement>>()

    useEffect(() => {
        if (!hotjarSiteId) return

        Hotjar.init(hotjarSiteId, 6)
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
            {!!gTagId && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${gTagId}`} />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${gTagId}');
                        `}
                    </Script>
                </>
            )}
            <AppContext.Provider value={{ playAudio, pauseAudio }}>
                <Component {...pageProps} />
            </AppContext.Provider>
        </>
    )
}
