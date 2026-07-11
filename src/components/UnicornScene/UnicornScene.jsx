import { useEffect, useRef } from 'react'
import styles from './UnicornScene.module.css'

/**
 * UnicornScene
 *
 * Animated shader background with two modes:
 *
 * 1. Unicorn Studio embed. Pass a `projectId` (the embed ID from a published
 *    Unicorn Studio scene) and the official SDK is lazy-loaded from the CDN,
 *    then the scene is mounted into this element via UnicornStudio.addScene().
 *
 * 2. Built-in WebGL fallback. With no `projectId`, an original fragment
 *    shader written for the O'Rourke brand renders instead. Pick a look with
 *    the `variant` prop: 'emberFlow', 'ripple', or 'signal'.
 *
 * The fallback pauses when scrolled out of view, tracks the pointer for
 * interactive movement, and renders a single static frame when the user
 * prefers reduced motion. Both modes clean up fully on unmount.
 */

const SDK_SRC =
  'https://cdn.jsdelivr.net/gh/hiunicornstudio/unicornstudio.js@v2.2.2/dist/unicornStudio.umd.js'

let sdkPromise = null

function loadUnicornSdk() {
  if (window.UnicornStudio) return Promise.resolve(window.UnicornStudio)
  if (sdkPromise) return sdkPromise
  sdkPromise = new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.src = SDK_SRC
    script.async = true
    script.onload = () => resolve(window.UnicornStudio)
    script.onerror = () => {
      sdkPromise = null
      reject(new Error('Unicorn Studio SDK failed to load'))
    }
    document.head.appendChild(script)
  })
  return sdkPromise
}

function mountUnicornEmbed(host, projectId) {
  let scene = null
  let cancelled = false

  if (!host.id) {
    host.id = `unicorn-${Math.random().toString(36).slice(2, 9)}`
  }

  loadUnicornSdk()
    .then((UnicornStudio) =>
      UnicornStudio.addScene({
        elementId: host.id,
        projectId,
        lazyLoad: true,
        production: true,
        scale: 1,
        dpi: 1.5,
      })
    )
    .then((s) => {
      if (cancelled) {
        s.destroy()
      } else {
        scene = s
      }
    })
    .catch((err) => {
      console.error('UnicornScene embed error:', err)
    })

  return () => {
    cancelled = true
    if (scene) scene.destroy()
  }
}

/* ── Built-in WebGL fallback ─────────────────────────────────────────── */

const VERT = `
attribute vec2 aPos;
void main() {
  gl_Position = vec4(aPos, 0.0, 1.0);
}
`

const SHADER_HEAD = `
precision highp float;
uniform vec2 uRes;
uniform float uTime;
uniform vec2 uMouse;

vec3 BG    = vec3(0.071, 0.063, 0.063);
vec3 DEEP  = vec3(0.149, 0.082, 0.094);
vec3 RED   = vec3(0.910, 0.094, 0.122);
vec3 ROSE  = vec3(0.910, 0.404, 0.424);

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(127.1, 311.7))) * 43758.5453123);
}

float noise(vec2 p) {
  vec2 i = floor(p);
  vec2 f = fract(p);
  vec2 u = f * f * (3.0 - 2.0 * f);
  return mix(
    mix(hash(i), hash(i + vec2(1.0, 0.0)), u.x),
    mix(hash(i + vec2(0.0, 1.0)), hash(i + vec2(1.0, 1.0)), u.x),
    u.y
  );
}

float fbm(vec2 p) {
  float v = 0.0;
  float a = 0.5;
  for (int i = 0; i < 5; i++) {
    v += a * noise(p);
    p = p * 2.03 + vec2(11.3, 7.7);
    a *= 0.5;
  }
  return v;
}
`

