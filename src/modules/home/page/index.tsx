'use client'
import axios from '@/axios'
import { RefObject, useEffect, useState } from 'react'
import 'slick-carousel/slick/slick-theme.css'
import 'slick-carousel/slick/slick.css'
import Artists from '../components/artists'
import Genres from '../components/genres'
import Playlists from '../components/playlists'
import Tracks from '../components/tracks'
import User from '../components/user'
import { HomeContext } from '../context'
import '../styles/style.css'
import { SpotifyData } from '../types'
import PlayingTrack from '../components/playing-track'
import useInView from '@/hooks/useInView'

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

    useEffect(() => {
        const ua = (navigator.userAgent || navigator.vendor || '').toLowerCase()

        if (!/ipad|iphone|ipod|android/.test(ua) || !ua.includes('instagram')) {
            return
        }

        const link = location.href.replace(/https?:\/\//, '')

        const chromeDeepLink = /ipad|iphone|ipod/.test(ua)
            ? `googlechrome://${link}`
            : `intent://${link}#Intent;scheme=https;package=com.android.chrome;end;`

        window.location.href = chromeDeepLink
    }, [])

    const inViewArtists = useInView()
    const inViewGenres = useInView()
    const inViewTracks = useInView()

    return (
        <HomeContext.Provider value={{ playAudio, pauseAudio }}>
            <main className="container h-auto mx-auto py-6 px-4">
                <User data={data} />
                {!!data.playingTrack?.is_playing && data.playingTrack.currently_playing_type === 'track' && (
                    <PlayingTrack data={data} />
                )}
                <Playlists data={data} />
                <div className="flex items-start justify-center flex-col md:flex-row my-24 gap-y-12">
                    <div className="w-full h-auto min-h-[440px]" ref={inViewArtists.ref}>
                        {inViewArtists.inView && <Artists data={data} />}
                    </div>
                    <div className="w-full h-auto min-h-[440px]" ref={inViewGenres.ref}>
                        {inViewGenres.inView && <Genres data={data} />}
                    </div>
                    <div className="w-full h-auto min-h-[440px]" ref={inViewTracks.ref}>
                        {inViewTracks.inView && <Tracks data={data} />}
                    </div>
                </div>
            </main>
        </HomeContext.Provider>
    )
}
