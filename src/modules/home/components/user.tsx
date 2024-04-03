'use client'
import { SPOTIFY_USER_ID } from '@/config'
import Image from 'next/image'
import { SpotifyData } from '../types'
import Link from 'next/link'

export default function User({ data }: { data: SpotifyData }) {
    const user = data.user

    const spotifyLink = `https://open.spotify.com/user/${SPOTIFY_USER_ID}`
    return (
        <section className="flex items-center">
            <Image
                loading="lazy"
                src={user.images?.[0].url}
                alt="User photo profile"
                width={80}
                height={80}
                className="rounded-full mr-3 shadow-black shadow-sm"
            />
            <h1 className="text-xl md:text-3xl text-white">
                {`${user.display_name}'s `}
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
    )
}
