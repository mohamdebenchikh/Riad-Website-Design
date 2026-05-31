import { useEffect, useRef } from 'react';
import * as THREE from 'three';

const vertexShader = `
  void main() {
    gl_Position = vec4(position, 1.0);
  }
`;

const fragmentShader = `
  precision highp float;

  uniform float u_time;
  uniform vec2 u_res;
  uniform float u_speed;
  uniform float u_scale;
  uniform vec2 u_mouse;

  #define PI 3.14159265359
  #define TAU 6.28318530718

  float hash(vec2 p) {
    vec3 p3 = fract(vec3(p.xyx) * 0.1031);
    p3 += dot(p3, p3.yzx + 33.33);
    return fract((p3.x + p3.y) * p3.z);
  }

  float vnoise(vec2 p) {
    vec2 i = floor(p);
    vec2 f = fract(p);
    f = f * f * (3.0 - 2.0 * f);
    float a = hash(i);
    float b = hash(i + vec2(1.0, 0.0));
    float c = hash(i + vec2(0.0, 1.0));
    float d = hash(i + vec2(1.0, 1.0));
    return mix(mix(a, b, f.x), mix(c, d, f.x), f.y);
  }

  float rippleHeight(vec2 p, float t) {
    float h = 0.0;
    float freq = 1.0;
    float amp = 1.0;
    float decay = 0.55;
    for (int i = 0; i < 5; i++) {
      h += amp * vnoise(p * freq + t * 0.3);
      freq *= 2.5;
      amp *= decay;
      decay *= 0.85;
    }
    return h;
  }

  vec2 domainWarp(vec2 p, float t) {
    vec2 warp;
    warp.x = vnoise(p * 1.2 + t * 0.1 + vec2(0.0, 3.7));
    warp.y = vnoise(p * 1.2 + t * 0.1 + vec2(5.3, 1.2));
    return warp * 0.3;
  }

  vec3 surfaceNormal(vec2 p, float t, float scale) {
    float eps = 0.01;
    float hC = rippleHeight(p, t);
    float hR = rippleHeight(p + vec2(eps, 0.0), t);
    float hU = rippleHeight(p + vec2(0.0, eps), t);
    return normalize(vec3((hC - hR) * scale, (hC - hU) * scale, 1.0));
  }

  void main() {
    vec2 uv = (gl_FragCoord.xy - u_res * 0.5) / min(u_res.x, u_res.y);
    float t = u_time * u_speed;
    vec2 p = uv * u_scale;
    p += domainWarp(p, t);
    float r = length(uv);
    float edgeFade = smoothstep(0.6, 0.25, r);
    float h = rippleHeight(p, t);
    float centerFade = smoothstep(0.0, 0.5, h * edgeFade);
    vec3 N = surfaceNormal(p, t, 0.8 * u_scale);
    vec3 L = normalize(vec3(0.4, 0.5, 1.0));
    float diff = max(dot(N, L), 0.0);
    float spec = pow(max(dot(normalize(reflect(-L, N)), vec3(0.0, 0.0, 1.0)), 0.0), 30.0);
    float spark = pow(vnoise(p * 15.0 + t * 0.5) * vnoise(p * 25.0 - t * 0.3), 4.0) * 1.5;

    if (u_mouse.x >= 0.0) {
      vec2 mUV = (u_mouse - u_res * 0.5) / min(u_res.x, u_res.y);
      float mR = length(uv - mUV);
      float mFade = smoothstep(0.5, 0.0, mR);
      h += sin(mR * 20.0 - u_time * 3.0) * mFade * 0.15;
    }

    vec3 col1 = vec3(0.78, 0.48, 0.36);
    vec3 col2 = vec3(0.23, 0.15, 0.13);
    vec3 col3 = vec3(0.79, 0.66, 0.30);
    vec3 col4 = vec3(0.55, 0.45, 0.33);
    vec3 col5 = vec3(0.99, 0.98, 0.97);

    vec3 baseColor = mix(col1, col2, centerFade);
    baseColor = mix(baseColor, col3, vnoise(p * 2.0 + t * 0.2) * edgeFade);
    float lightMask = diff * edgeFade;
    vec3 litColor = baseColor * (0.7 + lightMask * 0.9);
    litColor += vec3(1.0, 0.95, 0.85) * spec * edgeFade * 0.8;
    litColor += col5 * spark * edgeFade * 0.3;
    litColor += col1 * (1.0 - edgeFade) * 0.1;
    float vig = 1.0 - smoothstep(0.35, 0.85, r);
    litColor *= 0.65 + vig * 0.35;
    litColor += (hash(gl_FragCoord.xy + fract(u_time * 7.13) * 100.0) - 0.5) * 0.02;
    litColor = pow(litColor, vec3(0.95));
    gl_FragColor = vec4(clamp(litColor, 0.0, 1.0), 1.0);
  }
`;

