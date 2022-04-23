#ifdef GL_ES
precision mediump float;
#endif

const float PHI = 1.61803398874989484820459; // Φ = Golden Ratio
uniform float u_time;

// float gold_noise(vec2 xy, float seed) {
//   return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);
// }

float noise(vec2 xy, float seed) {
  return fract(tan(distance(xy * PHI, xy) * seed) * xy.x);
}

void main() {
  gl_FragColor = vec4(noise(gl_FragCoord.xy, fract(u_time) + 1.0),
                      noise(gl_FragCoord.xy, fract(u_time) + 2.0),
                      noise(gl_FragCoord.xy, fract(u_time) + 3.0), 0.01);
}