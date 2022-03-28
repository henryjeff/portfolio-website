import * as THREE from 'three';

const cameraKeyframes: CameraKeyframes = {
    loading: {
        position: new THREE.Vector3(-30000, 30000, 30000),
        focalPoint: new THREE.Vector3(0, -5000, 0),
    },
    start: {
        position: new THREE.Vector3(-20000, 9000, 20000),
        focalPoint: new THREE.Vector3(0, -1000, 0),
    },
    monitor: {
        position: new THREE.Vector3(0, 900, 2400),
        focalPoint: new THREE.Vector3(0, 920, 0),
    },
};

export default cameraKeyframes;
