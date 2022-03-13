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
  mouse: { x: number; y: number };
  target: { x: number; y: number };
  targetPos: { x: number; y: number };

  constructor() {
    this.application = new Application();
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.canvas = this.application.canvas;
    this.mouse = { x: 0, y: 0 };
    this.target = { x: 0, y: 0 };
    this.targetPos = { x: 0, y: 0 };
    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.PerspectiveCamera(
      45,
      this.sizes.width / this.sizes.height,
      1,
      10000
    );
    this.instance.position.set(0, 0, 2000);
    this.scene.add(this.instance);

    document.addEventListener(
      "mousemove",
      (event) => this.onMouseMove(event, this.sizes),
      false
    );
  }

  onMouseMove(event: MouseEvent, sizes: Sizes) {
    this.mouse.x = event.clientX - sizes.width / 2;
    this.mouse.y = event.clientY - sizes.height / 2;
  }

  setControls() {
    let element = this.canvas;
    if (this.application.renderer) {
      element = this.application.renderer.instance.domElement;
    }
    this.controls = new OrbitControls(this.instance, element);
    this.controls.enableDamping = true;
  }

  resize() {
    this.instance.aspect = this.sizes.width / this.sizes.height;
    this.instance.updateProjectionMatrix();
  }

  update() {
    // this.target.x = (1 - this.mouse.x) * 0.0001;
    // this.target.y = (1 - this.mouse.y) * 0.0001;
    // this.targetPos.x = 1 - (this.mouse.y - 2900) * 0.3;
    // this.targetPos.y = this.mouse.x * 0.3;

    // this.instance.position.x +=
    //   0.1 * (this.targetPos.y - this.instance.position.x);

    // this.instance.position.y +=
    //   0.1 * (this.targetPos.x - this.instance.position.y);

    // this.instance.rotation.x +=
    //   0.1 * (this.target.y - this.instance.rotation.x);
    // this.instance.rotation.y +=
    //   0.1 * (this.target.x - this.instance.rotation.y);

    this.controls.update();
  }
}
