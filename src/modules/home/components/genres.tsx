import { TrophyIcon } from '@/assets/icons'
import { a, useSpring } from '@react-spring/web'
import { useEffect, useState } from 'react'
import { SpotifyData } from '../types'
import Chart from './chart'

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
                        className={`w-full h-full absolute rounded-lg bg-green-600 bg-opacity-40 p-5`}
                        style={{
                            opacity: opacity.to(o => 1 - o),
                            transform,
                            willChange: 'transform, opacity',
                        }}
                    >
                        <Chart data={data} />
                    </a.div>
                    <a.div
                        className={`w-full h-full absolute rounded-lg bg-green-600 bg-opacity-40 flex justify-center items-center flex-col`}
                        style={{
                            opacity,
                            transform,
                            rotateX: '180deg',
                            willChange: 'transform, opacity',
                        }}
                    >
                        <div className="w-60 h-60">
                            <TrophyIcon className="fill-yellow-500" />
                        </div>
                        <div>
                            <p className="text-center capitalize text-white font-bold text-2xl -mt-3">
                                {data.genres[0].name}
                            </p>
                            <p className="my-0 text-center text-sm text-gray-300">
                                The top genres, comprising {data.genres[0].percentage}% of the total
                            </p>
                        </div>
                    </a.div>
                </div>
            </div>
        </section>
    )
}
