

exports.fShader =
`
  varying vec2 vUv;

  void main()
  {
    vec2 c = vec2(0.5);

    float v = pow(vUv.x, 2.0);
    float line = distance(v, vUv.y) / 0.1;
    float a = line;

    //gl_FragColor = vec4(a, 0.2, 0.0, 1.0);
    gl_FragColor = vec4(vUv, 0.0, 1.0);    

  }
`
