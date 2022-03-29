import * as THREE from 'three';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Debug from './Utils/Debug';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls.js';
import GUI from 'lil-gui';
import EventEmitter from './Utils/EventEmitter';
import TWEEN from '@tweenjs/tween.js';
import keyframes from './cameraKeyframes';
import Renderer from './Renderer';
import Resources from './Utils/Resources';
import UIEventBus from './UI/EventBus';

// create enums for camera states
export enum CameraState {
    IDLE = 'idle',
    MONITOR_LOCK = 'monitorLock',
}

export default class Camera extends EventEmitter {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    instance: THREE.PerspectiveCamera;
    controls: OrbitControls;
    debug: Debug;
    renderer: Renderer;
    debugFolder: GUI;
    resources: Resources;
    mouse: THREE.Vector2;
    position: THREE.Vector3;
    focalPoint: THREE.Vector3;
    keyframes: CameraKeyframes;
    debugParams: { lockedCamera: boolean };
    state: {
        next: CameraState;
        current: CameraState;
        moving: boolean;
    };

    constructor() {
        super();
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.debug = this.application.debug;
        this.keyframes = keyframes;
        this.mouse = new THREE.Vector2(0, 0);

        this.state = {
            next: CameraState.IDLE,
            current: CameraState.IDLE,
            moving: false,
        };
        this.position = new THREE.Vector3().copy(
            this.keyframes.loading.position
        );
        this.focalPoint = new THREE.Vector3().copy(
            this.keyframes.loading.focalPoint
        );

        UIEventBus.on('loadingScreenDone', () => {
            this.tweenTo(
                this.keyframes.start,
                2200,
                TWEEN.Easing.Exponential.Out
            );
        });

        // this.on('leftMonitor', () => {
        // this.moveTo(this.keyframes.start, 1000);
        // });

        // this.on('enterMonitor', () => {
        // this.moveTo(this.keyframes.monitor, 1000);
        // });

        this.setInstance();
        this.setDebug();
    }

    tweenTo(keyframe: CameraKeyframe, duration: number = 1000, easing?: any) {
        if (this.state.moving) return;
        this.state.moving = true;

        const tweenPos = new TWEEN.Tween(this.position).to(
            keyframe.position,
            duration
        );
        const that = this;

        const tweenFoc = new TWEEN.Tween(this.focalPoint)
            .to(keyframe.focalPoint, duration)
            .onComplete(() => {
                that.state.moving = false;
            });

        tweenPos.easing(easing || TWEEN.Easing.Exponential.InOut);
        tweenFoc.easing(easing || TWEEN.Easing.Exponential.InOut);

        tweenPos.start();
        tweenFoc.start();
    }

    setOrbitControls() {
        // console.log(this.application.renderer);
        // this.controls = new OrbitControls(
        //     this.instance,
        //     this.application.renderer.instance.domElement
        // );
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

        // add document listener for mouse click
        // document.addEventListener('mousedown', this.toggleState.bind(this));
    }

    toggleState() {
        if (!this.state.moving) {
            if (this.state.current === CameraState.IDLE) {
                this.state.current = CameraState.MONITOR_LOCK;
                this.tweenTo(this.keyframes.monitor, 1000);
            } else {
                this.state.current = CameraState.IDLE;
                this.tweenTo(this.keyframes.start, 1000);
            }
        }
    }

    setDebug() {
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('Camera');
        }
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    update() {
        TWEEN.update();

        // const targetX = this.mouse.x - this.sizes.width / 2;
        // const targetY = this.mouse.y - this.sizes.height / 2;

        // get current time

        // set x and z to rotate around the x and y axis

        // console.log(z);

        // set the position of the camera
        // const tempPos = new Vector3().copy(this.position);
        // const time = Date.now();
        // const x = Math.sin(time * 0.0002) * tempPos.x;
        // const y = (Math.sin(time * 0.0001) * tempPos.y) / 2 + tempPos.y;

        // this.instance.position.set(
        //     x,
        //     // this.instance.position.y,
        //     y,
        //     this.instance.position.z
        // );

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

        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);

        // const tempFocal = new Vector3().copy(this.focalPoint);

        // this.instance.lookAt(
        //     tempFocal.add(new THREE.Vector3(targetX * 0.05, targetY * -0.05, 0))
        // );
    }
}
