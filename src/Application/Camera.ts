import * as THREE from "three";
import Application from "./Application";
import Sizes from "./Utils/Sizes";
import { OrbitControls } from "three/examples/jsm/controls/OrbitControls.js";

export default class Camera {
  application: Application;
  sizes: Sizes;
  scene: THREE.Scene;
  canvas: HTMLElement;
  instance: THREE.PerspectiveCamera;
  controls: OrbitControls;

  constructor() {
    this.application = new Application();
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      35,
      this.sizes.width / this.sizes.height,
      0.1,
      100
    );
    this.instance.position.set(6, 4, 8);
    this.scene.add(this.instance);
  }

  setControls() {
    let element = this.canvas;
    if (this.application.renderer) {
      element = this.application.renderer.cssInstance.domElement;
    }

    this.controls = new OrbitControls(this.instance, element);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    this.controls.update();
  }
}
