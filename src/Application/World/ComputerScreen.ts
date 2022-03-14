import { CSS3DObject } from "three/examples/jsm/renderers/CSS3DRenderer.js";
import GUI from "lil-gui";
import * as THREE from "three";
import Application from "../Application";
import Debug from "../Utils/Debug";
import { BoxGeometry, Euler, Layers, Vector2, Vector3 } from "three";
import Resources from "../Utils/Resources";
//@ts-ignore
import page from "./index.html";
import BakedModel from "../Utils/BakedModel";

function createPlane(
  width: number,
  height: number,
  element: HTMLElement,
  pos: THREE.Vector3,
  rot: THREE.Euler,
  scene: THREE.Scene,
  cssScene: THREE.Scene
) {
  const object = new CSS3DObject(element);

  object.position.copy(pos);
  object.rotation.copy(rot);

  cssScene.add(object);

  const material = new THREE.MeshLambertMaterial();
  material.side = THREE.DoubleSide;
  material.opacity = 0;
  material.transparent = true;
  material.blending = THREE.NoBlending;

  const geometry = new THREE.PlaneGeometry(width, height);
  const mesh = new THREE.Mesh(geometry, material);

  mesh.position.copy(object.position);
  mesh.rotation.copy(object.rotation);
  mesh.scale.copy(object.scale);

  scene.add(mesh);
}
export default class ComputerScreen {
  application: Application;
  scene: THREE.Scene;
  cssScene: THREE.Scene;
  resources: Resources;
  debug: Debug;
  debugFolder: GUI;
  screenSize: THREE.Vector2;
  position: THREE.Vector3;
  rotation: THREE.Euler;

  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.cssScene = this.application.cssScene;
    this.resources = this.application.resources;
    this.screenSize = new Vector2(1280, 1024);

    const element = document.createElement("div");
    element.style.width = this.screenSize.width + "px";
    element.style.height = this.screenSize.height + "px";
    element.style.opacity = "1";

    // const ratio = this.screenSize.width / this.screenSize.height;

    // const marginTop = 40;
    // const marginLeft = 64;

    // const iframe = document.createElement("iframe");
    // iframe.style.width = this.screenSize.width - marginLeft * 2 + "px";
    // iframe.style.height = this.screenSize.height - marginTop * 2 + "px";
    // iframe.style.paddingLeft = marginLeft + "px";
    // iframe.style.paddingTop = marginTop + "px";

    // iframe.style.border = "0px";
    // iframe.src = [
    //   "https://www.youtube.com/embed/",
    //   "wKnjP6F6Bnc",
    //   "?rel=0",
    // ].join("");

    // element.appendChild(iframe);
    // element.innerHTML = `<div width="${this.screenSize.width}px"  height="${this.screenSize.height}px" ></iframe>`;

    element.innerHTML = page;

