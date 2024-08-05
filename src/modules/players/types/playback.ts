interface Device {
    id: string
    is_active: boolean
    is_private_session: boolean
    is_restricted: boolean
    name: string
    supports_volume: boolean
    type: string
    volume_percent: number
}

interface ExternalUrls {
    spotify: string
}

interface Artist {
    external_urls: ExternalUrls
    href: string
    id: string
    name: string
    type: string
    uri: string
}

interface Album {
    album_type: string
    artists: Artist[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: {
        height: number
        url: string
        width: number
    }[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}

interface Item {
    album: Album
    artists: Artist[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: {
        isrc: string
    }
    external_urls: ExternalUrls
    href: string
    id: string
    is_local: boolean
    name: string
    popularity: number
    preview_url: string
    track_number: number
    type: string
    uri: string
}

interface Context {
    external_urls: ExternalUrls
    href: string
    type: string
    uri: string
}

interface Actions {
    disallows: {
        resuming: boolean
    }
}

export interface PlaybackData {
    device: Device
    shuffle_state: boolean
    smart_shuffle: boolean
    repeat_state: string
    timestamp: number
    context: Context
    progress_ms: number
    item: Item
    currently_playing_type: string
    actions: Actions
    is_playing: boolean
}
