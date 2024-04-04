export const to = (i: number) => ({
    x: 0,
    y: i * -4,
    scale: 1,
    rot: -10 + Math.random() * 20,
    delay: i * 75,
})

export const from = (_i: number) => ({ x: 0, rot: 0, scale: 1.15, y: -75 })

export const trans = (r: number, s: number) => {
    return `perspective(1500px) rotateX(30deg) rotateY(${r / 10}deg) rotateZ(${r}deg) scale(${s})`
}
