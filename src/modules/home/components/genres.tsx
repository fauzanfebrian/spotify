import { a, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { SpotifyData } from '../types'

export default function Genres({ data }: { data: SpotifyData }) {
    const [flipped, set] = useState(true)
    const { transform, opacity } = useSpring({
        opacity: flipped ? 1 : 0,
        transform: `perspective(600px) rotateX(${flipped ? 180 : 0}deg)`,
        config: { mass: 5, tension: 500, friction: 80 },
    })

    useEffect(() => {
        set(false)
    }, [])

    return (
        <section className="relative w-full">
            <h2 className="text-2xl text-white text-center mb-6 md:mb-3">Top Genres</h2>

            <div className="flex items-center justify-center">
                <div
                    className="flex items-center justify-center relative w-80 md:w-[30rem] h-96"
                    onClick={() => set(state => !state)}
                >
                    <a.div
                        className={`w-full h-full absolute rounded-lg bg-green-600 bg-opacity-40`}
                        style={{
                            opacity: opacity.to(o => 1 - o),
                            transform,
                            willChange: 'transform, opacity',
                        }}
                    />
                    <a.div
                        className={`w-full h-full absolute rounded-lg bg-green-600 bg-opacity-60`}
                        style={{
                            opacity,
                            transform,
                            rotateX: '180deg',
                            willChange: 'transform, opacity',
                        }}
                    />
                </div>
            </div>
        </section>
    )
}
