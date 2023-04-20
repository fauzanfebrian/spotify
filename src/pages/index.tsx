import axios from 'src/axios'
import { useEffect, useState } from 'react'
import { AxiosError } from 'axios'
import { SpotifyArtist, SpotifyData, SpotifyGenre, SpotifyTrack } from 'src/interface'
import Image from 'next/image'

export default function Home() {
    const [data, setData] = useState<SpotifyData>()

    useEffect(() => {
        load()
    }, [])

    const load = async () => {
        try {
            const res = await axios.get<SpotifyData>('/spotify-data')

            setData(res.data)
        } catch (error) {
            if (error instanceof AxiosError) console.error(error)
        }
    }

    if (!data) return <>Loadingg</>

    const { user } = data

    return (
        <main>
            {user && (
                <section className="flex items-center">
                    <Image
                        src={user.images?.[0].url}
                        alt="User photo profile"
                        width={100}
                        height={100}
                        className="rounded-full mr-3"
                    />
                    <h1 className="text-xl md:text-3xl">
                        {user.display_name}
                        {"'"}s <span className="font-gotham text-green-600">Spotify</span>
                    </h1>
                </section>
            )}
        </main>
    )
}
