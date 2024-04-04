'use client'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import Image from 'next/image'
import Link from 'next/link'
import { useContext, useState } from 'react'
import { HomeContext } from '../context'
import { SpotifyData } from '../types'
import TrackPreview from './track-preview'
import { from, to, trans } from '../utils/deck'

export default function Tracks({ data }: { data: SpotifyData }) {
    const [tracks] = useState([...data.tracks].reverse())

    const [gone] = useState(() => new Set())
    const [props, api] = useSprings(tracks.length, i => ({
        ...to(i),
        from: from(i),
    }))

    const { pauseAudio } = useContext(HomeContext)

    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity[0] > 0.2
        const dir = xDir < 0 ? -1 : 1
        if (!down && trigger) {
            gone.add(index)
            pauseAudio()
        }
        api.start(i => {
            if (index !== i) return
            const isGone = gone.has(index)

            const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0
            const rot = mx / 100 + (isGone ? dir * 10 * velocity[0] : 0)
            const scale = down ? 1.1 : 1

            return {
                x,
                rot,
                scale,
                delay: undefined,
                config: { friction: 50, tension: down ? 800 : isGone ? 200 : 500 },
            }
        })
        if (!down && gone.size === tracks.length) {
            setTimeout(() => {
                gone.clear()
                api.start(i => to(i))
            }, 600)
        }
    })

    return (
        <section className="relative w-full">
            <h2 className="text-2xl text-white text-center mb-6 md:mb-3">Top Tracks</h2>

            <div className="flex items-center justify-center">
                <div className="w-80 h-96 pt-24 box-border">
                    {props.map(({ x, y, rot, scale }, i) => {
                        const track = tracks[i]

                        return (
                            <animated.div
                                className="absolute w-80 h-52 will-change-transform flex items-center justify-center"
                                style={{ x, y }}
                                key={i}
                            >
                                <animated.div
                                    {...bind(i)}
                                    className="bg-green-600 bg-opacity-90 w-52 h-80 will-change-transform rounded-lg overflow-hidden flex flex-col justify-between shadow-deck touch-none"
                                    style={{
                                        transform: interpolate([rot, scale], trans),
                                    }}
                                >
                                    <div className="w-52 h-52 relative">
                                        <Image
                                            alt={track.name}
                                            src={track.album.images[0].url}
                                            width={208}
                                            height={208}
                                            className="touch-none h-52 bg-cover"
                                            quality={30}
                                        />
                                        {!!track.preview_url && <TrackPreview url={track.preview_url} />}
                                    </div>
                                    <div className="flex-1 p-3 overflow-hidden">
                                        <h3 className="text-black text-sm font-bold capitalize">
                                            <Link
                                                href={track.external_urls.spotify}
                                                target="_blank"
                                                rel="noopener noreferrer"
                                            >
                                                {track.name}
                                            </Link>
                                        </h3>
                                        <Link
                                            href={track.album.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <p className="text-gray-500 text-xs text-left capitalize mt-1">
                                                {track.album.name}
                                            </p>
                                        </Link>
                                    </div>
                                </animated.div>
                            </animated.div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
