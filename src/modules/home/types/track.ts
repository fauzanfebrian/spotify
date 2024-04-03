import { ExternalUrls, Image } from '.'
import { SpotifyArtist } from './artist'

export interface SpotifyTrack {
    album: Album
    artists: Partial<SpotifyArtist>[]
    available_markets: string[]
    disc_number: number
    duration_ms: number
    explicit: boolean
    external_ids: ExternalIds
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

export interface ExternalIds {
    isrc: string
}

interface Album {
    album_type: string
    artists: Partial<SpotifyArtist>[]
    available_markets: string[]
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    release_date: string
    release_date_precision: string
    total_tracks: number
    type: string
    uri: string
}
