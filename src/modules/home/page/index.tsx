'use client'
import axios from '@/axios'
import { RefObject, useEffect, useState } from 'react'
import Artists from '../components/artists'
import Tracks from '../components/tracks'
import User from '../components/user'
import { HomeContext } from '../context'
import '../styles/style.css'
import { SpotifyData } from '../types'

export default function HomePage(props: { data: SpotifyData }) {
    const [data, setData] = useState(props.data)
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

    useEffect(() => {
        const actionId = setTimeout(async () => {
            try {
                const res = await axios.get<SpotifyData>('/spotify-data')
                setData(res.data)
            } catch (error) {
                return
            }
        }, 1000 * 5)

        return () => {
            clearTimeout(actionId)
        }
    }, [data])

    return (
        <HomeContext.Provider value={{ playAudio, pauseAudio }}>
            <main className="home-wrapper">
                <div className="container h-auto mx-auto py-6 px-4">
                    <User data={data} />
                    <div className="flex items-center justify-center flex-col md:flex-row my-12">
                        <Artists data={data} />
                        <Tracks data={data} />
                    </div>
                </div>
            </main>
        </HomeContext.Provider>
    )
}
