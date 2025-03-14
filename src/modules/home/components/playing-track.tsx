import Link from 'next/link'
import { useRef } from 'react'
import { animated, useSpring } from 'react-spring'
import { SpotifyData } from '../types'

export default function PlayingTrack({ data }: { data: SpotifyData }) {
    const wrapperRef = useRef<HTMLDivElement>(null)

    const { clipPath } = useSpring({
        from: {
            clipPath: 'polygon(0% 0%, 0% 100%, 0% 100%, 0% 0%)',
        },
        to: {
            clipPath: 'polygon(0% 0%, 0% 100%, 100% 100%, 100% 0%)',
        },
        config: {
            duration: 1500,
        },
    })

    if (!data.playingTrack?.is_playing || data.playingTrack.currently_playing_type !== 'track') {
        return <></>
    }

    const track = data.playingTrack.item
    const artist = track.artists.map(artist => artist.name).join(', ')

    return (
        <animated.div style={{ clipPath, zIndex: 1000 }} className="sticky top-0 left-0" ref={wrapperRef}>
            <section className={'my-8 -mb-16'}>
                <div className="h-32 bg-green-600 overflow-hidden relative mx-auto transition-all rounded-2xl max-w-full w-96">
                    <img
                        alt={track.name}
                        src={track.album.images[0]?.url}
                        width={384}
                        height={128}
                        className="bg-cover object-cover w-full h-full absolute top-0 left-0 z-0"
                    />
                    <div
                        className={
                            'relative z-10 bg-black bg-opacity-50 text-white px-3 flex items-center justify-center gap-2 h-full w-full overflow-hidden transition-all'
                        }
                    >
                        <div className="relative flex items-center justify-center w-28 h-28">
                            <img
                                alt="Plate"
                                src="/assets/plate.png"
                                className="animate-spin rounded-full absolute top-0 left-0 z-0"
                                width={300}
                                height={300}
                            />
                            <img
                                alt={track.name}
                                src={track.album.images[0]?.url}
                                width={90}
                                height={90}
                                className="rounded-full relative z-10"
                            />
                        </div>
                        <div
                            className={
                                'flex flex-col justify-center items-start gap-y-2 h-full py-3 transition-all flex-1'
                            }
                        >
                            <div>
                                <h6 className="text-base text-green-600">
                                    <Link href={track.external_urls.spotify} target="_blank" rel="noopener noreferrer">
                                        {track.name}
                                    </Link>
                                </h6>
                            </div>
                            <div>
                                <Link
                                    href={track.artists[0].external_urls?.spotify || '#'}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className="text-sm">{artist}</p>
                                </Link>

                                <Link
                                    href={track.album.external_urls.spotify}
                                    target="_blank"
                                    rel="noopener noreferrer"
                                >
                                    <p className="text-xs text-gray-300">{track.album.name}</p>
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </section>
        </animated.div>
    )
}
