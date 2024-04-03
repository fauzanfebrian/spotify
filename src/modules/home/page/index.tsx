'use client'
import axios from '@/axios'
import { useEffect, useState } from 'react'
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

    return <main className="home-wrapper"></main>
}
