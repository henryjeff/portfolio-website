import * as THREE from 'three';
import Application from '../Application';
import Camera from '../camera/Camera';

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

        // add event listener to mousemove event to update cursor position
        // window.addEventListener('mousemove', (event) => {
        //     event.preventDefault();
        //     this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
        //     this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;

        //     // Make the sphere follow the mouse
        //     var vector = new THREE.Vector3(this.mouse.x, this.mouse.y, 0.5);
        //     vector.unproject(this.camera.instance);
        //     var dir = vector.sub(this.camera.instance.position).normalize();
        //     var distance = -this.camera.instance.position.z / dir.z;
        //     var pos = this.camera.instance.position
        //         .clone()
        //         .add(dir.multiplyScalar(distance));

        //     console.log(pos);

        //     cursor.position.copy(pos);
        //     cursor.lookAt(this.camera.instance.position);
        // });

        // add the cursor to the scene
        this.scene.add(cursor);
    }
}
