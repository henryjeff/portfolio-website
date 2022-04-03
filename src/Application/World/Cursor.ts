import * as THREE from 'three';
import Application from '../Application';
import Camera from '../Cameras/Camera';

export default class Cursor {
    application: Application;
    scene: THREE.Scene;
    camera: Camera;
    mouse: THREE.Vector2;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.mouse = new THREE.Vector2(0, 0);

        // create a cursor as a circle
        const cursor = new THREE.Mesh(
            new THREE.SphereBufferGeometry(2000, 32),
            new THREE.MeshBasicMaterial({
                color: 0xffffff,
                side: THREE.DoubleSide,
                transparent: true,
                opacity: 0.5,
            })
        );

        // add the cursor to the scene
        this.scene.add(cursor);
    }
}
