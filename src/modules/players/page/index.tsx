/* eslint-disable @next/next/no-img-element */
'use client'
import axios from '@/axios'
import Head from 'next/head'
import { useEffect, useState } from 'react'
import { PlaybackData } from '../types/playback'
import { QueueData } from '../types/queue'
import { Track } from '../types/search'

export interface PlayerPageProps {
    data: {
        state: PlaybackData
        queue: QueueData
    } | null
}

export default function PlayerPage({ data }: PlayerPageProps) {
    const [playback, setData] = useState(data)
    const [tracksSearch, setTracksSearch] = useState<Track[]>([])
    const [search, setSearch] = useState('')
    const [showQueue, setShowQueue] = useState(false)

    const reload = async () => {
        const res = await axios.get('/player')
        setData(res.data)
    }

    useEffect(() => {
        const intervalId = setInterval(reload, 5000)

        const onKeydown = async (event: KeyboardEvent) => {
            if ((event.ctrlKey || event.metaKey) && event.ctrlKey && event.shiftKey && event.altKey) {
                const key = event.key.toLowerCase()
                event.preventDefault()

                if (key === 'n') {
                    await axios.post(`/next-queue`, undefined, {
                        params: {
                            device: state.device.id,
                        },
                    })
                    await reload()
                }

                if (key === 'q') {
                    setShowQueue(queue => !queue)
                }
            }
        }

        document.addEventListener('keydown', onKeydown)

        return () => {
            document.removeEventListener('keydown', onKeydown)
            clearInterval(intervalId)
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    if (!playback) {
        return (
            <main className="h-screen w-screen max-w-full bg-img flex justify-center items-center">
                <p className="text-green-600 font-gotham text-3xl">Pengguna sedang tidak mendengarkan musik</p>
            </main>
        )
    }

    const { queue, state } = playback
    const tracksQueue = queue.queue

    return (
        <>
            <Head>
                <title>Player</title>
            </Head>

            <div className="flex flex-wrap">
                <div className="w-full md:w-1/3 p-2">
                    <div>
                        <p className="text-green-600 italic font-bold text-xl">Now Playing</p>
                        <div className="flex flex-col justify-center xs:items-center xs:text-center mt-4 text-white">
                            <img
                                src={state.item.album.images[0].url}
                                alt={state.item.name}
                                width={200}
                                height={200}
                                loading="lazy"
                            />
                            <p>{state.item.name}</p>
                            <p>{state.item.artists.map(artist => artist.name).join(', ')}</p>
                        </div>
                    </div>

                    {showQueue && (
                        <div className="mt-4">
                            <p className="text-green-600 italic font-bold text-xl">Add track to queue</p>
                            <div className="mt-4">
                                {/* style this input with tailwind */}
                                <input
                                    type="text"
                                    className="border border-gray-300 rounded-md px-4 py-2 focus:outline-none focus:border-green-600 w-full"
                                    onChange={async e => {
                                        setSearch(e.target.value)
                                        const res = await axios.get(`/search`, {
                                            params: {
                                                search: e.target.value,
                                            },
                                        })
                                        setTracksSearch(res.data)
                                    }}
                                    placeholder="Search track to add"
                                    value={search}
                                />

                                {tracksSearch.map((track, index) => (
                                    <div key={index} className="text-white text-sm flex space-x-2 items-end">
                                        <div>
                                            <img
                                                loading="lazy"
                                                src={track.album.images[0].url}
                                                alt={track.name}
                                                width={60}
                                                height={60}
                                            />
                                        </div>
                                        <div className="flex-1">
                                            <p className="text-xs">{track.name}</p>
                                            <p className="text-xs">
                                                {track.artists.map(artist => artist.name).join(', ')}
                                            </p>
                                        </div>
                                        <div>
                                            <button
                                                className="text-2xl bg-green-600 rounded-lg px-2 py-1"
                                                onClick={async () => {
                                                    setSearch('')
                                                    setTracksSearch([])

                                                    const resAdd = await axios.post(`/add-queue`, undefined, {
                                                        params: {
                                                            uri: track.uri,
                                                            device: state.device.id,
                                                        },
                                                    })

                                                    if (resAdd.data) {
                                                        reload()
                                                    }
                                                }}
                                            >
                                                +
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
                <div className="w-full md:w-2/3 p-2">
                    <p className="text-green-600 italic font-bold text-xl">What&apos;s Next?</p>
                    <div className="mt-4">
                        {tracksQueue.map((track, index) => (
                            <div key={index} className="text-white text-sm flex space-x-2 items-end">
                                <div>
                                    <img
                                        loading="lazy"
                                        src={track.album.images[0].url}
                                        alt={track.name}
                                        width={60}
                                        height={60}
                                    />
                                </div>
                                <div>
                                    <p>{track.name}</p>
                                    <p>{track.artists.map(artist => artist.name).join(', ')}</p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </div>
        </>
    )
}
