import Image from 'next/image'
import Link from 'next/link'
import React from 'react'
import { PlayingTrack } from 'src/interface/playing'
import Plate from 'src/assets/images/plate.png'

export default function PlayingTrack({ playingTrack }: { playingTrack: PlayingTrack }) {
    const track = playingTrack.item

    return (
        <section className="mt-28 mb-10 w-full">
            <div className="flex mt-8 max-sm:flex-wrap gap-6 max-sm:justify-center items-center">
                <div className="w-40 h-w-40 relative rounded flex items-center justify-center">
                    <Image src={Plate} alt="plate" width={500} height={500} className="animate-spin absolute z-0" />
                    <Image
                        src={track.album.images?.[0]?.url}
                        width={125}
                        height={125}
                        alt={`Image`}
                        className="rounded-full relative z-10"
                    />
                </div>
                <div className="bg-opacity-40 relative max-w-xs">
                    <Link
                        href={track.external_urls.spotify}
                        className="text-lg text-white max-sm:text-center block mb-2"
                        target="_blank"
                        rel="noopener noreferrer"
                    >
                        {track.name}
                    </Link>
                    <Link
                        href={track?.album?.external_urls?.spotify}
                        className="text-xs text-gray-300 max-sm:text-center block"
                    >
                        {track.artists?.[0]?.name} - {track?.album?.name}
                    </Link>
                </div>
            </div>
        </section>
    )
}
