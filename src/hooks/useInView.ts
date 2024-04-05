import { useInView as useInViewSpring } from 'react-spring'

export default function useInView() {
    const inView = useInViewSpring({ once: true })

    return {
        ref: inView[0],
        inView: inView[1],
    }
}
