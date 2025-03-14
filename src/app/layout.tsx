/* eslint-disable @next/next/no-img-element */
import { GOOGLE_TAG_ID } from '@/config'
import type { Metadata } from 'next'
import { Poppins } from 'next/font/google'
import Script from 'next/script'
import './globals.css'

const poppims = Poppins({ weight: '400', subsets: ['latin'] })

export const metadata: Metadata = {
    title: 'Create Next App',
    description: 'Generated by create next app',
}

export const revalidate = 0

export default function RootLayout({
    children,
}: Readonly<{
    children: React.ReactNode
}>) {
    return (
        <html lang="en">
            <head>
                <meta charSet="UTF-8" />
                <meta name="viewport" content="width=device-width, initial-scale=1.0" />
            </head>
            <body className={poppims.className}>
                <div id="app_wrapper">{children}</div>
                <img
                    alt="bg-img"
                    src="/assets/background.jpg"
                    className="object-cover z-0 w-screen h-screen fixed top-0"
                />
            </body>

            {!!GOOGLE_TAG_ID && (
                <>
                    <Script src={`https://www.googletagmanager.com/gtag/js?id=${GOOGLE_TAG_ID}`} />
                    <Script id="google-analytics">
                        {`
                            window.dataLayer = window.dataLayer || [];
                            function gtag(){dataLayer.push(arguments);}
                            gtag('js', new Date());
                            gtag('config', '${GOOGLE_TAG_ID}');
                        `}
                    </Script>
                </>
            )}
        </html>
    )
}
