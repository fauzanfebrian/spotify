import React from 'react'
import { SpotifyData } from 'src/interface'

const URL = process.env.SPOTIFY_REDIRECT_URI?.split('/').splice(0, 3).join('/') || 'https://spotify.fauzanfebrian.my.id'

export default function Metadata({ data }: { data: SpotifyData }) {
    return (
        <>
            <meta charSet="UTF-8" />
            <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            <meta
                name="description"
                content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
            />
            <meta
                name="keywords"
                content="Spotify, music, statistics, top genres, top artists, top tracks, playlist, currently playing track"
            />
            <meta name="author" content={data.user.display_name} />

            <meta property="og:title" content={`${data.user.display_name}'s Spotify Statistics`} />
            <meta
                property="og:description"
                content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
            />
            <meta property="og:image" content={data.user.images[0].url} />
            <meta property="og:url" content={URL} />
            <meta property="og:type" content="website" />

            <meta name="twitter:card" content="summary_large_image" />
            <meta name="twitter:title" content={`${data.user.display_name}'s Spotify Statistics`} />
            <meta
                name="twitter:description"
                content={`Explore ${data.user.display_name} Spotify statistics, including top genres, artists, tracks, playlists, and currently playing track.`}
            />
            <meta name="twitter:image" content={data.user.images[0].url} />

            <link rel="icon" href={data.user.images[0].url} />

            <title>{`${data.user.display_name}'s Spotify Statistics`}</title>
        </>
    )
}