export default function RippleShader() {
  const containerRef = useRef<HTMLDivElement>(null);
  const rendererRef = useRef<THREE.WebGLRenderer | null>(null);
  const uniformsRef = useRef({
    u_time: { value: 0.0 },
    u_res: { value: new THREE.Vector2(1, 1) },
    u_speed: { value: 1.0 },
    u_scale: { value: 6.0 },
    u_mouse: { value: new THREE.Vector2(-1, -1) },
  });
  const rafRef = useRef<number>(0);
  const startTimeRef = useRef<number>(0);

  useEffect(() => {
    const container = containerRef.current;
    if (!container) return;

    const prefersReducedMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const dpr = Math.min(window.devicePixelRatio, 1.5);
    const renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false });
    renderer.setPixelRatio(dpr);
    renderer.setSize(container.offsetWidth, container.offsetHeight);
    renderer.domElement.style.width = '100%';
    renderer.domElement.style.height = '100%';
    renderer.domElement.style.display = 'block';
    container.appendChild(renderer.domElement);
    rendererRef.current = renderer;

    const scene = new THREE.Scene();
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const uniforms = uniformsRef.current;
    uniforms.u_res.value.set(container.offsetWidth * dpr, container.offsetHeight * dpr);

    if (prefersReducedMotion) {
      uniforms.u_speed.value = 0;
    }

    const material = new THREE.ShaderMaterial({
      vertexShader,
      fragmentShader,
      uniforms,
    });

    const geometry = new THREE.PlaneGeometry(2, 2);
    const mesh = new THREE.Mesh(geometry, material);
    scene.add(mesh);

    startTimeRef.current = performance.now();

    function easeOutCubic(t: number): number {
      return 1 - Math.pow(1 - t, 3);
    }

    function animate() {
      const elapsed = (performance.now() - startTimeRef.current) * 0.001;
      uniforms.u_time.value = elapsed;

      if (!prefersReducedMotion) {
        const entranceDuration = 4.0;
        const progress = Math.min(elapsed / entranceDuration, 1.0);
        const easedProgress = easeOutCubic(progress);
        uniforms.u_speed.value = 1.0 - (1.0 - 0.2) * easedProgress;
      }

      renderer.render(scene, camera);
      rafRef.current = requestAnimationFrame(animate);
    }
    rafRef.current = requestAnimationFrame(animate);

    const handleResize = () => {
      if (!container) return;
      const w = container.offsetWidth;
      const h = container.offsetHeight;
      renderer.setSize(w, h);
      uniforms.u_res.value.set(w * dpr, h * dpr);
    };

    const handleMouseMove = (e: MouseEvent) => {
      const rect = container.getBoundingClientRect();
      uniforms.u_mouse.value.set(
        (e.clientX - rect.left) * dpr,
        (e.clientY - rect.top) * dpr
      );
    };

    const handleMouseLeave = () => {
      uniforms.u_mouse.value.set(-1, -1);
    };

    window.addEventListener('resize', handleResize);
    container.addEventListener('mousemove', handleMouseMove);
    container.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      cancelAnimationFrame(rafRef.current);
      window.removeEventListener('resize', handleResize);
      container.removeEventListener('mousemove', handleMouseMove);
      container.removeEventListener('mouseleave', handleMouseLeave);
      renderer.dispose();
      geometry.dispose();
      material.dispose();
      if (container.contains(renderer.domElement)) {
        container.removeChild(renderer.domElement);
      }
    };
  }, []);

  return (
    <div
      ref={containerRef}
      style={{
        position: 'absolute',
        inset: 0,
        overflow: 'hidden',
      }}
    />
  );
}
