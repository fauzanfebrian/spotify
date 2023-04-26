import React, { Dispatch, SetStateAction, useRef } from 'react'

interface ContainerRefType extends HTMLDivElement {
    touchStartX?: number
    touchStartScrollLeft?: number
}

export interface CarouselProps {
    children: React.ReactNode
    isGrabbing: boolean
    setIsGrabbing: Dispatch<SetStateAction<boolean>>
}

export default function Carousel({ children, isGrabbing, setIsGrabbing }: CarouselProps) {
    const containerRef = useRef<ContainerRefType>(null)

    function handleTouchStart(event: React.TouchEvent<HTMLDivElement>) {
        if (!containerRef.current) return
        if (event.touches.length === 1) {
            const touch = event.touches[0]
            containerRef.current.touchStartX = touch.clientX
            containerRef.current.touchStartScrollLeft = containerRef.current.scrollLeft
        }
    }

    function handleTouchMove(event: React.TouchEvent<HTMLDivElement>) {
        if (!containerRef.current) return
        if (event.touches.length === 1) {
            const touch = event.touches[0]
            const touchDeltaX = touch.clientX - containerRef.current.touchStartX! - 30
            containerRef.current.scrollLeft = containerRef.current.touchStartScrollLeft! - touchDeltaX - 30
        }
    }

    function handleTouchEnd() {
        if (!containerRef.current) return
        containerRef.current.touchStartX = undefined
        containerRef.current.touchStartScrollLeft = undefined
    }

    function handleMouseDown(event: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current) return
        setIsGrabbing(true)
        containerRef.current.touchStartX = event.clientX
        containerRef.current.touchStartScrollLeft = containerRef.current.scrollLeft
    }

    function handleMouseMove(event: React.MouseEvent<HTMLDivElement>) {
        if (!containerRef.current || !isGrabbing) return

        if (containerRef.current.touchStartX) {
            const touchDeltaX = event.clientX - containerRef.current.touchStartX - 30
            containerRef.current.scrollLeft = (containerRef.current.touchStartScrollLeft || 0) - touchDeltaX - 30
        }
    }

    function handleMouseUp() {
        if (!containerRef.current) return
        setIsGrabbing(false)
        containerRef.current.touchStartX = undefined
        containerRef.current.touchStartScrollLeft = undefined
    }

    return (
        <div
            className="card-container mt-3 flex flex-nowrap justify-start items-center overflow-x-scroll gap-x-4"
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            onMouseUp={handleMouseUp}
            onMouseLeave={() => setIsGrabbing(false)}
            ref={containerRef}
            style={{
                cursor: isGrabbing ? 'grabbing' : 'grab',
                overflowX: 'auto',
                WebkitOverflowScrolling: 'auto',
                scrollBehavior: 'smooth',
            }}
        >
            {children}
        </div>
    )
}
