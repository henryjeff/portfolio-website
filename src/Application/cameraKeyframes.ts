import * as THREE from 'three';

const cameraKeyframes: CameraKeyframes = {
    start: {
        position: new THREE.Vector3(-4000, 2000, 4000),
        focalPoint: new THREE.Vector3(0, 200, 0),
    },
    monitor: {
        position: new THREE.Vector3(0, 900, 1800),
        focalPoint: new THREE.Vector3(0, 920, 0),
    },
};

export default cameraKeyframes;
