import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import GUI from "lil-gui";
import * as THREE from "three";
import Application from "../Application";
import Debug from "../Utils/Debug";

function createPlane(
  width: number,
  height: number,
  cssColor: string,
  pos: THREE.Vector3,
  rot: THREE.Euler,
  scene: THREE.Scene,
  cssScene: THREE.Scene
) {
  const element = document.createElement("div");
  element.style.width = width + "px";
  element.style.height = height + "px";
  element.style.opacity = "0.75";
  element.style.background = cssColor;
  // element.innerHTML = `<p >Text</p>`;

  const object = new CSS3DObject(element);
  object.position.copy(pos);
  object.rotation.copy(rot);

  cssScene.add(object);

  const geometry = new THREE.PlaneGeometry(width, height);

  const material = new THREE.MeshBasicMaterial({
    color: 0x0000ff,
    wireframe: true,
    wireframeLinewidth: 3,
    side: THREE.DoubleSide,
  });

  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.copy(object.position);
  mesh.rotation.copy(object.rotation);
  scene.add(mesh);
}

export default class ComputerScreen {
  application: Application;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  debug: Debug;
  debugFolder: GUI;

  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;

    createPlane(
      5,
      5,
      "seagreen",
      new THREE.Vector3(0, 0, 0),
      new THREE.Euler(-90 * THREE.MathUtils.DEG2RAD, 0, 0),
      this.scene,
      this.cssScene
    );
  }
}
