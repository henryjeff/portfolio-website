import * as THREE from 'three';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Debug from './Utils/Debug';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import EventEmitter from './Utils/EventEmitter';

export default class Camera extends EventEmitter {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLElement;
    instance: THREE.PerspectiveCamera;
    controls: OrbitControls;
    debug: Debug;
    debugFolder: GUI;
    mouse: { x: number; y: number };
    target: { x: number; y: number };
    targetPos: { x: number; y: number };
    lockedCamera: boolean;
    screenLocation: THREE.Vector3;

    constructor() {
        super();
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.canvas = this.application.canvas;
        this.debug = this.application.debug;
        this.mouse = { x: 0, y: 0 };
        this.target = { x: 0, y: 0 };
        this.targetPos = { x: 0, y: 0 };

        this.lockCameraToScreen();

        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('camera');
            let debug = {
                lockedCamera: this.lockedCamera,
            };
            this.debugFolder.add(debug, 'lockedCamera');
            this.debugFolder.onChange((event) => {
                if (event.property === 'lockedCamera') {
                    if (event.value) {
                        this.lockCameraToScreen();
                    } else {
                        this.unlockCamera();
                    }
                }
            });
        }

        this.on('focusChange', (position) => {
            console.log(position);
        });

        this.setInstance();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            45,
            this.sizes.width / this.sizes.height,
            1,
            10000
        );
        this.instance.position.set(0, 850, 2000);
        this.screenLocation = new THREE.Vector3(0, 0, 0);
        this.screenLocation.copy(this.instance.position);
        this.instance.lookAt(this.instance.position);
        this.scene.add(this.instance);

        document.addEventListener(
            'mousemove',
            (event) => this.onMouseMove(event, this.sizes),
            false
        );
    }

    onMouseMove(event: MouseEvent, sizes: Sizes) {
        this.mouse.x = event.clientX - sizes.width / 2;
        this.mouse.y = event.clientY - sizes.height / 2;
    }

    setPointerEvents(toggle: boolean) {
        const gl = document.getElementById('webgl');
        if (gl) {
            if (toggle) {
                gl.style.pointerEvents = 'auto';
            } else {
                gl.style.pointerEvents = 'none';
            }
        }
    }

    lockCameraToScreen() {
        if (this.controls) {
            this.destroyControls();
        }
        this.setPointerEvents(false);
        this.lockedCamera = true;
    }

    unlockCamera() {
        this.setPointerEvents(true);
        this.setControls();
        this.lockedCamera = false;
    }

    setControls() {
        let element = this.canvas;
        if (this.application.renderer) {
            element = this.application.renderer.instance.domElement;
        }
        this.controls = new OrbitControls(this.instance, element);
        this.controls.enableDamping = true;
    }

    destroyControls() {
        this.controls.dispose();
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        if (this.lockedCamera) {
            this.instance.rotation.set(0, 0, 0);
            this.target.x = (1 - this.mouse.x) * 0.0001;
            // this.target.y = (1 - this.mouse.y) * 0.0001;
            // this.targetPos.y = (1 - this.mouse.y) * 0.3;
            this.targetPos.y = (1 - this.mouse.y) * 0.3 + this.screenLocation.y;
            this.targetPos.x = this.mouse.x * 0.3;

            this.instance.position.x +=
                0.1 * (this.targetPos.x - this.instance.position.x);
            this.instance.position.y +=
                0.1 * (this.targetPos.y - this.instance.position.y);

            // this.instance.rotation.x +=
            //   0.1 * (this.target.y - this.instance.rotation.x);
            // this.instance.rotation.y +=
            //   0.1 * (this.target.x - this.instance.rotation.y);
        } else {
            this.controls.update();
        }
    }
}
