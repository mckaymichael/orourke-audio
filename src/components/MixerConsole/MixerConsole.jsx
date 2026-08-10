import { useEffect, useRef, useState } from 'react'
import styles from './MixerConsole.module.css'

/**
 * MIXER CONSOLE
 *
 * Production portfolio layout, adapted from Concept 03 ("Mixer Console")
 * explored at /lab/portfolio-concepts. A DAW mixing-desk metaphor: the
 * monitor sits on the left, and the work becomes a rack of channel strips on
 * the right. Arming a channel routes that piece to the monitor.
 *
 * REAL PLAYBACK
 * Unlike the lab study, nothing here is simulated. Video channels render a
 * real <video> element with native controls, a poster frame, and the same
 * custom overlay play button used by the featured reel on the home page.
 * Audio channels render a real <audio> element with a console-style
 * transport: previous, play/pause, a seekable groove, elapsed time, and a
 * volume fader. The rack level meters only animate while the armed channel
 * is genuinely playing, so the desk reflects the actual transport state
 * rather than looping decoration.
 *
 * Audio channels have no moving picture, so the monitor holds a still frame
 * instead: the ACF `thumbnail` set on the portfolio item. Nothing animates
 * over it, which keeps the focus on the music.
 *
 * DATA
 * Expects WordPress "portfolio" items already enriched by the usePortfolio
 * hook, each carrying `media = { type, url, poster }`. See usePortfolio for
 * how that is resolved from ACF fields and Media Library attachments.
 */

/* ── Brand-coloured fallback art, so a broken image can never appear ─── */
function fallbackArt(seed = 0) {
  const hues = [
    ['#E8181F', '#121010'],
    ['#E8676C', '#1e1516'],
    ['#c01419', '#261518'],
    ['#8f0f14', '#121010'],
  ]
  const [a, b] = hues[seed % hues.length]
  const svg = `<svg xmlns='http://www.w3.org/2000/svg' width='800' height='500'>
    <defs><linearGradient id='g' x1='0' y1='0' x2='1' y2='1'>
      <stop offset='0' stop-color='${a}'/><stop offset='1' stop-color='${b}'/>
    </linearGradient></defs>
    <rect width='800' height='500' fill='url(%23g)'/>
    <g fill='none' stroke='%23F7F0F1' stroke-opacity='0.16' stroke-width='3'>
      ${Array.from({ length: 6 }, (_, i) => {
        const y = 90 + i * 65
        return `<path d='M0 ${y} Q 200 ${y - 45} 400 ${y} T 800 ${y}'/>`
      }).join('')}
    </g>
  </svg>`
  return `data:image/svg+xml;utf8,${svg.replace(/\n/g, '').replace(/#/g, '%23')}`
}

