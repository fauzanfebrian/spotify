import { APP_URL, SPOTIFY_USER_ID } from '@/config'
import { spotifyData } from '@/modules/home/data'
import HomePage from '@/modules/home/page'
import { Metadata, ResolvingMetadata } from 'next'
import Link from 'next/link'

export async function generateMetadata(_: any, parent: ResolvingMetadata): Promise<Metadata> {
    const data = await spotifyData().catch(() => null)
    const previousImages = (await parent).openGraph?.images || []

    if (!data) {
        return {
            title: 'Spotify Statistics',
            openGraph: {
                images: previousImages,
            },
        }
    }

    const title = `${data.user.display_name}'s Spotify Statistic`
    const description = `Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`
    const author = data.user.display_name
    const images = [data.user.images[0].url, ...previousImages]

    return {
        title,
        openGraph: {
            images,
            type: 'website',
            url: APP_URL,
        },
        twitter: {
            card: 'summary_large_image',
            title,
            creator: author,
            description,
            images,
        },
        icons: data.user.images[0].url,
        description,
        keywords: [
            `Spotify`,
            `Spotify statistic`,
            `music`,
            `statistic`,
            `statistics`,
            `top genres`,
            `top artists`,
            `top tracks`,
            `playlist`,
            `currently playing track`,
            `${data.user.display_name} spotify`,
            `${data.user.display_name} spotify statistic`,
            `${data.user.display_name}`,
        ],
        authors: { name: author },
    }
}

export const revalidate = 5

export default async function Home() {
    const data = await spotifyData().catch(() => null)

    if (!data) {
        const spotifyLink = `https://open.spotify.com/user/${SPOTIFY_USER_ID}`
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

    return (
        <>
            <HomePage data={data} />
        </>
    )
}
