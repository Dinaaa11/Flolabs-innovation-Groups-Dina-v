const canvasRef = useRef<HTMLCanvasElement>(null);

useEffect(() => {
  const canvas = canvasRef.current;
  if (!canvas) return;

  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    return;
  }

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

  // Uniform locations
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

  // Tuned parameters for the warm orange/amber CRT atmosphere
  gl.uniform1f(uScaleLoc, 1.3);
  gl.uniform2f(uGridMulLoc, 2.0, 1.0);
  gl.uniform1f(uDigitSizeLoc, 1.6);
  gl.uniform1f(uScanlineLoc, 0.9);
  gl.uniform1f(uGlitchLoc, 0.6);
  gl.uniform1f(uFlickerLoc, 0.25);
  gl.uniform1f(uNoiseLoc, 0.8);
  gl.uniform1f(uCurvLoc, 0.02);
  // Deep warm amber tint (#D85800)
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

  const startTime = performance.now();

  const loop = (now: number) => {
    const elapsed = (now - startTime) * 0.00045;
    gl!.uniform1f(uTimeLoc, elapsed);
    gl!.drawArrays(gl!.TRIANGLES, 0, 3);
    animId = requestAnimationFrame(loop);
  };

  animId = requestAnimationFrame(loop);

  return () => {
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