export interface SpotifyData {
    artists: SpotifyArtist[]
    tracks: SpotifyTrack[]
    genres: SpotifyGenre[]
    user: SpotifyUser
    playlists: SpotifyPlaylist[]
}

export interface SpotifyToken {
    access_token: string
    token_type: string
    expires_in: number
    refresh_token: string
}

export interface SpotifyUser {
    display_name: string
    external_urls: ExternalUrls
    followers: Followers
    href: string
    id: string
    images: Image[]
    type: string
    uri: string
}

export interface SpotifyPlaylist {
    collaborative: boolean
    description: string
    external_urls: ExternalUrls
    href: string
    id: string
    images: Image[]
    name: string
    owner: SpotifyUser
    primary_color: any
    public: boolean
    snapshot_id: string
    tracks: Tracks
    type: string
    uri: string
}

export interface Tracks {
    href: string
    total: number
}

export interface SpotifyGenre {
    name: string
    total: number
    percentage: number
}

export interface SpotifyArtist {
    external_urls: ExternalUrls
    followers: Followers
    genres: string[]
    href: string
    id: string
    images: Image[]
    name: string
    popularity: number
    type: string
    uri: string
}

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

export interface Album {
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

export interface ExternalUrls {
    spotify: string
}
export interface Image {
    height: number
    url: string
    width: number
}

export interface ExternalIds {
    isrc: string
}

export interface Followers {
    href: string
    total: number
}

export interface Image {
    height: number
    url: string
    width: number
}
