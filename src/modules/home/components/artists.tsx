'use client'
import { animated, to as interpolate, useSprings } from '@react-spring/web'
import { useDrag } from '@use-gesture/react'
import Image from 'next/image'
import { useState } from 'react'
import { SpotifyData } from '../types'
import Link from 'next/link'

const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 100,
})
const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.5, y: -1000 })

const trans = (r: number, s: number) =>
    `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`

export default function Artists({ data }: { data: SpotifyData }) {
    const [artists] = useState([...data.artists].reverse())

    const [gone] = useState(() => new Set())
    const [props, api] = useSprings(artists.length, i => ({
        ...to(i),
        from: from(i),
    }))

    const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
        const trigger = velocity[0] > 0.2
        const dir = xDir < 0 ? -1 : 1
        if (!down && trigger) {
            gone.add(index)
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
        if (!down && gone.size === artists.length) {
            setTimeout(() => {
                gone.clear()
                api.start(i => to(i))
            }, 600)
        }
    })

    return (
        <section className="relative">
            <h2 className="text-2xl text-white text-center mb-6 md:mb-1">Top Artists</h2>

            <div className="flex items-center justify-center">
                <div className="w-80 h-96 pt-24 box-border">
                    {props.map(({ x, y, rot, scale }, i) => {
                        const artist = artists[i]

                        return (
                            <animated.div
                                className="absolute w-80 h-52 will-change-transform flex items-center justify-center touch-none"
                                style={{ x, y }}
                                key={i}
                            >
                                <animated.div
                                    {...bind(i)}
                                    className="bg-green-600 bg-opacity-90 w-52 h-80 will-change-transform rounded-lg overflow-hidden flex flex-col justify-between shadow-deck"
                                    style={{
                                        transform: interpolate([rot, scale], trans),
                                    }}
                                >
                                    <Image
                                        alt={artist.name}
                                        src={artist.images[0].url}
                                        width={208}
                                        height={208}
                                        className="touch-none max-h-72"
                                    />
                                    <div className="flex-1 p-3 overflow-hidden">
                                        <Link
                                            href={artist.external_urls.spotify}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                        >
                                            <h3 className="text-black text-sm font-bold capitalize">{artist.name}</h3>
                                        </Link>
                                        <p className="text-gray-500 text-xs text-left capitalize mt-1">
                                            {artist.genres.join(', ')}
                                        </p>
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
