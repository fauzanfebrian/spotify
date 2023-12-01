import { AxiosError } from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useEffect, useState } from 'react'
import axios from 'src/axios'
import Artists from 'src/components/artists'
import Genres from 'src/components/genres'
import PlayingTrack from 'src/components/playing-track'
import Playlists from 'src/components/playlists'
import Tracks from 'src/components/tracks'
import { spotifyData } from 'src/data'
import { SpotifyData } from 'src/interface'

const URL = process.env.SPOTIFY_REDIRECT_URI?.split('/').splice(0, 3).join('/') || 'https://spotify.fauzanfebrian.my.id'

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
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <meta
                    name="description"
                    content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
                />
                <meta
                    name="keywords"
                    content={`Spotify, Spotify statistic,music, statistic, statistics, top genres, top artists, top tracks, playlist, currently playing track, ${data.user.display_name} spotify, ${data.user.display_name} spotify statistic, ${data.user.display_name}`}
                />
                <meta name="author" content={data.user.display_name} />

                <meta property="og:title" content={`${data.user.display_name}'s Spotify Statistics`} />
                <meta
                    property="og:description"
                    content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
                />
                <meta property="og:image" content={data.user.images[0].url} />
                <meta property="og:url" content={URL} />
                <meta property="og:type" content="website" />

                <meta name="twitter:card" content="summary_large_image" />
                <meta name="twitter:title" content={`${data.user.display_name}'s Spotify Statistics`} />
                <meta
                    name="twitter:description"
                    content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
                />
                <meta name="twitter:image" content={data.user.images[0].url} />

                <link rel="icon" href={data.user.images[0].url} />

                <title>{`${data.user.display_name}'s Spotify Statistic`}</title>
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
