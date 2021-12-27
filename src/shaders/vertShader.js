

exports.vShader =
`
  varying vec2 vUv;
  uniform float time;
  uniform float radius;

  float mod289(float x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 mod289(vec4 x){return x - floor(x * (1.0 / 289.0)) * 289.0;}
  vec4 perm(vec4 x){return mod289(((x * 34.0) + 1.0) * x);}

  float noise(vec3 p){
      vec3 a = floor(p);
      vec3 d = p - a;
      d = d * d * (3.0 - 2.0 * d);

      vec4 b = a.xxyy + vec4(0.0, 1.0, 0.0, 1.0);
      vec4 k1 = perm(b.xyxy);
      vec4 k2 = perm(k1.xyxy + b.zzww);

      vec4 c = k2 + a.zzzz;
      vec4 k3 = perm(c);
      vec4 k4 = perm(c + 1.0);

      vec4 o1 = fract(k3 * (1.0 / 41.0));
      vec4 o2 = fract(k4 * (1.0 / 41.0));

      vec4 o3 = o2 * d.z + o1 * (1.0 - d.z);
      vec2 o4 = o3.yw * d.x + o3.xz * (1.0 - d.x);

      return o4.y * d.y + o4.x * (1.0 - d.y);
  }




  void main()
  {

    vUv = uv;

    float delta = (sin(time) + 1.0) / 2.0;
    vec3 v = normalize(position) * radius;
    vec3 pos = mix(position, v, delta) * 0.5;

    float n = noise(position);

    //gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(position * ((sin(n * time * position.y) + 2.0) / 2.0 + (cos(n * time) + 2.0) / 2.0) * .3, 1.0);
    gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(pos, 1.0);
    //gl_Position = projectionMatrix * mvPosition;
    //gl_PointSize = 1.0;

  }
`
