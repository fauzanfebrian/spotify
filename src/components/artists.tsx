import Link from 'next/link'
import { useState } from 'react'
import { SpotifyArtist } from 'src/interface'
import Card from './card'
import Carousel from './carousel'

export default function Artists({ artists }: { artists: SpotifyArtist[] }) {
    const [showAll, setShowAll] = useState(false)
    const [isGrabbing, setIsGrabbing] = useState(false)

    return (
        <section className={['my-10 w-full', isGrabbing ? 'select-none' : ''].join(' ')}>
            <div className="flex justify-between">
                <h3 className="text-xl md:text-3xl text-white">Top artists</h3>
                <button className="text-gray-400" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Hide' : 'Show All'}
                </button>
            </div>

            <Carousel isGrabbing={isGrabbing} setIsGrabbing={setIsGrabbing} showAll={showAll}>
                {artists.map(artist => (
                    <Card
                        key={`${artist.id}-artist`}
                        thumbnailUrl={artist.images?.[0]?.url}
                        title={
                            <Link
                                href={artist.external_urls.spotify}
                                className="text-lg text-white text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {artist.name}
                            </Link>
                        }
                        full={showAll}
                    />
                ))}
            </Carousel>
        </section>
    )
}
