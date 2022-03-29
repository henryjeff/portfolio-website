import * as THREE from 'three';
import Application from '../Application';
import Camera from '../camera/Camera';

const RENDER_WIREFRAME = false;

export default class Decor {
    application: Application;
    scene: THREE.Scene;
    hitboxes: {
        [key: string]: {
            action: () => void;
        };
    };
    camera: Camera;
    mouse: THREE.Vector2;
    raycaster: THREE.Raycaster;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.camera = this.application.camera;
        this.mouse = new THREE.Vector2();
        this.raycaster = new THREE.Raycaster();

        this.createRaycaster();
        this.createComputerHitbox();
    }

    createRaycaster() {
        window.addEventListener('mousemove', (event) => {
            event.preventDefault();
            this.mouse.x = (event.clientX / window.innerWidth) * 2 - 1;
            this.mouse.y = -(event.clientY / window.innerHeight) * 2 + 1;
        });

        window.addEventListener('click', (event) => {
            event.preventDefault();
            this.raycaster.setFromCamera(this.mouse, this.camera.instance);
            const intersects = this.raycaster.intersectObjects(
                this.scene.children
            );
            if (intersects.length > 0) {
                const hb = this.hitboxes[intersects[0].object.name];
                if (hb) {
                    hb.action();
                }
            }
        });
    }

    createComputerHitbox() {
        this.createHitbox(
            'computerHitbox',
            () => {
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
                  wireframe: true,
                  wireframeLinewidth: 50,
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
