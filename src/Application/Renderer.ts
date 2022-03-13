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
    this.sizes = this.application.sizes;
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    this.camera = this.application.camera;

    this.setInstance();
  }

  setInstance() {
    this.instance = new THREE.WebGLRenderer({
      antialias: true,
      alpha: true,
      powerPreference: "high-performance",
    });
    // Settings
    this.instance.physicallyCorrectLights = true;
    this.instance.outputEncoding = THREE.sRGBEncoding;
    this.instance.toneMapping = THREE.CineonToneMapping;
    // this.instance.toneMappingExposure = 1;
    this.instance.shadowMap.enabled = true;
    this.instance.shadowMap.type = THREE.PCFSoftShadowMap;
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.instance.domElement.style.position = "absolute";
    this.instance.setClearColor(0x000000, 0.0);
    this.instance.domElement.style.zIndex = "1px";
    this.instance.domElement.style.top = "0px";

    document.querySelector("#webgl")?.appendChild(this.instance.domElement);

    this.cssInstance = new CSS3DRenderer();
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    this.cssInstance.domElement.style.position = "absolute";
    this.cssInstance.domElement.style.top = "0px";

    document.querySelector("#css")?.appendChild(this.cssInstance.domElement);
  }

  resize() {
    this.instance.setSize(this.sizes.width, this.sizes.height);
    this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
    this.cssInstance.setSize(this.sizes.width, this.sizes.height);
  }

  update() {
    this.application.camera.instance.updateProjectionMatrix();

    this.instance.render(this.scene, this.camera.instance);
    this.cssInstance.render(this.cssScene, this.camera.instance);
  }
}
