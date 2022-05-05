import * as THREE from 'three';
import Application from '../Application';
import Camera from '../Camera/Camera';
import Mouse from '../Utils/Mouse';

const RENDER_WIREFRAME = true;

export default class Decor {
    application: Application;
    scene: THREE.Scene;
    hitboxes: {
        [key: string]: {
            action: () => void;
        };
    };
    camera: Camera;
    mouse: Mouse;
    raycaster: THREE.Raycaster;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.mouse = this.application.mouse;
        this.raycaster = new THREE.Raycaster();

        this.createRaycaster();
        this.createComputerHitbox();
    }

    createRaycaster() {
        window.addEventListener('mousedown', (event) => {
            event.preventDefault();
            console.log(this.camera.instance.position);

            console.log(this.mouse);
            const ray = new THREE.Raycaster();
            ray.setFromCamera(
                { x: this.mouse.x, y: this.mouse.y },
                this.camera.instance
            );
            console.log(ray);
            const intersects = ray.intersectObjects(this.scene.children);
            console.log(intersects);
            // this.raycaster.setFromCamera(this.mouse, this.camera.instance);
            // const intersects = this.raycaster.intersectObjects(
            //     this.scene.children
            // );
            // if (intersects.length > 0) {
            //     const hb = this.hitboxes[intersects[0].object.name];
            //     if (hb) {
            //         hb.action();
            //     }
            // }
        });
    }

    createComputerHitbox() {
        this.createHitbox(
            'computerHitbox',
            () => {
                console.log('PENIS');
                // this.camera.focusOnMonitor();
            },
            new THREE.Vector3(0, 650, 0),
            new THREE.Vector3(2000, 2000, 2000)
        );
    }

    createHitbox(
        name: string,
        action: () => void,
        position: THREE.Vector3,
        size: THREE.Vector3
    ) {
        const wireframeOptions = RENDER_WIREFRAME
            ? {
                  //   wireframe: true,
                  //   wireframeLinewidth: 50,
                  opacity: 1,
              }
            : {};

        // create hitbox material
        const hitboxMaterial = new THREE.MeshBasicMaterial({
            color: 0xff0000,
            side: THREE.DoubleSide,
            transparent: true,
            opacity: 0,
            depthWrite: false,
            ...wireframeOptions,
        });

        // create hitbox
        const hitbox = new THREE.Mesh(
            new THREE.BoxBufferGeometry(size.x, size.y, size.z),
            hitboxMaterial
        );

        // set name of the hitbox object
        hitbox.name = name;

        // set hitbox position
        hitbox.position.copy(position);

        // add hitbox to scene
        this.scene.add(hitbox);

        // add hitbox to hitboxes
        this.hitboxes = {
            ...this.hitboxes,
            [name]: {
                action,
            },
        };
    }
}
