import * as THREE from "three";

export default class BakedModel {
  model: LoadedModel;
  texture: LoadedTexture;
  material: THREE.MeshBasicMaterial;

  constructor(model: LoadedModel, texture: LoadedTexture) {
    this.model = model;
    this.texture = texture;

    this.texture.flipY = false;
    this.texture.encoding = THREE.sRGBEncoding;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
    });

    if (this.model.scene.children.length != 1) {
      console.error("Model has more than one child, Baker can't bake");
    }

    this.model.scene.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        child.material = this.material;
      }
    });

    return this;
  }

  getModel(): THREE.Group {
    return this.model.scene;
  }
}
