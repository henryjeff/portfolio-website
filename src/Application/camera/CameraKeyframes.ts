import * as THREE from 'three';
import { CameraKey } from './Camera';
import Time from '../Utils/Time';
import Application from '../Application';
import Mouse from '../Utils/Mouse';
import Sizes from '../Utils/Sizes';

export class CameraKeyframeInstance {
    position: THREE.Vector3;
    focalPoint: THREE.Vector3;

    constructor(keyframe: CameraKeyframe) {
        this.position = keyframe.position;
        this.focalPoint = keyframe.focalPoint;
    }

    update() {}
}

const keys: { [key in CameraKey]: CameraKeyframe } = {
    idle: {
        position: new THREE.Vector3(-20000, 9000, 20000),
        focalPoint: new THREE.Vector3(0, -1000, 0),
    },
    monitor: {
        position: new THREE.Vector3(0, 900, 2200),
        focalPoint: new THREE.Vector3(0, 900, 0),
    },
    desk: {
        position: new THREE.Vector3(0, 880, 5000),
        focalPoint: new THREE.Vector3(0, 850, 0),
    },
    loading: {
        position: new THREE.Vector3(-30000, 30000, 30000),
        focalPoint: new THREE.Vector3(0, -5000, 0),
    },
};

export class MonitorKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.monitor;
        super(keyframe);
    }

    update() {}
}

export class LoadingKeyframe extends CameraKeyframeInstance {
    constructor() {
        const keyframe = keys.loading;
        super(keyframe);
    }

    update() {}
}

export class DeskKeyframe extends CameraKeyframeInstance {
    origin: THREE.Vector3;
    application: Application;
    mouse: Mouse;
    sizes: Sizes;
    target: THREE.Vector3;

    constructor() {
        const keyframe = keys.desk;
        super(keyframe);
        this.application = new Application();
        this.mouse = this.application.mouse;
        this.sizes = this.application.sizes;
        // this.origin = new THREE.Vector3().copy(keyframe.position);
        this.target = new THREE.Vector3().copy(keyframe.focalPoint);
    }

    update() {
        // this.position.x = this.origin.x + 0.01;
        this.target.x +=
            (this.mouse.x - this.sizes.width / 2 - this.target.x) * 0.02;
        this.target.y +=
            (-(this.mouse.y - this.sizes.height) - this.target.y) * 0.02;
        this.target.z = this.focalPoint.z;

        this.focalPoint.copy(this.target);
    }
}

export class IdleKeyframe extends CameraKeyframeInstance {
    time: Time;
    origin: THREE.Vector3;

    constructor() {
        const keyframe = keys.idle;
        super(keyframe);
        this.origin = new THREE.Vector3().copy(keyframe.position);
        this.time = new Time();
    }

    update() {
        this.position.x =
            // Offset with the 1000000
            Math.sin((this.time.elapsed + 1000000) * 0.00004) * this.origin.x;
        this.position.x = this.position.x;
        this.position.y =
            Math.sin(this.time.elapsed * 0.00002) * 4000 + this.origin.y - 3000;
        this.position.z = this.position.z;
    }
}
