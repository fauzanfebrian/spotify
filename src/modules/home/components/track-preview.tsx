import { PauseIcon, PlayIcon } from '@/assets/icons'
import { useContext, useRef, useState } from 'react'
import { HomeContext } from '../context'

export default function TrackPreview({ url }: { url: string }) {
    const playerRef = useRef<HTMLAudioElement>(null)
    const { playAudio, pauseAudio } = useContext(HomeContext)
    const [isPlaying, setIsPlaying] = useState(false)

    return (
        <>
            <button
                className="btn-play-track absolute top-0 flex justify-center items-center w-full h-full bg-black bg-opacity-20 hover:bg-opacity-40"
                onClick={() => {
                    if (!isPlaying) playAudio(playerRef)
                    else pauseAudio()
                    setIsPlaying(!isPlaying)
                }}
            >
                <div className="w-1/4">
                    {isPlaying ? <PauseIcon className="fill-white" /> : <PlayIcon className="fill-white" />}
                </div>
            </button>
            <audio
                controls
                ref={playerRef}
                className="hidden"
                onEnded={() => setIsPlaying(false)}
                onPause={() => setIsPlaying(false)}
            >
                <source src={url} type="audio/mpeg" />
            </audio>
        </>
    )
}
