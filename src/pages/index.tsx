import { AxiosError } from 'axios'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'src/axios'
import Artists from 'src/components/artists'
import Genres from 'src/components/genres'
import Tracks from 'src/components/tracks'
import { SpotifyData } from 'src/interface'

export default function Home() {
    const [loading, setLoading] = useState(false)
    const [data, setData] = useState<SpotifyData>()

    const spotifyLink = 'https://fauzanfebrian.my.id/spotify'

    useEffect(() => {
        if (!data) load()
    }, [data])

    const load = async () => {
        try {
            setLoading(true)
            const res = await axios.get<SpotifyData>('/spotify-data')

            setData(res.data)
        } catch (error) {
            if (error instanceof AxiosError) console.error(error)
        } finally {
            setLoading(false)
        }
    }

    if (loading)
        return (
            <main className="h-screen w-screen bg-green-600 flex justify-center items-center">
                <Link
                    href={spotifyLink}
                    className="text-white font-gotham text-2xl md:text-6xl mr-2"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Spotify
                </Link>
                <h4 className="text-gray-950 text-2xl md:text-6xl loading">
                    Loading<span className="dot-1">.</span>
                    <span className="dot-2">.</span>
                    <span className="dot-3">.</span>
                </h4>
            </main>
        )

    if (!data)
        return (
            <main className="h-screen w-screen bg-img flex justify-center items-center">
                <Link
                    href={spotifyLink}
                    className="text-green-600 font-gotham text-6xl"
                    target="_blank"
                    rel="noopener noreferrer"
                >
                    Spotify
                </Link>
            </main>
        )

    const { user, artists, tracks, genres } = data

    return (
        <>
            <Head>
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>
                    {user.display_name}
                    {"'"}s Top Tracks, Artists, and Genres on Spotify
                </title>
                <meta
                    name="description"
                    content={`Explore the top tracks, artists, and genres from ${user.display_name}'s personal Spotify account.`}
                />
                <meta
                    name="keywords"
                    content="Spotify, top tracks, top artists, top genres, music, playlist, discover"
                />
                <meta name="author" content={user.display_name} />
                <meta name="robots" content="index, follow" />
                <meta
                    property="og:title"
                    content={`${user.display_name}'s Top Tracks, Artists, and Genres on Spotify`}
                />
                <meta
                    property="og:description"
                    content={`Explore the top tracks, artists, and genres from ${user.display_name}'s personal Spotify account.`}
                />
                <meta property="og:type" content="website" />
                <meta property="og:url" content="https://spotify.fauzanfebrian.my.id" />
                <meta property="og:image" content={user.images?.[0].url} />
                <meta property="og:image:width" content={(user.images?.[0]?.width || 500).toString()} />
                <meta property="og:image:height" content={(user.images?.[0]?.height || 500).toString()} />
                <meta
                    name="twitter:title"
                    content={`${user.display_name}'s Top Tracks, Artists, and Genres on Spotify`}
                />
                <meta
                    name="twitter:description"
                    content={`Explore the top tracks, artists, and genres from ${user.display_name}'s personal Spotify account.`}
                />
                <meta name="twitter:image" content={user.images?.[0].url} />
                <meta name="twitter:card" content="summary_large_image" />
            </Head>
            <main className="bg-img min-h-screen p-4 py-8 md:p-8 overflow-hidden">
                {user && (
                    <section className="flex items-center">
                        <Image
                            src={user.images?.[0].url}
                            alt="User photo profile"
                            width={100}
                            height={100}
                            className="rounded-full mr-3 shadow-black shadow-sm"
                        />
                        <h1 className="text-xl md:text-3xl text-white">
                            {user.display_name}
                            {"'"}s{' '}
                            <Link
                                href={spotifyLink}
                                target="_blank"
                                rel="noopener noreferrer"
                                className="font-gotham text-green-600"
                            >
                                Spotify
                            </Link>
                        </h1>
                    </section>
                )}
                {!!artists?.length && <Artists artists={artists} />}
                {!!tracks?.length && <Tracks tracks={tracks} />}
                {!!genres?.length && <Genres genres={genres} />}
            </main>
        </>
    )
}
