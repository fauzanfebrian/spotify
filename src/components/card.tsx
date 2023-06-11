import Image from 'next/image'

export interface CardProps {
    fullRounded?: boolean
    thumbnailUrl: string
    title: JSX.Element
    subTitle?: JSX.Element
}

export default function Card({ fullRounded, thumbnailUrl, title, subTitle }: CardProps) {
    return (
        <div className="shadow flex items-center h-32 flex-shrink-0 bg-green-600 pr-3 bg-opacity-60 rounded-lg">
            {!!thumbnailUrl && (
                <div className="w-32 h-full mr-3">
                    <Image
                        src={thumbnailUrl}
                        width={125}
                        height={125}
                        alt={`${title?.toString() || 'Thumbnail'} Image`}
                        className={['w-full h-full', fullRounded ? 'rounded-l-lg' : 'rounded-l-sm'].join(' ')}
                    />
                </div>
            )}
            <div className="min-w-[125px] flex justify-center items-center flex-col">
                {title}
                {subTitle}
            </div>
        </div>
    )
}
