import type { AppProps } from 'next/app'
import { RefObject, useState } from 'react'
import { AppContext } from 'src/context'
import 'src/styles/globals.css'

export default function App({ Component, pageProps }: AppProps) {
    const [audioPlayer, setAudioPlayer] = useState<RefObject<HTMLAudioElement>>()

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
        <AppContext.Provider value={{ playAudio, pauseAudio }}>
            <Component {...pageProps} />
        </AppContext.Provider>
    )
}
