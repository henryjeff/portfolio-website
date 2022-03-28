export default "precision highp float;\n#define GLSLIFY 1\n\n// --\nuniform "
               "sampler2D _input;\nuniform float     _time;\nuniform float     "
               "_opacity;\n\n// --\nvarying vec2      _uv;\nvarying float     "
               "_fade;\n\n// --\nvoid main( void )\n{\n  vec4 color   = "
               "texture2D(_input, _uv);\n\tgl_FragColor = vec4(color.rgb, "
               "_opacity * _fade * color.a);\n}\n";