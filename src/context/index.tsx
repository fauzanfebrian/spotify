import { RefObject, createContext } from 'react'

export const AppContext = createContext({
    playAudio: (() => {}) as (playerRef: RefObject<HTMLAudioElement>) => void,
    pauseAudio: () => {},
})
