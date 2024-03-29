import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PlayingTrack } from 'src/interface/playing'
import Plate from 'src/assets/images/plate.png'

export default function PlayingTrack({ playingTrack }: { playingTrack: PlayingTrack }) {
    const track = playingTrack.item

    return (
        <section className="mt-20 mb-10 w-full">
            <div className="flex mt-8 max-sm:flex-wrap gap-6 max-sm:justify-center items-center">
                <div className="w-40 h-w-40 relative rounded flex items-center justify-center">
                    <Image
                        src={Plate}
                        alt="plate"
                        width={500}
                        height={500}
                        className="animate-spin absolute z-0"
                        priority
                    />
                    <Image
                        loading="lazy"
                        src={track.album.images?.[0]?.url}
                        width={125}
                        height={125}
                        alt={`Image Playing Track`}
                        className="rounded-full relative z-10 w-auto h-auto"
                    />
                </div>
                <div className="bg-opacity-40 relative max-w-xs max-sm:w-full">
                    <Link
                        href={track.external_urls.spotify}
                        className="text-lg text-green-600 max-sm:text-center block mb-3"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {track.name}
                    </Link>
                    <Link
                        href={track?.artists?.[0]?.external_urls?.spotify || '#'}
                        className="text-white max-sm:text-center block text-base"
                    >
                        {track.artists?.[0]?.name}
                    </Link>
                    <Link
                        href={track?.album?.external_urls?.spotify}
                        className="text-gray-300 max-sm:text-center block text-sm"
                    >
                        {track?.album?.name}
                    </Link>
                </div>
            </div>
        </section>
    )
}
