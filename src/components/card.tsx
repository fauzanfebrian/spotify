import Image from 'next/image'

export interface CardProps {
    full?: boolean
    thumbnailUrl: string
    title: JSX.Element
    subTitle?: JSX.Element
}

export default function Card({ full, thumbnailUrl, title, subTitle }: CardProps) {
    return (
        <div
            className={[
                'shadow flex items-center h-32 flex-shrink-0 bg-green-600 bg-opacity-60 rounded-lg pr-3',
                full ? 'max-w-full' : '',
            ].join(' ')}
        >
            {!!thumbnailUrl && (
                <div className="w-32 h-32 mr-3">
                    <Image
                        src={thumbnailUrl}
                        width={125}
                        height={125}
                        alt={`${title?.toString() || 'Thumbnail'} Image`}
                        className={['w-full h-full', full ? 'rounded-l-lg' : 'rounded-l-sm'].join(' ')}
                    />
                </div>
            )}
            <div className="min-w-[125px] flex justify-center items-center flex-col flex-1">
                {title}
                {subTitle}
            </div>
        </div>
    )
}