function Art({ src, seed = 0, alt = '', className }) {
  const [failed, setFailed] = useState(false)
  return (
    <img
      src={!src || failed ? fallbackArt(seed) : src}
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

function stripHtml(html) {
  return String(html ?? '').replace(/<[^>]*>/g, '').trim()
}

export default function MixerConsole({ items }) {
  const [active, setActive]     = useState(0)
  const [playing, setPlaying]   = useState(false)
  const [elapsed, setElapsed]   = useState(0)
  const [duration, setDuration] = useState(0)
  const [volume, setVolume]     = useState(1)
  const mediaRef = useRef(null)

  const item = items?.[active] ?? items?.[0] ?? null

  // Reset the transport whenever the incoming list changes, for example when
  // a category filter narrows the rack down to a different set of channels.
  useEffect(() => {
    setActive(0)
    setPlaying(false)
    setElapsed(0)
    setDuration(0)
  }, [items])

  useEffect(() => {
    if (mediaRef.current) mediaRef.current.volume = volume
  }, [item?.id, volume])

  if (!items || items.length === 0 || !item) return null

  const acf      = Array.isArray(item.acf) ? {} : (item.acf ?? {})
  const media    = item.media ?? { type: null, url: null, poster: null }
  const title    = item.title?.rendered ?? 'Untitled'
  const desc     = stripHtml(item.excerpt?.rendered) || stripHtml(acf.description)
  const isVideo  = media.type === 'video' && Boolean(media.url)
  const isAudio  = media.type === 'audio' && Boolean(media.url)
  const hasMedia = isVideo || isAudio
  const year     = acf.year ?? new Date(item.date).getFullYear()
  const category = acf.category || (isVideo ? 'Video' : isAudio ? 'Audio' : 'Piece')

  function arm(i) {
    if (i === active) return
    setActive(i)
    setPlaying(false)
    setElapsed(0)
    setDuration(0)
  }

  function skip(direction) {
    arm((active + direction + items.length) % items.length)
  }

  function togglePlay() {
    const el = mediaRef.current
    if (!el) return
    if (el.paused) el.play().catch(() => {})
    else el.pause()
  }

  function handleTimeUpdate(e) {
    setElapsed(e.currentTarget.currentTime)
  }

  function handleLoadedMetadata(e) {
    const el = e.currentTarget
    setDuration(el.duration)
    el.volume = volume
  }

  function handleSeek(e) {
    const el = mediaRef.current
    if (!el || !Number.isFinite(el.duration)) return
    const rect = e.currentTarget.getBoundingClientRect()
    const ratio = (e.clientX - rect.left) / rect.width
    el.currentTime = Math.min(Math.max(ratio, 0), 1) * el.duration
  }

  const progress = duration ? (elapsed / duration) * 100 : 0

  return (
    <div className={styles.wrap}>

      {/* ── Monitor ───────────────────────────────────────────── */}
      <div className={styles.monitor}>
        <div className={styles.monitorScreen}>
          {isVideo && (
            <>
              <video
                key={item.id}
                ref={mediaRef}
                src={media.url}
                poster={media.poster ?? undefined}
                controls
                preload="metadata"
                playsInline
                className={styles.monitorMedia}
                aria-label={`Video player for ${title}`}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <button
                type="button"
                className={`${styles.playBtn} ${playing ? styles.playBtnPlaying : ''}`}
                onClick={togglePlay}
                aria-label={playing ? `Pause ${title}` : `Play ${title}`}
              >
                <span aria-hidden="true">{playing ? '❚❚' : '►'}</span>
              </button>
            </>
          )}

          {isAudio && (
            <>
              <Art
                src={media.poster}
                seed={active}
                alt=""
                className={styles.monitorMedia}
              />
              <audio
                key={item.id}
                ref={mediaRef}
                src={media.url}
                preload="metadata"
                aria-label={`Audio player for ${title}`}
                onPlay={() => setPlaying(true)}
                onPause={() => setPlaying(false)}
                onEnded={() => setPlaying(false)}
                onTimeUpdate={handleTimeUpdate}
                onLoadedMetadata={handleLoadedMetadata}
              />
              <button
                type="button"
                className={`${styles.playBtn} ${playing ? styles.playBtnPlaying : ''}`}
                onClick={togglePlay}
                aria-label={playing ? `Pause ${title}` : `Play ${title}`}
              >
                <span aria-hidden="true">{playing ? '❚❚' : '►'}</span>
              </button>
            </>
          )}

          {!hasMedia && (
            <>
              <Art src={media.poster} seed={active} alt="" className={styles.monitorMedia} />
              <p className={styles.noMedia}>No media attached to this piece yet</p>
            </>
          )}

          <div className={styles.scanlines} aria-hidden="true" />
          <span className={`${styles.recDot} ${playing ? styles.recDotLive : ''}`}>
            {playing ? '● LIVE' : '● ARMED'}
          </span>
        </div>

        {/* Transport, for audio only. Video already carries native controls. */}
        {isAudio && (
          <div className={styles.transport}>
            <button
              type="button"
              className={styles.skipBtn}
              onClick={() => skip(-1)}
              disabled={items.length < 2}
              aria-label="Previous channel"
            >
              ⏮
            </button>
            <button
              type="button"
              className={styles.transportBtn}
              onClick={togglePlay}
              aria-label={playing ? 'Pause' : 'Play'}
            >
              {playing ? '❚❚' : '►'}
            </button>
            <button
              type="button"
              className={styles.skipBtn}
              onClick={() => skip(1)}
              disabled={items.length < 2}
              aria-label="Next channel"
            >
              ⏭
            </button>

            <div
              className={styles.groove}
              onClick={handleSeek}
              role="progressbar"
              aria-label="Seek"
              aria-valuemin={0}
              aria-valuemax={100}
              aria-valuenow={Math.round(progress)}
            >
              <span className={styles.grooveFill} style={{ width: `${progress}%` }} />
            </div>

            <span className={styles.time}>
              {formatTime(elapsed)}{duration ? ` / ${formatTime(duration)}` : ''}
            </span>

            <input
              type="range"
              min="0"
              max="1"
              step="0.01"
              value={volume}
              onChange={e => setVolume(Number(e.target.value))}
              className={styles.volume}
              aria-label="Volume"
            />
          </div>
        )}

        <div className={styles.monitorMeta}>
          <h3 className={styles.monitorTitle}>{title}</h3>
          <p className={styles.monitorSub}>
            {category}{year ? ` · ${year}` : ''}
          </p>
          {desc && <p className={styles.monitorDesc}>{desc}</p>}
        </div>
      </div>

      {/* ── Channel rack ──────────────────────────────────────── */}
      <div className={styles.rack}>
        <div className={styles.rackHead}>
          <span>CH</span><span>Piece</span><span>Level</span><span />
        </div>

        <ul className={styles.rackList}>
          {items.map((it, i) => {
            const on      = i === active
            const itMedia = it.media ?? {}
            const itAcf   = Array.isArray(it.acf) ? {} : (it.acf ?? {})
            const itYear  = itAcf.year ?? new Date(it.date).getFullYear()
            const itKind  = itMedia.type === 'video' ? 'Video'
                          : itMedia.type === 'audio' ? 'Audio'
                          : 'No media'
            return (
              <li key={it.id}>
                <button
                  type="button"
                  className={`${styles.channel} ${on ? styles.channelOn : ''}`}
                  onClick={() => arm(i)}
                  aria-pressed={on}
                >
                  <span className={styles.chNum}>{String(i + 1).padStart(2, '0')}</span>

                  <span className={styles.chInfo}>
                    <span className={styles.chTitle}>
                      {it.title?.rendered ?? 'Untitled'}
                    </span>
                    <span className={styles.chCat}>
                      {itAcf.category || itKind}{itYear ? ` · ${itYear}` : ''}
                    </span>
                  </span>

                  <span className={styles.chMeter} aria-hidden="true">
                    {Array.from({ length: 8 }, (_, s) => (
                      <span
                        key={s}
                        className={`${styles.seg} ${on && playing ? styles.segLive : ''} ${on ? styles.segArmed : ''}`}
                        style={{ animationDelay: `${s * 80}ms` }}
                      />
                    ))}
                  </span>

                  <span className={styles.chFader} aria-hidden="true">
                    <span
                      className={styles.faderCap}
                      style={{ bottom: on ? `${20 + volume * 58}%` : '20%' }}
                    />
                  </span>
                </button>
              </li>
            )
          })}
        </ul>
      </div>

    </div>
  )
}
