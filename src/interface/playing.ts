import { SpotifyTrack } from './track'

export interface PlayingTrack {
    context: Context
    timestamp: number
    progress_ms: number
    is_playing: boolean
    item: SpotifyTrack
    currently_playing_type: string
    actions: Actions
}

interface Context {
    type: string
    href: string
    external_urls: ExternalUrls
    uri: string
}

interface ExternalUrls {
    spotify: string
}

interface Actions {
    disallows: Disallows
}

interface Disallows {
    resuming: boolean
    seeking: boolean
    skipping_prev: boolean
    toggling_repeat_track: boolean
    toggling_shuffle: boolean
}
