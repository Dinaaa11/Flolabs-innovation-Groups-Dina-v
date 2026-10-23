import React, { useEffect, useRef , useState} from 'react';
import { PODCAST_EPISODES } from './DeepMindShowcase';

const VERTEX_SHADER = `
attribute vec2 position;
varying vec2 vUv;
void main() {
  vUv = position * 0.5 + 0.5;
  gl_Position = vec4(position, 0.0, 1.0);
}
`;

const FRAGMENT_SHADER = `
precision mediump float;

varying vec2 vUv;

uniform float iTime;
uniform vec3  iResolution;
uniform float uScale;
uniform vec2  uGridMul;
uniform float uDigitSize;
uniform float uScanlineIntensity;
uniform float uGlitchAmount;
uniform float uFlickerAmount;
uniform float uNoiseAmp;
uniform float uCurvature;
uniform vec3  uTint;
uniform float uBrightness;

float time;

float hash21(vec2 p){
  p = fract(p * 234.56);
  p += dot(p, p + 34.56);
  return fract(p.x * p.y);
}

float noise(vec2 p) {
  return sin(p.x * 10.0) * sin(p.y * (3.0 + sin(time * 0.090909))) + 0.2;
}

mat2 rotate(float angle) {
  float c = cos(angle);
  float s = sin(angle);
  return mat2(c, -s, s, c);
}

float fbm(vec2 p) {
  p *= 1.1;
  float f = 0.0;
  float amp = 0.5 * uNoiseAmp;

  mat2 modify0 = rotate(time * 0.03);
  f += amp * noise(p);
  p = modify0 * p * 2.0;
  amp *= 0.454545;

  mat2 modify1 = rotate(time * 0.03);
  f += amp * noise(p);
  p = modify1 * p * 2.0;
  amp *= 0.454545;

  mat2 modify2 = rotate(time * 0.08);
  f += amp * noise(p);

  return f;
}

float pattern(vec2 p, out vec2 q, out vec2 r) {
  vec2 offset1 = vec2(1.0);
  vec2 offset0 = vec2(0.0);
  mat2 rot01 = rotate(0.12 * time);
  mat2 rot1 = rotate(0.1);

  q = vec2(fbm(p + offset1), fbm(rot01 * p + offset1));
  r = vec2(fbm(rot1 * q + offset0), fbm(q + offset0));
  return fbm(p + r);
}

float digit(vec2 p) {
  vec2 grid = uGridMul * 15.0;
  vec2 s = floor(p * grid) / grid;
  p = p * grid;
  vec2 q, r;
  float intensity = pattern(s * 0.1, q, r) * 1.35 - 0.03;

  p = fract(p);
  p *= uDigitSize;

  float px5 = p.x * 5.0;
  float py5 = (1.0 - p.y) * 5.0;
  float x = fract(px5);
  float y = fract(py5);

  float i = floor(py5) - 2.0;
  float j = floor(px5) - 2.0;
  float n = i * i + j * j;
  float f = n * 0.0625;

  float isOn = step(0.1, intensity - f);
  float brightness = isOn * (0.25 + y * 0.75) * (0.75 + x * 0.25);

  return step(0.0, p.x) * step(p.x, 1.0) * step(0.0, p.y) * step(p.y, 1.0) * brightness;
}

float onOff(float a, float b, float c) {
  return step(c, sin(iTime * 0.5 + a * cos(iTime * b * 0.5))) * uFlickerAmount;
}

float displace(vec2 look) {
  float y = look.y - mod(iTime * 0.08, 1.0);
  float window = 1.0 / (1.0 + 60.0 * y * y);
  return sin(look.y * 8.0 + iTime * 0.3) * 0.004 * onOff(4.0, 2.0, 0.92) * (1.0 + cos(iTime * 12.0)) * window;
}

vec3 getColor(vec2 p) {
  float bar = step(mod(p.y + time * 6.0, 1.0), 0.15) * 0.2 + 1.0;
  bar *= uScanlineIntensity;

  float displacement = displace(p);
  p.x += displacement;

  if (uGlitchAmount != 1.0) {
    float extra = displacement * (uGlitchAmount - 1.0);
    p.x += extra;
  }

  float middle = digit(p);

  const float off = 0.002;
  float sum = digit(p + vec2(-off, 0.0))
            + digit(p + vec2( off, 0.0))
            + digit(p + vec2(0.0, -off))
            + digit(p + vec2(0.0,  off))
            + digit(p + vec2(0.0,  0.0));

  vec3 baseColor = vec3(0.9) * middle + sum * 0.15 * vec3(1.0) * bar;
  return baseColor;
}

vec2 barrel(vec2 uv) {
  vec2 c = uv * 2.0 - 1.0;
  float r2 = dot(c, c);
  c *= 1.0 + uCurvature * r2;
  return c * 0.5 + 0.5;
}

void main() {
  time = iTime * 0.15;
  vec2 uv = vUv;

  if (uCurvature != 0.0) {
    uv = barrel(uv);
  }

  vec2 p = uv * uScale;
  vec3 col = getColor(p);

  col *= uTint;
  col *= uBrightness;

  gl_FragColor = vec4(col, 1.0);
}
`;

