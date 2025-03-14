import useWindowSize from '@/hooks/useWindowSize'
import Link from 'next/link'
import Slider from 'react-slick'
import { animated, useSpring } from 'react-spring'
import { SpotifyData } from '../types'

export default function Playlists({ data }: { data: SpotifyData }) {
    const [widthWindow] = useWindowSize()
    const { opacity } = useSpring({
        from: { opacity: 0 },
        to: { opacity: 1 },
        config: { duration: 1000 },
    })

    const getSlidesToShow = () => {
        if (widthWindow >= 1550) {
            return 4
        }
        if (widthWindow >= 1280) {
            return 3
        }
        if (widthWindow >= 768) {
            return 2
        }
        return 1
    }

    return (
        <animated.div style={{ opacity }}>
            <section className="my-24">
                <h2 className="text-2xl text-white text-center mb-6">Playlists</h2>

                <div className="px-0 md:px-6 box-border">
                    <Slider
                        dots
                        infinite
                        speed={500}
                        slidesToShow={getSlidesToShow()}
                        slidesToScroll={1}
                        arrows={widthWindow >= 768}
                    >
                        {data.playlists.map(playlist => {
                            return (
                                <div key={playlist.id} className="!flex items-center justify-center">
                                    <div className="h-60 w-60 rounded-2xl overflow-hidden relative">
                                        <img
                                            alt={playlist.name}
                                            src={playlist.images?.[0]?.url || ''}
                                            width={320}
                                            height={320}
                                            className="opacity-50 absolute top-0 left-0 bottom-0 right-0"
                                        />
                                        <div className="bg-black bg-opacity-50 relative z-10 w-full h-full text-white p-5 text-center flex items-center justify-between flex-col">
                                            <img
                                                alt={playlist.name}
                                                src={playlist.images?.[0]?.url || ''}
                                                width={120}
                                                height={120}
                                                className="rounded-lg"
                                            />

                                            <div className="relative">
                                                <h3 className="capitalize text-lg">{playlist.name}</h3>
                                                <p className="text-sm text-gray-200">{playlist.tracks.total} songs</p>
                                                {!!playlist.description && (
                                                    <p className="text-gray-400 text-xs">{playlist.description}</p>
                                                )}
                                                <Link
                                                    href={playlist.external_urls.spotify}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="opacity-0 absolute w-full h-full bottom-0 top-0 right-0 left-0"
                                                >
                                                    open album
                                                </Link>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}
                    </Slider>
                </div>
            </section>
        </animated.div>
    )
}
