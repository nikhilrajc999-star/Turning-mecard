import React, { useEffect, useRef } from 'react';

export const CosmicShader: React.FC<{ className?: string }> = ({ className = '' }) => {
  const canvasRef = useRef<HTMLCanvasElement | null>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext('webgl') || canvas.getContext('experimental-webgl');
    if (!gl) return;

    let animFrameId: number;
    let isDestroyed = false;

    function syncSize() {
      if (!canvas) return;
      const w = canvas.clientWidth || 1280;
      const h = canvas.clientHeight || 720;
      if (canvas.width !== w || canvas.height !== h) {
        canvas.width = w;
        canvas.height = h;
      }
    }

    syncSize();
    const resizeObserver = new ResizeObserver(() => syncSize());
    resizeObserver.observe(canvas);

    const vsSource = `
      attribute vec2 a_position;
      varying vec2 v_texCoord;
      void main() {
        v_texCoord = a_position * 0.5 + 0.5;
        gl_Position = vec4(a_position, 0.0, 1.0);
      }
    `;

    const fsSource = `
      precision highp float;
      uniform float u_time;
      uniform vec2 u_resolution;
      uniform vec2 u_mouse;
      varying vec2 v_texCoord;

      float hash(vec2 p) {
        p = fract(p * vec2(123.34, 456.21));
        p += dot(p, p + 45.32);
        return fract(p.x * p.y);
      }

      float noise(vec2 p) {
        vec2 i = floor(p);
        vec2 f = fract(p);
        f = f * f * (3.0 - 2.0 * f);
        float a = hash(i);
        float b = hash(i + vec2(1.0, 0.0));
        float c = hash(i + vec2(0.0, 1.0));
        float d = hash(i + vec2(1.0, 1.0));
        return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
      }

      float fbm(vec2 p) {
        float v = 0.0;
        float a = 0.5;
        mat2 rot = mat2(cos(0.5), sin(0.5), -sin(0.5), cos(0.5));
        for (int i = 0; i < 4; ++i) {
          v += a * noise(p);
          p = rot * p * 2.0 + vec2(100.0);
          a *= 0.5;
        }
        return v;
      }

      void main() {
        vec2 uv = (gl_FragCoord.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        vec2 mouse = (u_mouse.xy - 0.5 * u_resolution.xy) / min(u_resolution.x, u_resolution.y);
        float distToMouse = length(uv - mouse);
        
        float t = u_time * 0.25;
        
        float r = length(uv);
        float angle = atan(uv.y, uv.x);
        
        float spiral = angle * 2.0 + r * 3.5 - t * 0.8;
        vec2 p = vec2(cos(spiral), sin(spiral)) * r * 1.5;
        
        float q = fbm(p + vec2(t * 0.2, -t * 0.15));
        float q2 = fbm(p * 2.0 - vec2(t * 0.3, t * 0.1) + q);
        
        vec3 voidColor = vec3(0.025, 0.012, 0.05);
        vec3 violet = vec3(0.66, 0.33, 0.97);
        vec3 cyan = vec3(0.22, 0.74, 0.97);
        vec3 glowMagenta = vec3(0.91, 0.47, 0.98);
        
        vec3 col = mix(voidColor, violet * 0.45, q * 1.2);
        col = mix(col, cyan * 0.45, pow(q2, 2.5) * 1.4);
        col += glowMagenta * pow(q2 * q, 3.0) * 1.6;
        
        float mouseGlow = smoothstep(0.45, 0.0, distToMouse);
        col += cyan * mouseGlow * 0.35;
        col += violet * mouseGlow * 0.25;
        
        vec2 gridUV = uv * 12.0;
        vec2 gridId = floor(gridUV);
        float rnd = hash(gridId);
        if (rnd > 0.68) {
          float speed = 0.5 + rnd * 1.5;
          vec2 pPos = sin(vec2(t * speed + rnd * 6.28, t * speed * 0.8 + rnd * 3.14)) * 0.35 + 0.5;
          vec2 cellFrac = fract(gridUV);
          float pDist = length(cellFrac - pPos);
          float spark = smoothstep(0.12, 0.01, pDist);
          vec3 sparkCol = mix(cyan, violet, rnd);
          col += sparkCol * spark * (0.8 + 0.6 * sin(t * 4.0 + rnd * 10.0));
        }
        
        float starGlitter = pow(hash(floor(uv * 36.0) + vec2(floor(t * 1.8))), 24.0);
        col += vec3(0.9, 0.95, 1.0) * starGlitter * 0.65;
        
        float corePortal = smoothstep(0.9, 0.1, r);
        col += violet * 0.15 * corePortal;
        
        float vig = 1.0 - smoothstep(0.55, 1.4, length(uv));
        col *= vig;

        gl_FragColor = vec4(col, 1.0);
      }
    `;

    function createShader(type: number, source: string) {
      if (!gl) return null;
      const shader = gl.createShader(type);
      if (!shader) return null;
      gl.shaderSource(shader, source);
      gl.compileShader(shader);
      if (!gl.getShaderParameter(shader, gl.COMPILE_STATUS)) {
        gl.deleteShader(shader);
        return null;
      }
      return shader;
    }

    const vs = createShader(gl.VERTEX_SHADER, vsSource);
    const fs = createShader(gl.FRAGMENT_SHADER, fsSource);
    if (!vs || !fs) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vs);
    gl.attachShader(program, fs);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) {
      return;
    }

    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, 1, 1]),
      gl.STATIC_DRAW
    );

    const posAttr = gl.getAttribLocation(program, 'a_position');
    gl.enableVertexAttribArray(posAttr);
    gl.vertexAttribPointer(posAttr, 2, gl.FLOAT, false, 0, 0);

    const uTime = gl.getUniformLocation(program, 'u_time');
    const uRes = gl.getUniformLocation(program, 'u_resolution');
    const uMouse = gl.getUniformLocation(program, 'u_mouse');

    const mousePos = { x: canvas.width / 2, y: canvas.height / 2 };

    const onMouseMove = (e: MouseEvent) => {
      const rect = canvas.getBoundingClientRect();
      if (rect.width && rect.height) {
        const nx = (e.clientX - rect.left) / rect.width;
        const ny = 1.0 - (e.clientY - rect.top) / rect.height;
        mousePos.x = nx * canvas.width;
        mousePos.y = ny * canvas.height;
      }
    };

    window.addEventListener('mousemove', onMouseMove);

    const render = (time: number) => {
      if (isDestroyed) return;
      gl.viewport(0, 0, canvas.width, canvas.height);
      if (uTime) gl.uniform1f(uTime, time * 0.001);
      if (uRes) gl.uniform2f(uRes, canvas.width, canvas.height);
      if (uMouse) gl.uniform2f(uMouse, mousePos.x, mousePos.y);

      gl.drawArrays(gl.TRIANGLE_STRIP, 0, 4);
      animFrameId = requestAnimationFrame(render);
    };

    animFrameId = requestAnimationFrame(render);

    return () => {
      isDestroyed = true;
      cancelAnimationFrame(animFrameId);
      window.removeEventListener('mousemove', onMouseMove);
      resizeObserver.disconnect();
    };
  }, []);

  return (
    <canvas
      ref={canvasRef}
      className={`w-full h-full pointer-events-none ${className}`}
      style={{ display: 'block' }}
    />
  );
};
