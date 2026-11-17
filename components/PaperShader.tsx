"use client";

import { useEffect, useRef } from "react";

const VERTEX = `
attribute vec2 a_position;
void main() {
  gl_Position = vec4(a_position, 0.0, 1.0);
}`;

const FRAGMENT = `
#ifdef GL_FRAGMENT_PRECISION_HIGH
precision highp float;
#else
precision mediump float;
#endif
uniform vec2 u_res;
uniform float u_time;

// Sin-free hash: stable at every precision and for large coordinates.
float hash(vec2 p) {
  p = fract(p * vec2(0.1031, 0.1030));
  p += dot(p, p.yx + 33.33);
  return fract((p.x + p.y) * p.x);
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

void main() {
  vec2 uv = gl_FragCoord.xy / max(u_res, vec2(1.0));
  float t = mod(u_time, 600.0) * 0.012;

  // Long kozo fibres, a slow blotch, and a fine press grain.
  float fibre = noise(vec2(uv.x * 64.0, uv.y * 6.0) + vec2(t, 0.0));
  float blotch = noise(uv * 5.5 + vec2(-t * 0.4, t * 0.25));
  float grain = hash(gl_FragCoord.xy + floor(u_time * 3.0)) - 0.5;

  float v = (fibre - 0.5) * 0.05 + (blotch - 0.5) * 0.03 + grain * 0.018;
  vec3 kraft = vec3(0.906, 0.863, 0.765);
  gl_FragColor = vec4(clamp(kraft + v, 0.0, 1.0), 1.0);
}`;

function compile(gl: WebGLRenderingContext, type: number, source: string) {
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

export default function PaperShader() {
  const canvasRef = useRef<HTMLCanvasElement>(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;

    const gl = canvas.getContext("webgl", {
      alpha: false,
      antialias: false,
      depth: false,
      powerPreference: "low-power",
    });
    if (!gl) return;

    const vertex = compile(gl, gl.VERTEX_SHADER, VERTEX);
    const fragment = compile(gl, gl.FRAGMENT_SHADER, FRAGMENT);
    if (!vertex || !fragment) return;

    const program = gl.createProgram();
    if (!program) return;
    gl.attachShader(program, vertex);
    gl.attachShader(program, fragment);
    gl.linkProgram(program);
    if (!gl.getProgramParameter(program, gl.LINK_STATUS)) return;
    gl.useProgram(program);

    const buffer = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, buffer);
    gl.bufferData(
      gl.ARRAY_BUFFER,
      new Float32Array([-1, -1, 1, -1, -1, 1, -1, 1, 1, -1, 1, 1]),
      gl.STATIC_DRAW,
    );
    const position = gl.getAttribLocation(program, "a_position");
    gl.enableVertexAttribArray(position);
    gl.vertexAttribPointer(position, 2, gl.FLOAT, false, 0, 0);

    const resolution = gl.getUniformLocation(program, "u_res");
    const time = gl.getUniformLocation(program, "u_time");

    const motionQuery = window.matchMedia("(prefers-reduced-motion: reduce)");
    let reduce = motionQuery.matches;
    const onMotionChange = (event: MediaQueryListEvent) => {
      reduce = event.matches;
      if (reduce) {
        cancelAnimationFrame(frame);
        draw();
      } else {
        start = performance.now() - elapsed;
        frame = requestAnimationFrame(draw);
      }
    };
    motionQuery.addEventListener("change", onMotionChange);

    const resize = () => {
      // Half-resolution is enough for paper grain and halves the fill cost.
      const width = Math.max(1, Math.round(window.innerWidth * 0.5));
      const height = Math.max(1, Math.round(window.innerHeight * 0.5));
      if (canvas.width !== width || canvas.height !== height) {
        canvas.width = width;
        canvas.height = height;
        gl.viewport(0, 0, width, height);
      }
    };

    const startedAt = performance.now();
    let start = startedAt;
    let elapsed = 0;
    let frame = 0;

    function draw() {
      resize();
      elapsed = reduce ? elapsed : performance.now() - start;
      gl!.uniform2f(resolution, canvas!.width, canvas!.height);
      gl!.uniform1f(time, reduce ? 1.25 : elapsed / 1000);
      gl!.drawArrays(gl!.TRIANGLES, 0, 6);
      if (!reduce && !document.hidden) {
        frame = requestAnimationFrame(draw);
      }
    }

    const onVisibility = () => {
      cancelAnimationFrame(frame);
      if (!document.hidden && !reduce) {
        start = performance.now() - elapsed;
        frame = requestAnimationFrame(draw);
      }
    };
    document.addEventListener("visibilitychange", onVisibility);

    draw();

    return () => {
      cancelAnimationFrame(frame);
      document.removeEventListener("visibilitychange", onVisibility);
      motionQuery.removeEventListener("change", onMotionChange);
      gl.deleteProgram(program);
      gl.deleteShader(vertex);
      gl.deleteShader(fragment);
      gl.deleteBuffer(buffer);
    };
  }, []);

  return <canvas ref={canvasRef} className="paper-shader" aria-hidden="true" />;
}
