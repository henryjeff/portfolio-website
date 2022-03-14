import * as THREE from "three";

export default class BakedModel {
  model: THREE.Group;
  texture: LoadedTexture;
  material: THREE.MeshBasicMaterial;

  constructor(
    model: LoadedModel,
    texture: LoadedTexture,
    scale?: number,
    materialParams?: THREE.MeshBasicMaterialParameters
  ) {
    this.model = model.scene.clone();
    this.texture = texture;

    this.texture.flipY = false;
    this.texture.encoding = THREE.sRGBEncoding;

    this.material = new THREE.MeshBasicMaterial({
      map: this.texture,
      ...materialParams,
    });

    if (this.model.children.length != 1) {
      console.error("Model has more than one child, Baker can't bake");
    }

    this.model.traverse((child) => {
      if (child instanceof THREE.Mesh) {
        if (scale) child.scale.set(scale, scale, scale);
        child.material = this.material;
      }
    });

    return this;
  }

  getModel(): THREE.Group {
    return this.model;
  }

  setPosition(position: THREE.Vector3) {
    this.model.position.copy(position);
  }

  setRotation(rotation: THREE.Euler) {
    this.model.rotation.copy(rotation);
  }
}
