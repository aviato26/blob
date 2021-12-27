
import * as THREE from 'three';
import css from './css/style.css';
import vShader from './shaders/vertShader.js';
import fShader from './shaders/fragShader.js';

export default class Main
{
  constructor()
  {
    this.scene = new THREE.Scene();
    this.camera = new THREE.PerspectiveCamera( 75, window.innerWidth / window.innerHeight, 0.1, 1000 );

    this.renderer = new THREE.WebGLRenderer();
    this.renderer.setSize( window.innerWidth, window.innerHeight );
    document.body.appendChild( this.renderer.domElement );

    this.size = 5;
    this.segments = 20;

    this.time = 0.0;

    this.geometry = new THREE.BoxGeometry(this.size, this.size, this.size, this.segments, this.segments, this.segments);
    this.material = new THREE.ShaderMaterial(
    {
      //wireframe: true,
      uniforms:
      {
        time: { value: this.time },
        radius: { value: 5 }
      },
      vertexShader: vShader.vShader,
      fragmentShader: fShader.fShader
     }
   );

    this.cube = new THREE.Mesh( this.geometry, this.material );
    this.scene.add( this.cube );

    this.camera.position.z = 5;

    this.animate = this.animate.bind(this);

    this.animate();
  }

  animate(){
    requestAnimationFrame( this.animate );

    this.time += 0.01;

    this.material.uniforms.time.value = this.time;

    //this.cube.rotation.y += 0.01;
    //this.cube.rotation.x += 0.009;

    this.renderer.render( this.scene, this.camera );
  };

}

new Main();
