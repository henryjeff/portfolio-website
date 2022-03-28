export default "precision highp float;\n#define GLSLIFY 1\n\n// --\nuniform "
               "vec2  _offset;\nuniform vec2  _reflection;\nuniform float "
               "_vFade;\n\n// --\nvarying vec2  _uv;\nvarying float "
               "_fade;\n\n// --\nvoid main( void )\n{\n  // --\n  _uv         "
               "= uv + _offset;\n  _fade   = 1.0 - distance(sin(uv * 3.142), "
               "_reflection) - uv.y * _vFade;\n\n  gl_Position = "
               "projectionMatrix * modelViewMatrix * vec4(position, 1.0);\n}\n";