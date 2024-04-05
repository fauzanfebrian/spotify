import { PieChart, pieChartDefaultProps } from 'react-minimal-pie-chart'
import { SpotifyData } from '../types'

export default function Chart({ data }: { data: SpotifyData }) {
    const lineWidth = 60

    const datasource = [
        { title: data.genres[0].name, value: data.genres[0].percentage, color: '#018383' },
        { title: data.genres[1].name, value: data.genres[1].percentage, color: '#02A8A8' },
        { title: data.genres[2].name, value: data.genres[2].percentage, color: '#42E6A4' },
        { title: data.genres[3].name, value: data.genres[3].percentage, color: '#F5DEA3' },
        { title: data.genres[4].name, value: data.genres[4].percentage, color: '#444941' },
    ]

    return (
        <>
            <PieChart
                style={{
                    fontFamily: '"Nunito Sans", -apple-system, Helvetica, Arial, sans-serif',
                    fontSize: '6px',
                }}
                data={datasource}
                radius={pieChartDefaultProps.radius - 6}
                lineWidth={lineWidth}
                segmentsStyle={{ transition: 'stroke .3s', cursor: 'pointer' }}
                segmentsShift={index => (index === 0 ? 6 : 1)}
                animate
                label={({ dataEntry }) => Math.round(dataEntry.percentage) + '%'}
                labelPosition={100 - lineWidth / 2}
                labelStyle={{
                    fill: '#fff',
                    opacity: 0.75,
                    pointerEvents: 'none',
                }}
                className="h-5/6"
            />
            <div className="w-full flex items-center justify-center flex-wrap gap-1 h-1/6">
                {datasource.map(({ color, title }, i) => {
                    return (
                        <div className="flex items-center gap-1" key={i}>
                            <div className="w-3 h-3" style={{ background: color }} />
                            <p className="text-xs text-white capitalize">{title}</p>
                        </div>
                    )
                })}
            </div>
        </>
    )
}
