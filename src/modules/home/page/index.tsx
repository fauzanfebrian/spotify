'use client'
import axios from '@/axios'
import { useEffect, useState } from 'react'
import Artists from '../components/artists'
import Tracks from '../components/tracks'
import User from '../components/user'
import '../styles/style.css'
import { SpotifyData } from '../types'

export default function HomePage(props: { data: SpotifyData }) {
    const [data, setData] = useState(props.data)

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
        <main className="home-wrapper">
            <div className="container h-auto mx-auto py-6 px-4">
                <User data={data} />
                <div className="flex items-center justify-center flex-col md:flex-row my-12 gap-6">
                    <Artists data={data} />
                    <Tracks data={data} />
                </div>
            </div>
        </main>
    )
}
