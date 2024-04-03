import { RefObject, createContext } from 'react'

export const HomeContext = createContext({
    playAudio: (() => {}) as (playerRef: RefObject<HTMLAudioElement>) => void,
    pauseAudio: () => {},
})
