'use client'
import { SPOTIFY_USER_ID } from '@/config'
import Image from 'next/image'
import { SpotifyData } from '../types'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'

export default function User({ data }: { data: SpotifyData }) {
    const user = data.user

    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    })

    const spotifyLink = `https://open.spotify.com/user/${SPOTIFY_USER_ID}`
    return (
        <animated.div style={{ opacity }}>
            <section className="flex items-center">
                <Image
                    loading="lazy"
                    src={user.images?.[0].url}
                    alt="User photo profile"
                    width={80}
                    height={80}
                    quality={50}
                    className="rounded-full mr-3 shadow-black shadow-sm object-cover w-20 h-20"
                />
                <h1 className="text-xl md:text-3xl text-white">
                    {`${user.display_name}`}
                    <span className="animate-bounce inline-block">{"'"}</span>
                    <span>s </span>
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
        </animated.div>
    )
}
