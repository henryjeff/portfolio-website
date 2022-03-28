import * as THREE from 'three';
import { CSS3DRenderer } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import Application from './Application';
import Sizes from './Utils/Sizes';
import Camera from './Camera';
import UIEventBus from './UI/EventBus';

export default class Renderer {
    application: Application;
    sizes: Sizes;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    camera: Camera;
    instance: THREE.WebGLRenderer;
    cssInstance: CSS3DRenderer;
    raiseExposure: boolean;

    constructor() {
        this.application = new Application();
        this.sizes = this.application.sizes;
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.camera = this.application.camera;

        this.setInstance();
        // this.setExposureStart();
    }

    setInstance() {
        this.instance = new THREE.WebGLRenderer({
            antialias: true,
            alpha: true,
            powerPreference: 'high-performance',
        });
        // Settings
        // this.instance.physicallyCorrectLights = true;
        this.instance.outputEncoding = THREE.sRGBEncoding;
        // this.instance.toneMapping = THREE.CustomToneMapping;
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.instance.setClearColor(0x000000, 0.0);

        // Style
        this.instance.domElement.style.position = 'absolute';
        this.instance.domElement.style.zIndex = '1px';
        this.instance.domElement.style.top = '0px';

        document.querySelector('#webgl')?.appendChild(this.instance.domElement);

        this.cssInstance = new CSS3DRenderer();
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
        this.cssInstance.domElement.style.position = 'absolute';
        this.cssInstance.domElement.style.top = '0px';

        document
            .querySelector('#css')
            ?.appendChild(this.cssInstance.domElement);
    }

    // setExposureStart() {
    //     this.instance.toneMappingExposure = 0.8;
    //     UIEventBus.on('loadingScreenDone', () => {
    //         this.raiseExposure = true;
    //     });
    // }

    resize() {
        this.instance.setSize(this.sizes.width, this.sizes.height);
        this.instance.setPixelRatio(Math.min(this.sizes.pixelRatio, 2));
        this.cssInstance.setSize(this.sizes.width, this.sizes.height);
    }

    update() {
        this.application.camera.instance.updateProjectionMatrix();
        // if (this.raiseExposure) {
        //     this.instance.toneMappingExposure += 0.001;
        //     if (this.instance.toneMappingExposure > 0.7) {
        //         this.raiseExposure = false;
        //     }
        // }
        this.instance.render(this.scene, this.camera.instance);
        this.cssInstance.render(this.cssScene, this.camera.instance);
    }
}
