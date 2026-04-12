import * as THREE from 'three';
import Application from '../Application';
import Resources from '../Utils/Resources';

export default class Computer {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    model: THREE.Group;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;

        this.setLighting();
        this.setModel();
    }

    setLighting() {
        // Background so it's not pitch black
        this.scene.background = new THREE.Color(0x1a1a2e);

        // Strong ambient so everything is visible
        const ambientLight = new THREE.AmbientLight(0xffffff, 1.0);
        this.scene.add(ambientLight);

        // Key light
        const directionalLight = new THREE.DirectionalLight(0xffffff, 1.0);
        directionalLight.position.set(2000, 4000, 2000);
        this.scene.add(directionalLight);

        // Fill light from the other side
        const fillLight = new THREE.DirectionalLight(0xffffff, 0.5);
        fillLight.position.set(-2000, 3000, -1000);
        this.scene.add(fillLight);
    }

    setModel() {
        this.model = this.resources.items.gltfModel.computerSetupModel.scene;
        this.model.scale.set(500, 500, 500);
        this.model.rotation.y = Math.PI;

        // Center the model at the origin using its bounding box
        const box = new THREE.Box3().setFromObject(this.model);
        const center = box.getCenter(new THREE.Vector3());
        this.model.position.sub(center);

        // Ensure all meshes use a material that responds to light
        this.model.traverse((child) => {
            if (child instanceof THREE.Mesh) {
                // If material is MeshBasicMaterial, swap to MeshStandardMaterial
                if (child.material instanceof THREE.MeshBasicMaterial) {
                    const oldMat = child.material;
                    child.material = new THREE.MeshStandardMaterial({
                        color: oldMat.color,
                        map: oldMat.map,
                    });
                }
            }
        });

        this.scene.add(this.model);
    }
}