export const FromTheStudio: React.FC = () => {
  const [activeIdx, setActiveIdx] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const current = PODCAST_EPISODES[activeIdx] || PODCAST_EPISODES[0];
  const pick = (i: number) => { setActiveIdx(i); setIsPlaying(false); };
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    let gl: WebGLRenderingContext | null = null;
    try {
      gl =
        canvas.getContext('webgl', { alpha: false, antialias: false, powerPreference: 'high-performance' }) ||
        (canvas.getContext('experimental-webgl') as WebGLRenderingContext | null);
    } catch {
      gl = null;
    }

    if (!gl) return;

    let animId = 0;

    const compileShader = (type: number, source: string) => {
      const shader = gl!.createShader(type);
      if (!shader) return null;
      gl!.shaderSource(shader, source);
      gl!.compileShader(shader);
      if (!gl!.getShaderParameter(shader, gl!.COMPILE_STATUS)) {
        gl!.deleteShader(shader);
        return null;
      }
      return shader;
    };

    const vs = compileShader(gl.VERTEX_SHADER, VERTEX_SHADER);
    const fs = compileShader(gl.FRAGMENT_SHADER, FRAGMENT_SHADER);
    if (!vs || !fs) return;

    const prog = gl.createProgram();
    if (!prog) return;
    gl.attachShader(prog, vs);
    gl.attachShader(prog, fs);
    gl.linkProgram(prog);
    if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;

    gl.useProgram(prog);

    // Fullscreen quad
    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 3, -1, -1, 3]),
      gl.STATIC_DRAW
    );

    const posLoc = gl.getAttribLocation(prog, 'position');
    gl.enableVertexAttribArray(posLoc);
    gl.vertexAttribPointer(posLoc, 2, gl.FLOAT, false, 0, 0);

    // Uniforms
    const uTimeLoc = gl.getUniformLocation(prog, 'iTime');
    const uResLoc = gl.getUniformLocation(prog, 'iResolution');
    const uScaleLoc = gl.getUniformLocation(prog, 'uScale');
    const uGridMulLoc = gl.getUniformLocation(prog, 'uGridMul');
    const uDigitSizeLoc = gl.getUniformLocation(prog, 'uDigitSize');
    const uScanlineLoc = gl.getUniformLocation(prog, 'uScanlineIntensity');
    const uGlitchLoc = gl.getUniformLocation(prog, 'uGlitchAmount');
    const uFlickerLoc = gl.getUniformLocation(prog, 'uFlickerAmount');
    const uNoiseLoc = gl.getUniformLocation(prog, 'uNoiseAmp');
    const uCurvLoc = gl.getUniformLocation(prog, 'uCurvature');
    const uTintLoc = gl.getUniformLocation(prog, 'uTint');
    const uBrightLoc = gl.getUniformLocation(prog, 'uBrightness');

    // Values exact from FloStudios live production payload with calm background tuning
    gl.uniform1f(uScaleLoc, 1.3);
    gl.uniform2f(uGridMulLoc, 2.0, 1.0);
    gl.uniform1f(uDigitSizeLoc, 1.6);
    gl.uniform1f(uScanlineLoc, 0.9);
    gl.uniform1f(uGlitchLoc, 0.6);
    gl.uniform1f(uFlickerLoc, 0.25);
    gl.uniform1f(uNoiseLoc, 0.8);
    gl.uniform1f(uCurvLoc, 0.02);
    // Darker, rich amber orange (#D85800) matching live overlaid state
    gl.uniform3f(uTintLoc, 0.92, 0.36, 0.04);
    gl.uniform1f(uBrightLoc, 0.95);

    const resize = () => {
      const dpr = Math.min(window.devicePixelRatio || 1, 1.5);
      const w = Math.floor(canvas.clientWidth * dpr) || 600;
      const h = Math.floor(canvas.clientHeight * dpr) || 400;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
        gl!.viewport(0, 0, w, h);
        gl!.uniform3f(uResLoc, w, h, 0);
      }
    };

    resize();
    window.addEventListener('resize', resize, { passive: true });
    const ro = typeof ResizeObserver !== 'undefined' ? new ResizeObserver(resize) : null;
    ro?.observe(canvas);

    const startTime = performance.now();
    let visible = true;

    const loop = (now: number) => {
      animId = 0;
      if (!visible || document.hidden) return;
      const elapsed = (now - startTime) * 0.00045;
      gl!.uniform1f(uTimeLoc, elapsed);
      gl!.drawArrays(gl!.TRIANGLES, 0, 3);
      animId = requestAnimationFrame(loop);
    };

    const io = typeof IntersectionObserver !== 'undefined'
      ? new IntersectionObserver((entries) => {
          visible = entries.some((e) => e.isIntersecting);
          if (visible && !reduced && !animId) animId = requestAnimationFrame(loop);
        })
      : null;
    io?.observe(canvas);

    if (reduced) {
      gl.uniform1f(uTimeLoc, 2.0);
      gl.drawArrays(gl.TRIANGLES, 0, 3);
    } else {
      animId = requestAnimationFrame(loop);
    }

    return () => {
      io?.disconnect();
      ro?.disconnect();
      window.removeEventListener('resize', resize);
      cancelAnimationFrame(animId);
      if (gl) {
        gl.deleteProgram(prog);
        gl.deleteShader(vs);
        gl.deleteShader(fs);
        gl.deleteBuffer(buffer);
      }
    };
  }, []);

  return (
    <section
      className="ctd-band relative bg-white dark:bg-[#07090e] text-[#0f1115] dark:text-white transition-colors duration-300 py-20 sm:py-28 lg:py-32 overflow-hidden isolate"
      id="podcast"
    >
      {/* Animated WebGL background: dark = original CRT shader, light = inverted shader */}
      <div className="ctd-bg absolute inset-0 z-0 pointer-events-none" aria-hidden="true">
        <canvas
          ref={canvasRef}
          className="faulty-terminal-container absolute inset-0 w-full h-full object-cover invert opacity-40 dark:invert-0 dark:opacity-75"
        />

        {/* Protective gradient scrim preventing text contrast interference */}
        <div
          className="ctd-scrim absolute inset-0 pointer-events-none dark:hidden"
          style={{
            background:
              'radial-gradient(120% 90% at 28% 46%, rgba(255,255,255,0.72) 0%, rgba(255,255,255,0.88) 55%, rgba(255,255,255,0.96) 100%), linear-gradient(180deg, rgba(255,255,255,0.6) 0%, rgba(255,255,255,0.35) 40%, rgba(255,255,255,0.7) 100%)',
          }}
        />
        <div
          className="ctd-scrim absolute inset-0 pointer-events-none hidden dark:block"
          style={{
            background:
              'radial-gradient(120% 90% at 28% 46%, rgba(5,5,5,0.72) 0%, rgba(5,5,5,0.88) 55%, rgba(5,5,5,0.96) 100%), linear-gradient(180deg, rgba(5,5,5,0.6) 0%, rgba(5,5,5,0.35) 40%, rgba(5,5,5,0.7) 100%)',
          }}
        />
      </div>

      <div className="ctd-wrap relative z-10 max-w-[1360px] mx-auto px-6 sm:px-10 lg:px-14">
        <div className="ctd-grid grid grid-cols-1 lg:grid-cols-[1fr_1.1fr] gap-12 sm:gap-16 lg:gap-20 items-stretch">

          {/* Left: headline, copy, CTA, glowing mark, series caption */}
          <div className="ctd-copy relative flex flex-col items-start text-left min-h-[560px] lg:min-h-[640px]">
            <div className="ctd-mark-caption relative mb-8 inline-flex flex-col items-start gap-4 text-[11px] sm:text-[12px] font-bold tracking-[0.2em] uppercase text-[#FF6600]">
              <img src="/ConnectingTheDots_logo.svg" alt="" aria-hidden="true" className="h-20 sm:h-28 w-auto shrink-0 dark:drop-shadow-[0_0_24px_rgba(255,102,0,0.45)]" />
              <span>A FloLabs original series</span>
            </div>
            <h2 className="ctd-title relative font-['Google_Sans_Flex','Google_Sans',sans-serif] font-medium tracking-tight leading-[1.08] text-4xl sm:text-6xl lg:text-7xl text-[#0f1115] dark:text-white mb-6">
              See how FloLabs <br className="hidden sm:inline" />
              company <span className="text-[#387CEA] dark:text-[#38bdf8]">work.</span>
            </h2>
            <p className="ctd-lead relative text-base sm:text-lg lg:text-xl leading-relaxed text-[#3F5A68] dark:text-[#b9c6dc] max-w-xl mb-8">
              Explore our ongoing video and podcast series documenting FloLabs. Meet the team, and uncover the decisions and experiments behind our growth from the inside. View meetings and product development firsthand.
            </p>
            <a
              href="https://www.youtube.com/@FloLabsInnovation"
              target="_blank"
              rel="noopener noreferrer"
              className="ctd-cta relative inline-flex items-center justify-center gap-3 rounded-full px-7 py-3.5 text-sm font-semibold bg-black text-white dark:bg-white dark:text-black transition-opacity hover:opacity-85 group"
            >
              <span>Follow our growth</span>
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" className="w-4 h-4 transition-transform duration-300 group-hover:translate-x-1"><path d="M5 12h14" /><path d="M13 6l6 6-6 6" /></svg>
            </a>

          </div>

          {/* Right: podcast player + episode list */}
          <div className="ctd-podcast flex flex-col min-w-0" id="the-podcast">
            <div className="relative rounded-[24px] sm:rounded-[32px] overflow-hidden aspect-[16/10] sm:aspect-[16/9] bg-black border border-black/10 dark:border-white/10 shadow-2xl group">
              {isPlaying ? (
                <iframe
                  src={`https://www.youtube.com/embed/${current.youtubeId}?autoplay=1&rel=0&modestbranding=1`}
                  title={current.title}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  allowFullScreen
                  className="w-full h-full border-0"
                />
              ) : (
                <div className="relative w-full h-full cursor-pointer" onClick={() => setIsPlaying(true)}>
                  <img src={current.poster} alt={current.title} className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-[1.02]" />
                  <div className="absolute inset-0 bg-black/20 group-hover:bg-black/10 transition-colors" />
                  <div className="absolute inset-0 flex items-center justify-center">
                    <button
                      type="button"
                      aria-label={`Play ${current.title}`}
                      className="w-16 h-16 sm:w-20 sm:h-20 rounded-full bg-black/55 backdrop-blur-md border border-white/20 flex items-center justify-center transition-all duration-300 group-hover:scale-110 group-hover:bg-black/75 text-white"
                    >
                      <svg viewBox="0 0 24 24" fill="currentColor" className="w-6 h-6 sm:w-7 sm:h-7 translate-x-0.5"><path d="M8 5v14l11-7z" /></svg>
                    </button>
                  </div>
                </div>
              )}
            </div>

            <div className="mt-6 flex items-end justify-between gap-4">
              <div>
                <h3 className="font-['Google_Sans_Flex','Google_Sans',sans-serif] text-2xl sm:text-3xl font-medium tracking-tight text-[#0f1115] dark:text-white">The Podcast</h3>
                <p className="mt-1 text-base sm:text-lg text-[#387CEA] dark:text-[#a8c7fa]">The frontier of intelligence, explained</p>
              </div>
            </div>

            <div className="mt-5 flex flex-col" role="tablist" aria-label="Podcast Episodes">
              {PODCAST_EPISODES.map((ep, idx) => {
                const active = activeIdx === idx;
                return (
                  <button
                    key={ep.id}
                    type="button"
                    role="tab"
                    aria-selected={active}
                    onClick={() => pick(idx)}
                    className={`group relative w-full text-left px-6 py-4 border-b transition-colors cursor-pointer ${active ? 'border-black/30 dark:border-white/30' : 'border-black/15 dark:border-white/15'}`}
                  >
                    {active && <span className="absolute left-0 top-0 bottom-0 w-[3px] bg-[#387CEA] dark:bg-[#38bdf8]" />}
                    <span className="flex items-center justify-between gap-4">
                      <span className={`text-base sm:text-lg transition-colors ${active ? 'text-[#0f1115] dark:text-white font-semibold' : 'text-[#0f1115]/70 dark:text-white/70 group-hover:text-[#0f1115] dark:group-hover:text-white'}`}>{ep.title}</span>
                      <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={`w-5 h-5 shrink-0 text-[#0f1115] dark:text-white transition-transform duration-300 ${active ? 'rotate-90' : ''}`}><path d="M9 6l6 6-6 6" /></svg>
                    </span>
                    <span className={`block overflow-hidden transition-all duration-300 ease-in-out ${active ? 'max-h-40 opacity-100 mt-3' : 'max-h-0 opacity-0 mt-0 pointer-events-none'}`}>
                      <span className="block text-sm sm:text-[15px] leading-relaxed text-[#3F5A68] dark:text-[#c4c7c5] font-normal pr-8">{ep.subtitle}</span>
                    </span>
                  </button>
                );
              })}
            </div>

            <a
              href={`https://www.youtube.com/watch?v=${current.youtubeId}`}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-3 self-end text-sm text-[#0f1115]/70 dark:text-white/70 underline underline-offset-4 transition-colors hover:text-[#0f1115] dark:hover:text-white"
            >
              Watch on YouTube ↗
            </a>
          </div>

        </div>
      </div>

    </section>
  );
};
