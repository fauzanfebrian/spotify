import PlateImg from '@/assets/images/plate.png'
import Image from 'next/image'
import Link from 'next/link'
import { animated, useSpring } from 'react-spring'
import { SpotifyData } from '../types'

export default function PlayingTrack({ data }: { data: SpotifyData }) {
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

    const playingTrack = data.playingTrack

    if (!playingTrack?.is_playing || playingTrack.currently_playing_type !== 'track') {
        return <></>
    }

    const track = playingTrack.item
    const artist = track.artists.map(artist => artist.name).join(', ')

    return (
        <animated.div style={{ clipPath }}>
            <section className="my-8 -mb-16">
                <div className="max-w-full w-96 h-32 rounded-2xl bg-green-600 overflow-hidden relative">
                    <Image
                        alt={track.name}
                        src={track.album.images[0].url}
                        quality={30}
                        width={384}
                        height={128}
                        className="bg-cover object-cover w-full h-full absolute top-0 left-0 z-0"
                    />
                    <div className="relative z-10 bg-black bg-opacity-50 text-white px-3 flex items-center justify-center gap-2 h-full w-full overflow-hidden">
                        <div className="relative flex items-center justify-center w-28 h-28">
                            <Image
                                alt="Plate"
                                src={PlateImg}
                                className="animate-spin rounded-full absolute top-0 left-0 z-0"
                                width={300}
                                height={300}
                                quality={30}
                            />
                            <Image
                                alt={track.name}
                                src={track.album.images[0].url}
                                width={90}
                                height={90}
                                className="rounded-full relative z-10"
                                quality={50}
                            />
                        </div>
                        <div className="flex-1 flex flex-col justify-center items-start gap-y-2 h-full py-3">
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
