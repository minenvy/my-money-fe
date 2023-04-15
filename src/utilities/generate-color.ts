// 175-255 0-145 0-145
const randomColor = function (mainColor: boolean) {
  return mainColor
    ? Math.floor(Math.random() * 80) + 175
    : Math.floor(Math.random() * 145)
}

export default function generateBackgroundColor() {
  const main = Math.floor(Math.random() * 3)
  const r = randomColor(main === 0)
  const g = randomColor(main === 1)
  const b = randomColor(main === 2)
  return `rgba(${r},${g},${b},0.2)`
}