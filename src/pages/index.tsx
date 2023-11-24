import { AxiosError } from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'src/axios'
import Artists from 'src/components/artists'
import Genres from 'src/components/genres'
import Metadata from 'src/components/metadata'
import PlayingTrack from 'src/components/playing-track'
import Playlists from 'src/components/playlists'
import Tracks from 'src/components/tracks'
import { spotifyData } from 'src/data'
import { SpotifyData } from 'src/interface'

export default function Home(props: { data?: SpotifyData }) {
    const [data, setData] = useState(props.data)

    const spotifyLink = `https://open.spotify.com/user/${process.env.SPOTIFY_USER_ID}`

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

    if (!data) {
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
    }

    const { user, artists, tracks, genres, playlists, playingTrack } = data

    return (
        <>
            <Head>
                <Metadata data={data} />
            </Head>
            <main className="bg-img min-h-screen p-4 py-8 md:p-8 overflow-hidden">
                {!!user && (
                    <section className="flex items-center">
                        <Image
                            loading="lazy"
                            src={user.images?.[0].url}
                            alt="User photo profile"
                            width={100}
                            height={100}
                            className="rounded-full mr-3 shadow-black shadow-sm"
                        />
                        <h1 className="text-xl md:text-3xl text-white">
                            {user.display_name}&apos;s{' '}
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
                {!!playingTrack?.is_playing && playingTrack.currently_playing_type === 'track' && (
                    <PlayingTrack playingTrack={playingTrack} />
                )}
                {!!playlists?.length && <Playlists playlists={playlists} />}
                {!!artists?.length && <Artists artists={artists} />}
                {!!tracks?.length && <Tracks tracks={tracks} />}
                {!!genres?.length && <Genres genres={genres} />}
            </main>
        </>
    )
}

export const getServerSideProps: GetServerSideProps = async () => {
    try {
        const data = await spotifyData()

        return Promise.resolve({ props: { data } })
    } catch (error) {
        if (error instanceof AxiosError) {
            console.error(error.response?.data)
        }
        return Promise.resolve({ props: { data: null } })
    }
}
