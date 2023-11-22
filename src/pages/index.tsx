import { AxiosError } from 'axios'
import { GetServerSideProps } from 'next'
import Head from 'next/head'
import Image from 'next/image'
import Link from 'next/link'
import { useMemo } from 'react'
import Artists from 'src/components/artists'
import Genres from 'src/components/genres'
import PlayingTrack from 'src/components/playing-track'
import Playlists from 'src/components/playlists'
import Tracks from 'src/components/tracks'
import { SpotifyData } from 'src/interface'
import { getSpotifyData } from './api/spotify-data'

export default function Home({ data }: { data?: SpotifyData }) {
    const spotifyLink = `https://open.spotify.com/user/${process.env.SPOTIFY_USER_ID}`

    const metaDataLists = useMemo<[string, string][]>(
        () =>
            data
                ? [
                      ['description', `Spotify statistics from ${data.user.display_name}'s personal Spotify account.`],
                      ['keywords', 'Spotify, top tracks, top artists, top genres, music, playlist, discover'],
                      ['author', 'fauzanfebrian'],
                      ['robots', 'index, follow'],
                      ['og:title', `Spotify statistics from ${data.user.display_name}'s personal Spotify account.`],
                      [
                          'og:description',
                          `Explore the top tracks, artists, and genres from ${data.user.display_name}'s personal Spotify account.`,
                      ],
                      ['og:type', 'website'],
                      ['og:url', 'https://spotify.fauzanfebrian.my.id'],
                      ['og:image', data.user.images?.[0].url],
                      ['og:image:width', (data.user.images?.[0]?.width || 500).toString()],
                      ['og:image:height', (data.user.images?.[0]?.height || 500).toString()],
                      ['twitter:title', `${data.user.display_name}'s Top Tracks, Artists, and Genres on Spotify`],
                      [
                          'twitter:description',
                          `Explore the top tracks, artists, and genres from ${data.user.display_name}'s personal Spotify account.`,
                      ],
                      ['twitter:image', data.user.images?.[0].url],
                      ['twitter:card', 'summary_large_image'],
                  ]
                : [],
        [data]
    )

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
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
                <title>{`${user.display_name}'s Spotify statistics`}</title>
                {metaDataLists.map(([name, content], index) => (
                    <meta name={name} content={content} key={`metadata-${index}`} />
                ))}
            </Head>
            <main className="bg-img min-h-screen p-4 py-8 md:p-8 overflow-hidden">
                {!!user && (
                    <section className="flex items-center">
                        <Image
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
        const data = await getSpotifyData()
        return Promise.resolve({ props: { data } })
    } catch (error) {
        if (error instanceof AxiosError) {
            console.log(error.response?.data)
        }
        return Promise.resolve({ props: { data: null } })
    }
}
