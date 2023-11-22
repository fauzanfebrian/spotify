import Link from 'next/link'
import { useState } from 'react'
import { SpotifyTrack } from 'src/interface/track'
import Card from './card'
import Carousel from './carousel'

export default function Tracks({ tracks }: { tracks: SpotifyTrack[] }) {
    const [isGrabbing, setIsGrabbing] = useState(false)
    const [showAll, setShowAll] = useState(false)

    return (
        <section className={['my-10 w-full', isGrabbing ? 'select-none' : ''].join(' ')}>
            <div className="flex justify-between">
                <h3 className="text-xl md:text-3xl text-white">Top tracks</h3>
                <button className="text-gray-400" onClick={() => setShowAll(!showAll)}>
                    {showAll ? 'Hide' : 'Show All'}
                </button>
            </div>

            <Carousel isGrabbing={isGrabbing} setIsGrabbing={setIsGrabbing} showAll={showAll}>
                {tracks.map(track => (
                    <Card
                        key={`track-${track.id}`}
                        thumbnailUrl={track.album.images?.[0]?.url}
                        trackPreviewUrl={track.preview_url}
                        title={
                            <Link
                                href={track.external_urls.spotify}
                                className="text-lg text-white text-center"
                                target="_blank"
                                rel="noopener noreferrer"
                            >
                                {track.name}
                            </Link>
                        }
                        subTitle={
                            <Link
                                href={track?.album?.external_urls?.spotify}
                                className="text-xs text-gray-300 text-center"
                            >
                                {track.artists?.[0]?.name} - {track?.album?.name}
                            </Link>
                        }
                        full={showAll}
                    />
                ))}
            </Carousel>
        </section>
    )
}
