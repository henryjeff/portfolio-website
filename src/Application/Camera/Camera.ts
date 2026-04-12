import * as THREE from 'three';
import Application from '../Application';
import Sizes from '../Utils/Sizes';
import EventEmitter from '../Utils/EventEmitter';
import { OrbitControls } from 'three/examples/jsm/controls/OrbitControls';
import TWEEN from '@tweenjs/tween.js';
import Renderer from '../Renderer';
import Resources from '../Utils/Resources';
import UIEventBus from '../UI/EventBus';
import Time from '../Utils/Time';
import BezierEasing from 'bezier-easing';
import {
    CameraKeyframeInstance,
    MonitorKeyframe,
    IdleKeyframe,
    LoadingKeyframe,
    DeskKeyframe,
    OrbitControlsStart,
} from './CameraKeyframes';

export enum CameraKey {
    IDLE = 'idle',
    MONITOR = 'monitor',
    LOADING = 'loading',
    DESK = 'desk',
    ORBIT_CONTROLS_START = 'orbitControlsStart',
}
export default class Camera extends EventEmitter {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    instance: THREE.PerspectiveCamera;
    renderer: Renderer;
    resources: Resources;
    time: Time;

    position: THREE.Vector3;
    focalPoint: THREE.Vector3;

    freeCam: boolean;
    orbitControls: OrbitControls;

    currentKeyframe: CameraKey | undefined;
    targetKeyframe: CameraKey | undefined;
    keyframes: { [key in CameraKey]: CameraKeyframeInstance };

    constructor() {
        super();
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.renderer = this.application.renderer;
        this.resources = this.application.resources;
        this.time = this.application.time;

        this.position = new THREE.Vector3(0, 0, 0);
        this.focalPoint = new THREE.Vector3(0, 0, 0);

        this.freeCam = false;

        this.keyframes = {
            idle: new IdleKeyframe(),
            monitor: new MonitorKeyframe(),
            loading: new LoadingKeyframe(),
            desk: new DeskKeyframe(),
            orbitControlsStart: new OrbitControlsStart(),
        };

        this.setInstance();
        this.setFreeCamStart();
    }

    transition(
        key: CameraKey,
        duration: number = 1000,
        easing?: any,
        callback?: () => void
    ) {
        if (this.currentKeyframe === key) return;

        if (this.targetKeyframe) TWEEN.removeAll();

        this.currentKeyframe = undefined;
        this.targetKeyframe = key;

        const keyframe = this.keyframes[key];

        const posTween = new TWEEN.Tween(this.position)
            .to(keyframe.position, duration)
            .easing(easing || TWEEN.Easing.Quintic.InOut)
            .onComplete(() => {
                this.currentKeyframe = key;
                this.targetKeyframe = undefined;
                if (callback) callback();
            });

        const focTween = new TWEEN.Tween(this.focalPoint)
            .to(keyframe.focalPoint, duration)
            .easing(easing || TWEEN.Easing.Quintic.InOut);

        posTween.start();
        focTween.start();
    }

    setInstance() {
        this.instance = new THREE.PerspectiveCamera(
            35,
            this.sizes.width / this.sizes.height,
            10,
            900000
        );
        this.currentKeyframe = CameraKey.ORBIT_CONTROLS_START;

        this.scene.add(this.instance);
    }

    setFreeCamStart() {
        UIEventBus.on('loadingScreenDone', () => {
            this.instance.position.copy(
                this.keyframes.orbitControlsStart.position
            );
            // @ts-ignore
            document.getElementById('webgl').style.pointerEvents = 'auto';
            this.freeCam = true;
            this.orbitControls.update();
        });
    }

    resize() {
        this.instance.aspect = this.sizes.width / this.sizes.height;
        this.instance.updateProjectionMatrix();
    }

    createControls() {
        this.renderer = this.application.renderer;
        this.orbitControls = new OrbitControls(
            this.instance,
            this.renderer.instance.domElement
        );

        const { x, y, z } = this.keyframes.orbitControlsStart.focalPoint;
        this.orbitControls.target.set(x, y, z);
        this.orbitControls.enablePan = true;

        this.orbitControls.enablePan = false;
        this.orbitControls.enableDamping = true;
        this.orbitControls.object.position.copy(
            this.keyframes.orbitControlsStart.position
        );
        this.orbitControls.dampingFactor = 0.05;
        this.orbitControls.maxPolarAngle = Math.PI / 2;
        this.orbitControls.minDistance = 500;
        this.orbitControls.maxDistance = 10000;

        this.orbitControls.update();
    }

    update() {
        TWEEN.update();

        if (this.freeCam && this.orbitControls) {
            this.position.copy(this.orbitControls.object.position);
            this.focalPoint.copy(this.orbitControls.target);
            this.orbitControls.update();
            return;
        }

        for (const key in this.keyframes) {
            const _key = key as CameraKey;
            this.keyframes[_key].update();
        }

        if (this.currentKeyframe) {
            const keyframe = this.keyframes[this.currentKeyframe];
            this.position.copy(keyframe.position);
            this.focalPoint.copy(keyframe.focalPoint);
        }

        this.instance.position.copy(this.position);
        this.instance.lookAt(this.focalPoint);
    }
}
