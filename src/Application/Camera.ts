import * as THREE from 'three';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Debug from './Utils/Debug';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import EventEmitter from './Utils/EventEmitter';
import TWEEN from '@tweenjs/tween.js';
import keyframes from './cameraKeyframes';
import { Vector3 } from 'three';
import Renderer from './Renderer';

export default class Camera extends EventEmitter {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    canvas: HTMLElement;
    instance: THREE.PerspectiveCamera;
    controls: OrbitControls;
    debug: Debug;
    renderer: Renderer;
    debugFolder: GUI;
    mouse: THREE.Vector2;
    position: THREE.Vector3;
    focalPoint: THREE.Vector3;
    keyframes: CameraKeyframes;
    debugParams: { lockedCamera: boolean };

    constructor() {
        super();
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.canvas = this.application.canvas;
        this.renderer = this.application.renderer;
        this.debug = this.application.debug;
        this.keyframes = keyframes;
        this.mouse = new THREE.Vector2(0, 0);

        this.position = new THREE.Vector3().copy(this.keyframes.start.position);
        this.focalPoint = new THREE.Vector3().copy(
            this.keyframes.start.focalPoint
        );

        this.on('leftMonitor', () => {
            this.moveTo(this.keyframes.start, 1000);
        });

        this.on('enterMonitor', () => {
            this.moveTo(this.keyframes.monitor, 1000);
        });

        this.setInstance();
        this.setDebug();
    }

    moveTo(keyframe: CameraKeyframe, duration: number = 1000) {
        const tweenPos = new TWEEN.Tween(this.position).to(
            keyframe.position,
            duration
        );
        const tweenFoc = new TWEEN.Tween(this.focalPoint).to(
            keyframe.focalPoint,
            duration
        );

        tweenPos.easing(TWEEN.Easing.Exponential.InOut);
        tweenFoc.easing(TWEEN.Easing.Exponential.InOut);

        tweenPos.start();
        tweenFoc.start();
    }

    setOrbitControls() {
        // console.log(this.application.renderer);
        // this.controls = new OrbitControls(
        //     this.instance,
        //     this.application.renderer.instance.domElement
        // );
        // // console.log(this.application.canvas);
        // this.controls.enableDamping = true;
        // this.controls.dampingFactor = 0.1;
        // this.controls.enableZoom = false;
        // this.controls.enableRotate = false;
        // this.controls.autoRotate = true;
        // this.controls.enablePan = false;
        // this.controls.minDistance = 10;
        // this.controls.maxDistance = 900000;
        // // this.controls.enableKeys = false;
        // this.controls.enablePan = false;
        // this.controls.enableRotate = false;
        // this.controls.enableZoom = false;
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            10,
            900000
        );

        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
        this.scene.add(this.instance);

        document.addEventListener(
            'mousemove',
            (event) => this.onMouseMove(event),
            false
        );
    }

    setDebug() {
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera');
        }
    }

    onMouseMove(event: MouseEvent) {
        this.mouse.x = event.clientX;
        this.mouse.y = event.clientY;
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        TWEEN.update();

        const tempPos = new Vector3().copy(this.position);

        // const targetX = this.mouse.x - this.sizes.width / 2;
        // const targetY = this.mouse.y - this.sizes.height / 2;

        // get current time
        const time = Date.now();

        // set x and z to rotate around the x and y axis
        const x = Math.sin(time * 0.0002) * tempPos.x;
        const y = (Math.sin(time * 0.0001) * tempPos.y) / 2 + tempPos.y;

        // console.log(z);

        // set the position of the camera

        this.instance.position.set(
            x,
            // this.instance.position.y,
            y,
            this.instance.position.z
        );

        // this.targetX =
        // this.instance.position.copy(
        //     tempPos.add(new THREE.Vector3(targetX * 0.1, targetY * -0.1, 0))
        // );

        // if (this.controls) {
        //     this.controls.update();
        // }

        //clamp the camera position to not go below -1900
        // if (this.instance.position.y < 0) {
        //     this.instance.position.y = 0;
        // }

        // console.log(this.instance.position);

        // this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);

        // const tempFocal = new Vector3().copy(this.focalPoint);

        // this.instance.lookAt(
        //     tempFocal.add(new THREE.Vector3(targetX * 0.05, targetY * -0.05, 0))
        // );
    }
}
