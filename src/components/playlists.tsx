import Image from 'next/image'
import Link from 'next/link'
import { useState } from 'react'
import { SpotifyPlaylist } from 'src/interface'
import Carousel from './carousel'

export default function Playlists({ playlists }: { playlists: SpotifyPlaylist[] }) {
    const [isGrabbing, setIsGrabbing] = useState(false)

    return (
        <section className={['my-10 w-full', isGrabbing ? 'select-none' : ''].join(' ')}>
            <h3 className="text-xl md:text-3xl text-white">Playlists</h3>

            <Carousel isGrabbing={isGrabbing} setIsGrabbing={setIsGrabbing}>
                {playlists.map(playlist => (
                    <div
                        key={`playlist-${playlist.id}`}
                        className="flex-col relative shadow rounded-lg flex items-center h-56 flex-shrink-0 bg-green-600 bg-opacity-60"
                    >
                        <div className="w-full h-full absolute z-0 bg-playlist">
                            <Image
                                src={playlist.images?.[0].url}
                                width={125}
                                height={125}
                                alt={`${playlist.name} Image`}
                                className="w-full h-full rounded-sm z-0"
                            />
                        </div>
                        <div className="w-full h-28 relative z-10 bg-green-600 p-3 box-border mb-3">
                            <Image
                                src={playlist.images?.[0].url}
                                width={125}
                                height={125}
                                alt={`${playlist.name} Image`}
                                className="m-auto w-28 h-28 rounded-sm z-0"
                            />
                        </div>
                        <div className="min-w-[14rem] flex flex-col items-center z-10 relative justify-between flex-1 px-3 py-1">
                            <div className="flex flex-col justify-center">
                                <h6 className="text-lg text-white text-center">{playlist.name}</h6>
                                <h6 className="text-sm text-gray-300 -mt-1 text-center">{playlist.description}</h6>
                            </div>
                            <h6 className="text-center text-sm text-gray-400">{playlist.tracks?.total} songs</h6>
                        </div>
                        <Link
                            href={playlist.external_urls.spotify}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="absolute w-full h-full z-10"
                        />
                    </div>
                ))}
            </Carousel>
        </section>
    )
}
