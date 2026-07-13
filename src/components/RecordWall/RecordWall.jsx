import { useEffect, useRef, useState } from 'react'
import styles from './RecordWall.module.css'

/**
 * RECORD WALL
 *
 * Production portfolio layout, adapted from Concept 02 ("Record Wall")
 * explored at /lab/portfolio-concepts. A turntable "now playing" deck sits
 * beside a crate of sleeves; selecting a sleeve loads its real audio or
 * video into the deck.
 *
 * Audio items spin on the platter and play through a real audio element,
 * with custom transport controls (previous / play-pause / next) and a
 * volume slider directly below the title. Video items swap the platter for
 * a video frame and play through a real video element with native controls
 * (which already include play/pause and volume).
 *
 * Expects WordPress "portfolio" items (see usePortfolio hook / wp.js) with
 * ACF fields: audio_url, video_url, media_type, description, category, year.
 * Cover art comes from _embedded['wp:featuredmedia'] when present; falls
 * back to a generated brand-coloured gradient so a broken-image icon can
 * never appear.
 */

function fallbackCover(seed = 0) {
  const hues = [
    ['#E8181F', '#121010'],
    ['#E8676C', '#1e1516'],
    ['#c01419', '#261518'],
    ['#8f0f14', '#121010'],
  ]
  const [a, b] = hues[seed % hues.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='600' height='600'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
    </linearGradient></defs>
    <rect width='600' height='600' fill='url(%23g)'/>
    <g fill='none' stroke='%23F7F0F1' stroke-opacity='0.18' stroke-width='3'>
      ${Array.from({ length: 7 }, (_, i) => {
        const y = 120 + i * 55
        return `<path d='M0 ${y} Q 150 ${y - 40} 300 ${y} T 600 ${y}'/>`
      }).join('')}
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${svg.replace(/\n/g, '').replace(/#/g, '%23')}`
}

function coverSrc(item) {
  return item._embedded?.['wp:featuredmedia']?.[0]?.source_url ?? null
}

function Cover({ src, seed = 0, alt = '', className }) {
  const [failed, setFailed] = useState(false)
  const url = !src || failed ? fallbackCover(seed) : src
  return (
    <img
      src={url}
      alt={alt}
      loading="lazy"
      className={className}
      onError={() => setFailed(true)}
    />
  )
}

function formatTime(seconds) {
  if (!Number.isFinite(seconds)) return '0:00'
  const m = Math.floor(seconds / 60)
  const s = Math.floor(seconds % 60).toString().padStart(2, '0')
  return `${m}:${s}`
}

export default function RecordWall({ items }) {
  const [active, setActive]     = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [progress, setProgress] = useState(0)
  const [elapsed, setElapsed]   = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume]     = useState(1)
  const mediaRef = useRef(null)

  const item = items?.[active] ?? items?.[0] ?? null

  useEffect(() => {
    setActive(0)
    setPlaying(false)
    setProgress(0)
    setElapsed(0)
    setDuration(0)
  }, [items])

  useEffect(() => {
    if (mediaRef.current) mediaRef.current.volume = volume
  }, [item?.id, volume])

  if (!items || items.length === 0 || !item) return null

  const acf     = item.acf ?? {}
  const title   = item.title?.rendered ?? 'Untitled'
  const desc    = item.excerpt?.rendered ?? acf.description ?? ''
  const isVideo = acf.media_type === 'video' && Boolean(acf.video_url)
  const src     = isVideo ? acf.video_url : acf.audio_url

  function select(i) {
    setActive(i)
    setPlaying(false)
    setProgress(0)
    setElapsed(0)
    setDuration(0)
  }

  function skip(direction) {
    const next = (active + direction + items.length) % items.length
    select(next)
  }

  function togglePlay() {
    const el = mediaRef.current
    if (!el) return
    if (playing) el.pause()
    else el.play().catch(() => {})
  }

  function handleTimeUpdate(e) {
    const el = e.currentTarget
    setElapsed(el.currentTime)
    if (el.duration) setProgress((el.currentTime / el.duration) * 100)
  }

  function handleLoadedMetadata(e) {
    setDuration(e.currentTarget.duration)
  }

  function handleVolumeChange(e) {
    setVolume(Number(e.target.value))
  }

  return (
    <div className={styles.wrap}>
      <div className={styles.deck}>
        <div className={`${styles.turntable} ${isVideo ? styles.turntableVideo : ''}`}>
          {isVideo ? (
            <div className={styles.videoFrame}>
              {src ? (
                <video
                  key={item.id}
                  ref={mediaRef}
                  src={src}
                  poster={coverSrc(item) ?? undefined}
                  controls
                  preload="metadata"
                  className={styles.videoEl}
                  onPlay={() => setPlaying(true)}
                  onPause={() => setPlaying(false)}
                  onTimeUpdate={handleTimeUpdate}
                  onLoadedMetadata={handleLoadedMetadata}
                  onEnded={() => setPlaying(false)}
                  aria-label={`Video player for ${title}`}
                />
              ) : (
                <Cover src={coverSrc(item)} seed={active} alt="" className={styles.videoPoster} />
              )}
            </div>
          ) : (
            <>
              <div className={`${styles.platter} ${playing ? styles.platterSpin : ''}`}>
                <Cover src={coverSrc(item)} seed={active} alt="" className={styles.disc} />
                <div className={styles.spindle} />
              </div>
              <div className={styles.tonearm} />
            </>
          )}
        </div>

        <div className={styles.nowPlaying}>
          <span className={styles.npTag}>{isVideo ? 'Now showing' : 'Now playing'}</span>
          <h3 className={styles.npTitle}>{title}</h3>

          {!isVideo && src && (
            <>
              <audio
                key={item.id}
                ref={mediaRef}
                src={src}
                preload="metadata"
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
                onEnded={() => setPlaying(false)}
                aria-label={`Audio player for ${title}`}
              />

              <div className={styles.transport}>
                <button
                  className={styles.skipBtn}
                  onClick={() => skip(-1)}
                  aria-label="Previous track"
                  disabled={items.length < 2}
                >
                  ⏮
                </button>
                <button
                  className={styles.transportBtn}
                  onClick={togglePlay}
                  aria-label={playing ? 'Pause' : 'Play'}
                >
                  {playing ? '❚❚' : '►'}
                </button>
                <button
                  className={styles.skipBtn}
                  onClick={() => skip(1)}
                  aria-label="Next track"
                  disabled={items.length < 2}
                >
                  ⏭
                </button>
                <div className={styles.groove}>
                  <span className={styles.grooveFill} style={{ width: `${progress}%` }} />
                </div>
                <span className={styles.npTime}>
                  {formatTime(elapsed)}
                  {duration ? ` / ${formatTime(duration)}` : ''}
                </span>
              </div>

              <div className={styles.volumeRow}>
                <span className={styles.volumeIcon} aria-hidden="true">
                  {volume === 0 ? '🔇' : volume < 0.5 ? '🔉' : '🔊'}
                </span>
                <input
                  type="range"
                  min="0"
                  max="1"
                  step="0.01"
                  value={volume}
                  onChange={handleVolumeChange}
                  className={styles.volumeSlider}
                  aria-label="Volume"
                />
              </div>
            </>
          )}

          <p className={styles.npMeta}>
            {acf.category}
            {acf.category && acf.year ? ' · ' : ''}
            {acf.year}
          </p>
          {desc && (
            <div className={styles.npDesc} dangerouslySetInnerHTML={{ __html: desc }} />
          )}
        </div>
      </div>

      <div className={styles.crate} role="list" aria-label="Portfolio pieces">
        {items.map((it, i) => {
          const itAcf   = it.acf ?? {}
          const itVideo = itAcf.media_type === 'video' && Boolean(itAcf.video_url)
          return (
            <button
              key={it.id}
              role="listitem"
              className={`${styles.sleeve} ${i === active ? styles.sleeveActive : ''}`}
              onClick={() => select(i)}
              aria-pressed={i === active}
            >
              <span className={styles.record} />
              <span className={styles.sleeveArt}>
                <Cover src={coverSrc(it)} seed={i} alt="" className={styles.sleeveImg} />
                <span className={styles.sleeveBadge}>{itVideo ? 'Video' : 'Audio'}</span>
              </span>
              <span className={styles.sleeveInfo}>
                <span className={styles.sleeveTitle}>{it.title?.rendered ?? 'Untitled'}</span>
                <span className={styles.sleeveCat}>{itAcf.category}</span>
              </span>
            </button>
          )
        })}
      </div>
    </div>
  )
}
