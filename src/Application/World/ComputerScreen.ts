import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import GUI from "lil-gui";
import * as THREE from "three";
import Application from "../Application";
import Debug from "../Utils/Debug";
import { BoxGeometry, Euler, Vector2, Vector3 } from "three";
import Resources from "../Utils/Resources";
//@ts-ignore
import page from "./index.html";
import Sizes from "../Utils/Sizes";
import Camera from "../Camera";
import EventEmitter from "../Utils/EventEmitter";
export default class ComputerScreen extends EventEmitter {
  application: Application;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  resources: Resources;
  debug: Debug;
  sizes: Sizes;
  debugFolder: GUI;
  screenSize: THREE.Vector2;
  position: THREE.Vector3;
  rotation: THREE.Euler;
  camera: Camera;

  constructor() {
    super();

    this.application = new Application();
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    this.sizes = this.application.sizes;
    this.resources = this.application.resources;
    this.screenSize = new Vector2(1280, 1024);
    this.camera = this.application.camera;

    const element = document.createElement("div");
    element.style.width = this.screenSize.width + "px";
    element.style.height = this.screenSize.height + "px";
    element.style.opacity = "1";

    const iframe = document.createElement("iframe");

    // Bubble events to the main application
    iframe.onload = () => {
      console.log("iframe loaded");
      if (iframe.contentWindow) {
        iframe.contentWindow.addEventListener("mousemove", (event) => {
          var clRect = iframe.getBoundingClientRect();
          var evt = new CustomEvent("mousemove", {
            bubbles: true,
            cancelable: false,
          });
          //@ts-ignore
          evt.clientX = event.clientX + clRect.left;
          //@ts-ignore
          evt.clientY = event.clientY - clRect.top;
          iframe.dispatchEvent(evt);
        });
      }
      // this.camera.trigger("focusChange", [this.position]);
    };

    iframe.src = "./innerIndex.html";
    iframe.style.width = this.screenSize.width + "px";
    iframe.style.height = this.screenSize.height + "px";
    iframe.style.opacity = "1";
    element.appendChild(iframe);

    this.position = new THREE.Vector3(0, 940, 235);
    this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);

    this.createCssPlane(element);

    const textures = this.resources.items.texture;

    const video = document.getElementById("video");
    const videoTexture = new THREE.VideoTexture(video as HTMLVideoElement);

    const reflectionTexture = textures.monitorReflectionTexture;
    reflectionTexture.encoding = THREE.LinearEncoding;

    const scaleFactor = 5;

    const layers = {
      smudge: {
        texture: textures.monitorSmudgeTexture,
        blending: THREE.AdditiveBlending,
        opacity: 0.1,
        offset: 24,
      },
      frame: {
        texture: textures.monitorFrameTexture,
        blending: THREE.NormalBlending,
        opacity: 1,
        offset: 25,
      },
      innerShadow: {
        texture: textures.monitorShadowTexture,
        blending: THREE.NormalBlending,
        opacity: 1,
        offset: 3,
      },
      dust: {
        texture: textures.monitorDustTexture,
        blending: THREE.AdditiveBlending,
        opacity: 0.1,
        offset: 1,
      },
      reflection: {
        texture: reflectionTexture,
        blending: THREE.AdditiveBlending,
        opacity: 0.6,
        offset: 24,
      },
      video: {
        texture: videoTexture,
        blending: THREE.AdditiveBlending,
        opacity: 0.5,
        offset: 1,
      },
    };

    let maxOffset = -1;

    for (const [_, layer] of Object.entries(layers)) {
      const offset = layer.offset * scaleFactor;
      this.addLayer(layer.texture, layer.blending, layer.opacity, offset);
      if (offset > maxOffset) maxOffset = offset;
    }

    const planes = {
      left: {
        size: new THREE.Vector2(maxOffset, this.screenSize.height),
        position: this.offsetPosition(
          this.position,
          new Vector3(-this.screenSize.width / 2, 0, maxOffset / 2)
        ),
        rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
      },
      right: {
        size: new THREE.Vector2(maxOffset, this.screenSize.height),
        position: this.offsetPosition(
          this.position,
          new Vector3(this.screenSize.width / 2, 0, maxOffset / 2)
        ),
        rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
      },
      top: {
        size: new THREE.Vector2(this.screenSize.width, maxOffset),
        position: this.offsetPosition(
          this.position,
          new Vector3(0, this.screenSize.height / 2, maxOffset / 2)
        ),
        rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
      },
      bottom: {
        size: new THREE.Vector2(this.screenSize.width, maxOffset),
        position: this.offsetPosition(
          this.position,
          new Vector3(0, -this.screenSize.height / 2, maxOffset / 2)
        ),
        rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
      },
    };

    for (const [_, plane] of Object.entries(planes)) {
      this.createEnclosingPlane(plane);
    }
  }

  createCssPlane(element: HTMLElement) {
    const object = new CSS3DObject(element);

    object.position.copy(this.position);
    object.rotation.copy(this.rotation);

    this.cssScene.add(object);

    const material = new THREE.MeshLambertMaterial();
    material.side = THREE.DoubleSide;
    material.opacity = 0;
    material.transparent = true;
    material.blending = THREE.NoBlending;

    const geometry = new THREE.PlaneGeometry(
      this.screenSize.width,
      this.screenSize.height
    );
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(object.position);
    mesh.rotation.copy(object.rotation);
    mesh.scale.copy(object.scale);

    this.scene.add(mesh);
  }

  createEnclosingPlane(plane: EnclosingPlane) {
    const material = new THREE.MeshBasicMaterial({
      side: THREE.DoubleSide,
      // color: 0x214b4c,
      color: 0x000000,
    });

    const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
    const mesh = new THREE.Mesh(geometry, material);

    mesh.position.copy(plane.position);
    mesh.rotation.copy(plane.rotation);

    this.scene.add(mesh);
  }

  offsetPosition(position: THREE.Vector3, offset: THREE.Vector3) {
    const newPosition = new THREE.Vector3();
    newPosition.copy(position);
    newPosition.add(offset);
    return newPosition;
  }

  addLayer(
    texture: THREE.Texture,
    blendingMode: THREE.Blending,
    opacity: number,
    offset: number
  ) {
    const material = new THREE.MeshBasicMaterial({
      map: texture,
    });

    material.blending = blendingMode;
    material.side = THREE.DoubleSide;
    material.opacity = opacity;
    material.transparent = true;
    // material.clipShadows = true;

    const geometry = new THREE.PlaneGeometry(
      this.screenSize.width,
      this.screenSize.height
    );

    const mesh = new THREE.Mesh(geometry, material);
    mesh.position.copy(
      this.offsetPosition(this.position, new Vector3(0, 0, offset))
    );
    mesh.rotation.copy(this.rotation);

    this.scene.add(mesh);
  }
}
