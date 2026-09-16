uniform float uTime;
varying vec2 vUv;

float random(vec2 st) {
    return fract(sin(dot(st.xy, vec2(12.9898, 78.233))) * 43758.5453123);
}

void main() {
    vec2 st = vUv * vec2(50.0, 20.0);
    float id = floor(st.x);
    st.y += uTime * (1.0 + random(vec2(id)) * 3.0);
    
    float char = floor(fract(random(floor(st)) + uTime * 0.1) * 10.0);
    float glow = smoothstep(0.1, 0.9, fract(st.y));
    
    vec3 color = vec3(0.0, 1.0, 0.3) * glow;
    
    // Add some flickering
    color *= 0.5 + 0.5 * sin(uTime * 10.0 + id);
    
    gl_FragColor = vec4(color, 0.8 * glow);
}
