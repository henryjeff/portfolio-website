import * as THREE from "three";
import { CSS3DRenderer } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import Application from "./Application";
import Sizes from "./Utils/Sizes";
import Camera from "./Camera";

export default class Renderer {
  application: Application;
  canvas: HTMLElement;
  sizes: Sizes;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  camera: Camera;
  instance: THREE.WebGLRenderer;
  cssInstance: CSS3DRenderer;

  constructor() {
    this.application = new Application();
    this.canvas = this.application.canvas;
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    this.camera = this.application.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      canvas: this.canvas,
      antialias: true,
      alpha: true,
    });

    // Settings
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    this.instance.toneMappingExposure = 1.75;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setClearColor("#211d20");
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));

    document.body.appendChild(this.instance.domElement);

    this.cssInstance = new CSS3DRenderer();
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    this.cssInstance.domElement.style.position = "absolute";
    this.cssInstance.domElement.style.top = "0px";

    document.body.appendChild(this.cssInstance.domElement);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.instance.render(this.scene, this.camera.instance);
    this.cssInstance.render(this.cssScene, this.camera.instance);
  }
}