/* Molten, slow-drifting ember smoke. The pointer drags a warm glow around. */
const FRAG_EMBER = `${SHADER_HEAD}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  float t = uTime * 0.06;
  vec2 q = vec2(fbm(p * 1.6 + t), fbm(p * 1.6 - t * 0.7));
  vec2 r = vec2(fbm(p * 2.2 + q * 1.4 + t * 0.5), fbm(p * 2.2 - q * 1.1));
  float f = fbm(p * 1.8 + r * 1.2);

  vec3 col = mix(BG, DEEP, smoothstep(0.15, 0.7, f));
  col = mix(col, RED * 0.85, smoothstep(0.45, 0.95, f) * 0.85);
  col = mix(col, ROSE, smoothstep(0.72, 1.0, f * q.y) * 0.35);

  vec2 m = uMouse;
  m.x *= uRes.x / uRes.y;
  float glow = exp(-length(p - m) * 3.2);
  col += RED * glow * 0.35;

  float vig = smoothstep(1.25, 0.35, length(uv - 0.5));
  col *= mix(0.75, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

/* Concentric pressure waves, like sound radiating from a source. The wave
   origin eases toward the pointer. */
const FRAG_RIPPLE = `${SHADER_HEAD}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;
  vec2 p = uv;
  p.x *= uRes.x / uRes.y;

  vec2 m = uMouse;
  m.x *= uRes.x / uRes.y;

  float d1 = length(p - m);
  float d2 = length(p - vec2(uRes.x / uRes.y * 0.75, 0.3));

  float w1 = sin(d1 * 28.0 - uTime * 2.2);
  float w2 = sin(d2 * 22.0 - uTime * 1.6);
  float field = (w1 + w2) * 0.5;

  float grain = fbm(p * 3.0 + uTime * 0.05) * 0.25;
  field += grain;

  float ring = smoothstep(0.55, 1.0, field);
  float faint = smoothstep(0.1, 0.9, field) * 0.35;

  vec3 col = mix(BG, DEEP, faint + 0.2);
  col = mix(col, RED * 0.9, ring * exp(-d1 * 1.1));
  col = mix(col, ROSE * 0.8, ring * exp(-d2 * 1.4) * 0.6);

  float vig = smoothstep(1.3, 0.3, length(uv - 0.5));
  col *= mix(0.7, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

/* A broadcast test signal: a noisy oscilloscope trace over scanlines with
   occasional horizontal interference. Pointer height bends the trace. */
const FRAG_SIGNAL = `${SHADER_HEAD}
void main() {
  vec2 uv = gl_FragCoord.xy / uRes;

  float t = uTime;
  float bend = (uMouse.y - 0.5) * 0.25;
  float wave = 0.5 + bend
    + sin(uv.x * 9.0 + t * 1.4) * 0.06
    + sin(uv.x * 23.0 - t * 2.3) * 0.03
    + (fbm(vec2(uv.x * 4.0, t * 0.4)) - 0.5) * 0.12;

  float dist = abs(uv.y - wave);
  float trace = exp(-dist * 60.0);
  float halo = exp(-dist * 9.0) * 0.5;

  float scan = sin(uv.y * uRes.y * 1.6) * 0.04;
  float tear = step(0.985, hash(vec2(floor(t * 3.0), floor(uv.y * 40.0)))) * 0.5;
  float xJit = tear * (hash(vec2(t, uv.y)) - 0.5) * 0.02;
  float dist2 = abs(uv.y - wave + xJit);
  trace = max(trace, exp(-dist2 * 60.0) * 0.8);

  vec3 col = BG + scan * DEEP;
  col = mix(col, DEEP, 0.35 + halo);
  col += RED * trace;
  col += ROSE * halo * 0.4;

  float vig = smoothstep(1.2, 0.3, length(uv - 0.5));
  col *= mix(0.65, 1.0, vig);

  gl_FragColor = vec4(col, 1.0);
}
`

const FRAGS = {
  emberFlow: FRAG_EMBER,
  ripple: FRAG_RIPPLE,
  signal: FRAG_SIGNAL,
}

function compile(gl, type, src) {
  const sh = gl.createShader(type)
  gl.shaderSource(sh, src)
  gl.compileShader(sh)
  if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
    console.error('UnicornScene shader error:', gl.getShaderInfoLog(sh))
    gl.deleteShader(sh)
    return null
  }
  return sh
}

