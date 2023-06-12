import { useContext, useRef, useState } from 'react'
import { PauseIcon, PlayIcon } from 'src/assets/icons'
import { AppContext } from 'src/context'

export default function TrackPrview({ url }: { url: string }) {
    const playerRef = useRef<HTMLAudioElement>(null)
    const { playAudio, pauseAudio } = useContext(AppContext)
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
                <div className="w-1/4">{isPlaying ? <PauseIcon /> : <PlayIcon />}</div>
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
