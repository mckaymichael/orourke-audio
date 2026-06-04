import styles from './WaveStack.module.css'
import waveSvg from '../../images/wave.svg'

const WAVE_COUNT = 20
const FIRST_HEIGHT = 19.73
const ASPECT = 1425 / 464 // SVG viewBox width / height

const waves = Array.from({ length: WAVE_COUNT }, (_, i) => {
  const height = FIRST_HEIGHT * Math.pow(1.25, i)
  return { height, width: height * ASPECT, zIndex: WAVE_COUNT - i }
})

export default function WaveStack() {
  return (
    <div className={styles.container} aria-hidden="true">
      {waves.map(({ height, width, zIndex }, i) => (
        <img
          key={i}
          src={waveSvg}
          className={styles.wave}
          style={{ width: `${width}px`, height: `${height}px`, zIndex }}
          alt=""
        />
      ))}
    </div>
  )
}
