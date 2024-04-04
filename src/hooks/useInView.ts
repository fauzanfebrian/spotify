import { IntersectionArgs, useInView as useInViewSpring } from 'react-spring'

export default function useInView(args?: IntersectionArgs) {
    const inView = useInViewSpring(args)

    return {
        ref: inView[0],
        inView: inView[1],
    }
}
