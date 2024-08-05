'use client'
import Head from 'next/head'
import { PlaybackData } from '../types/playback'
import { QueueData } from '../types/queue'
import Image from 'next/image'

export interface PlayerPageProps {
    state: PlaybackData
    queue: QueueData
}

export default function PlayerPage({ queue, state }: PlayerPageProps) {
    const tracksQueue = queue.queue

    return (
        <>
            <Head>
                <title>Player</title>
            </Head>

            <p className="text-white p-2">Diputar Selanjutnya</p>
            {tracksQueue.map((track, index) => (
                // use tailwindcss for styling
                <div key={index} className="text-white text-sm p-2 flex space-x-2 items-end">
                    <div>
                        <Image src={track.album.images[0].url} alt={track.name} width={60} height={60} />
                    </div>
                    <div>
                        <p>{track.name}</p>
                        <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                    </div>
                </div>
            ))}
        </>
    )
}
