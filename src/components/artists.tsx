import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SpotifyArtist } from 'src/interface'
import Carousel from './carousel'

export default function Artists({ artists }: { artists: SpotifyArtist[] }) {
    const [isGrabbing, setIsGrabbing] = useState(false)

    return (
        <section className={['my-10 w-full', isGrabbing ? 'select-none' : ''].join(' ')}>
            <h3 className="text-xl md:text-3xl text-white">Top artists</h3>

            <Carousel isGrabbing={isGrabbing} setIsGrabbing={setIsGrabbing}>
                {artists.map(artist => (
                    <div
                        key={`artist-${artist.id}`}
                        className="shadow rounded-r-lg flex items-center h-32 flex-shrink-0 bg-green-600 pr-3 bg-opacity-60"
                    >
                        <div className="w-32 h-full mr-3">
                            <Image
                                src={artist.images?.[0].url}
                                width={125}
                                height={125}
                                alt={`${artist.name} Image`}
                                className="w-full h-full rounded-sm"
                            />
                        </div>
                        <div className="min-w-[125px] flex justify-center">
                            <Link
                                href={artist.external_urls.spotify}
                                className="text-lg text-white text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {artist.name}
                            </Link>
                        </div>
                    </div>
                ))}
            </Carousel>
        </section>
    )
}
