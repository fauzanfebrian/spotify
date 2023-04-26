import { ArcElement, Chart, Legend, Title } from 'chart.js'
import { Doughnut } from 'react-chartjs-2'
import { SpotifyGenre } from 'src/interface'

Chart.register(ArcElement, Legend, Title)

export default function Genres({ genres }: { genres: SpotifyGenre[] }) {
    const total = genres.reduce((prev, acc) => prev + acc.total, 0)
    const genreNames = genres.map(genre => genre.name)
    const genreTotals = genres.map(genre => genre.total)

    const data = {
        labels: genreNames.splice(0, 5),
        datasets: [
            {
                data: genreTotals.splice(0, 5),
                backgroundColor: ['#1DB954', '#FFFF00', '#0E185F', '#3B0000', '#FF1E1E'],
            },
        ],
    }

    return (
        <section className="my-10 w-full">
            <h3 className="text-xl md:text-3xl text-white">Genres</h3>
            <div className="flex justify-center md:items-center md:justify-start mt-6 flex-col md:flex-row">
                <div className="h-full w-full md:w-1/3 mb-6 md:mb-0 md:mr-3">
                    <Doughnut data={data} options={{ animation: false }} className="w-full" title="Top 5" />
                </div>
                <div className="flex-1">
                    {genres.map((genre, i) => {
                        const percentage = (genre.total / total) * 100
                        return (
                            <div key={`genre-${i}`} className="flex justify-between my-1 items-center">
                                <h4 className="text-white capitalize w-[100px] md:w-[250px]">{genre.name}</h4>
                                <div className="flex items-center justify-end flex-1">
                                    <div className="h-[17px] bg-red-500" style={{ width: `${percentage}%` }} />
                                </div>
                            </div>
                        )
                    })}
                </div>
            </div>
        </section>
    )
}