    // this.position = new THREE.Vector3(-900, 380, -100);
    this.position = new THREE.Vector3(0, 940, 325);
    this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);

    createPlane(
      this.screenSize.width,
      this.screenSize.height,
      element,
      this.position,
      this.rotation,
      this.scene,
      this.cssScene
    );

    const textures = this.resources.items.texture;

    const video = document.getElementById("video");
    const videoTexture = new THREE.VideoTexture(video as HTMLVideoElement);

    const scaleFactor = 1;

    const layers = {
      border: {
        texture: textures.screenBorderTexture,
        blending: THREE.NormalBlending,
        // blending: THREE.NoBlending,
        opacity: 0.99,
        offset: 25,
      },
      smudge: {
        texture: textures.screenSmudgesTexture,
        blending: THREE.NormalBlending,
        opacity: 1,
        offset: 22,
      },
      // shadow: {
      //   texture: textures.crtShadowTexture,
      //   blending: THREE.NormalBlending,
      //   opacity: 0.5,
      //   offset: 10,
      // },
      // reflections: {
      //   texture: textures.crtReflectionTexture,
      //   blending: THREE.AdditiveBlending,
      //   opacity: 0.9,
      //   offset: 21,
      // },
      // video: {
      //   texture: videoTexture,
      //   blending: THREE.AdditiveBlending,
      //   opacity: 0.2,
      //   offset: 20,
      // },
    };

    let maxOffset = -1;

    const s_alphaTexture = textures.screenSmudgesTexture;
    s_alphaTexture.flipY = false;

    this.addScreenLayer(
      layers.smudge.texture,
      layers.smudge.blending,
      layers.smudge.opacity,
      layers.smudge.offset,
      s_alphaTexture
    );

    // const alphaTexture = textures.screenAlphaMap;
    // alphaTexture.flipY = false;

    // this.addScreenLayer(
    //   layers.border.texture,
    //   layers.border.blending,
    //   layers.border.opacity,
    //   layers.border.offset,
    //   alphaTexture
    // );

    // for (const [_, layer] of Object.entries(layers)) {
    //   console.log(layer);
    //   const offset = layer.offset * scaleFactor;
    //   this.addLayer2(
    //     layer.texture,
    //     layer.blending,
    //     layer.opacity,
    //     layer.offset
    //   );

    //   if (offset > maxOffset) maxOffset = offset;
    // }

    //   const planes = {
    //     left: {
    //       size: new THREE.Vector2(maxOffset, this.screenSize.height),
    //       position: this.offsetPosition(
    //         this.position,
    //         new Vector3(-this.screenSize.width / 2, 0, maxOffset / 2)
    //       ),
    //       rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
    //     },
    //     right: {
    //       size: new THREE.Vector2(maxOffset, this.screenSize.height),
    //       position: this.offsetPosition(
    //         this.position,
    //         new Vector3(this.screenSize.width / 2, 0, maxOffset / 2)
    //       ),
    //       rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
    //     },
    //     top: {
    //       size: new THREE.Vector2(this.screenSize.width, maxOffset),
    //       position: this.offsetPosition(
    //         this.position,
    //         new Vector3(0, this.screenSize.height / 2, maxOffset / 2)
    //       ),
    //       rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
    //     },
    //     bottom: {
    //       size: new THREE.Vector2(this.screenSize.width, maxOffset),
    //       position: this.offsetPosition(
    //         this.position,
    //         new Vector3(0, -this.screenSize.height / 2, maxOffset / 2)
    //       ),
    //       rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
    //     },
    //   };

    //   for (const [_, plane] of Object.entries(planes)) {
    //     this.createEnclosingPlane(plane);
    //   }
  }

  // createEnclosingPlane(plane: EnclosingPlane) {
  //   const material = new THREE.MeshBasicMaterial({
  //     side: THREE.DoubleSide,
  //     color: 0xff0000,
  //   });

  //   const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
  //   const mesh = new THREE.Mesh(geometry, material);

  //   mesh.position.copy(plane.position);
  //   mesh.rotation.copy(plane.rotation);

  //   this.scene.add(mesh);
  // }

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

  addScreenLayer(
    texture: THREE.Texture,
    blendingMode: THREE.Blending,
    opacity: number,
    offset: number,
    alphaMap?: THREE.Texture
  ) {
    const alphaMaterialOptions = alphaMap
      ? {
          // alphaTest: 0.001,
          // transparent: false,
          alphaMap,
        }
      : {};

    const layer = new BakedModel(
      this.resources.items.gltfModel.screenModel,
      texture,
      900,
      {
        // blending: blendingMode,
        opacity: opacity,
        transparent: true,
        blending: THREE.CustomBlending,
        blendDst: THREE.OneMinusSrcAlphaFactor,
        blendSrc: THREE.SrcAlphaFactor,
        blendEquation: THREE.AddEquation,
        ...alphaMaterialOptions,
      }
    );

    layer.setPosition(
      this.offsetPosition(this.position, new Vector3(0, -1450, offset + 50))
    );

    this.scene.add(layer.getModel());
  }
}
