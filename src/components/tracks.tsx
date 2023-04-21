import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SpotifyTrack } from 'src/interface'
import Carousel from './carousel'

export default function Tracks({ tracks }: { tracks: SpotifyTrack[] }) {
    const [isGrabbing, setIsGrabbing] = useState(false)

    return (
        <section className={['my-10 w-full', isGrabbing ? 'select-none' : ''].join(' ')}>
            <h3 className="text-xl md:text-3xl text-white">Top tracks</h3>

            <Carousel isGrabbing={isGrabbing} setIsGrabbing={setIsGrabbing}>
                {tracks.map(track => (
                    <div
                        key={`track-${track.id}`}
                        className="shadow rounded-r-lg flex items-center h-32 flex-shrink-0 bg-green-600 pr-3 bg-opacity-60"
                    >
                        <div className="w-32 h-full mr-3">
                            <Image
                                src={track.album.images?.[0]?.url}
                                width={125}
                                height={125}
                                alt={`${track.album.name} Image`}
                                className="w-full h-full rounded-sm"
                            />
                        </div>
                        <div className="min-w-[125px] flex justify-center items-center flex-col">
                            <Link
                                href={track.external_urls.spotify}
                                className="text-lg text-white text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {track.name}
                            </Link>
                            <Link href={track?.album?.external_urls?.spotify} className="text-sm text-gray-300">
                                {track.artists?.[0]?.name} - {track?.album?.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    )
}
