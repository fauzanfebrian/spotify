import { SpotifyArtist } from 'src/interface/artist'
import { SpotifyGenre } from 'src/interface/genre'

export function topGenres(artists: SpotifyArtist[]): SpotifyGenre[] {
    const mappedGenres = artists
        .flatMap(artist => artist.genres)
        .reduce((object, genre) => {
            if (!object[genre]) {
                object[genre] = { name: genre, total: 1, percentage: 0 }
            } else {
                object[genre].total += 1
            }

            return object
        }, {} as Record<string, SpotifyGenre>)

    const genres = Object.values(mappedGenres)

    const dataGenres = genres
        .sort((a, b) => {
            if (b.total === a.total) {
                if (b.name < a.name) return 1
                else return -1
            }
            return b.total - a.total
        })
        .splice(0, 10)

    const totalArtistInGenres = dataGenres.reduce((curr, genre) => curr + genre.total, 0)

    dataGenres.forEach(genre => {
        const percentage = (genre.total / totalArtistInGenres) * 100
        genre.percentage = +percentage.toFixed(2)
    })

    return dataGenres
}