function mountFallbackShader(host, variant) {
  const canvas = document.createElement('canvas')
  host.appendChild(canvas)

  const gl = canvas.getContext('webgl', { antialias: false })
  if (!gl) {
    host.removeChild(canvas)
    return () => {}
  }

  const vs = compile(gl, gl.VERTEX_SHADER, VERT)
  const fs = compile(gl, gl.FRAGMENT_SHADER, FRAGS[variant] || FRAG_EMBER)
  if (!vs || !fs) {
    host.removeChild(canvas)
    return () => {}
  }

  const prog = gl.createProgram()
  gl.attachShader(prog, vs)
  gl.attachShader(prog, fs)
  gl.linkProgram(prog)
  gl.useProgram(prog)

  const buf = gl.createBuffer()
  gl.bindBuffer(gl.ARRAY_BUFFER, buf)
  gl.bufferData(
    gl.ARRAY_BUFFER,
    new Float32Array([-1, -1, 3, -1, -1, 3]),
    gl.STATIC_DRAW
  )
  const aPos = gl.getAttribLocation(prog, 'aPos')
  gl.enableVertexAttribArray(aPos)
  gl.vertexAttribPointer(aPos, 2, gl.FLOAT, false, 0, 0)

  const uRes = gl.getUniformLocation(prog, 'uRes')
  const uTime = gl.getUniformLocation(prog, 'uTime')
  const uMouse = gl.getUniformLocation(prog, 'uMouse')

  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches
  const dpr = Math.min(window.devicePixelRatio || 1, 1.5)

  let raf = 0
  let running = false
  let visible = true
  const start = performance.now()

  /* Pointer eases toward the cursor for a fluid, weighted feel. */
  const mouse = { x: 0.5, y: 0.5, tx: 0.5, ty: 0.5 }

  function resize() {
    const w = host.clientWidth
    const h = host.clientHeight
    if (!w || !h) return
    canvas.width = Math.round(w * dpr)
    canvas.height = Math.round(h * dpr)
    gl.viewport(0, 0, canvas.width, canvas.height)
  }

  function draw(now) {
    mouse.x += (mouse.tx - mouse.x) * 0.06
    mouse.y += (mouse.ty - mouse.y) * 0.06
    gl.uniform2f(uRes, canvas.width, canvas.height)
    gl.uniform1f(uTime, (now - start) / 1000)
    gl.uniform2f(uMouse, mouse.x, 1.0 - mouse.y)
    gl.drawArrays(gl.TRIANGLES, 0, 3)
  }

  function loop(now) {
    draw(now)
    raf = requestAnimationFrame(loop)
  }

  function play() {
    if (running || reduceMotion || !visible) return
    running = true
    raf = requestAnimationFrame(loop)
  }

  function pause() {
    running = false
    cancelAnimationFrame(raf)
  }

  function onPointerMove(e) {
    const rect = host.getBoundingClientRect()
    mouse.tx = (e.clientX - rect.left) / Math.max(rect.width, 1)
    mouse.ty = (e.clientY - rect.top) / Math.max(rect.height, 1)
  }

  const ro = new ResizeObserver(() => {
    resize()
    if (reduceMotion) draw(performance.now())
  })
  ro.observe(host)

  const io = new IntersectionObserver(([entry]) => {
    visible = entry.isIntersecting
    if (visible) play()
    else pause()
  })
  io.observe(host)

  window.addEventListener('pointermove', onPointerMove, { passive: true })

  resize()
  if (reduceMotion) {
    draw(performance.now())
  } else {
    play()
  }

  return () => {
    pause()
    ro.disconnect()
    io.disconnect()
    window.removeEventListener('pointermove', onPointerMove)
    gl.getExtension('WEBGL_lose_context')?.loseContext()
    if (canvas.parentNode === host) host.removeChild(canvas)
  }
}

export default function UnicornScene({ projectId, variant = 'emberFlow', className = '' }) {
  const hostRef = useRef(null)

  useEffect(() => {
    const host = hostRef.current
    if (!host) return undefined
    if (projectId) return mountUnicornEmbed(host, projectId)
    return mountFallbackShader(host, variant)
  }, [projectId, variant])

  const cls = className ? `${styles.scene} ${className}` : styles.scene
  return <div ref={hostRef} className={cls} aria-hidden="true" />
}
