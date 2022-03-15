import * as THREE from 'three';

import Debug from './Utils/Debug';
import Sizes from './Utils/Sizes';
import Time from './Utils/Time';
import Camera from './Camera';
import Renderer from './Renderer';

//@ts-ignore
import World from './World/World';
import Resources from './Utils/Resources';

import sources from './sources';

import Stats from 'stats.js';

let instance: Application | null = null;

export default class Application {
    canvas: HTMLElement;
    debug: Debug;
    sizes: Sizes;
    time: Time;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    resources: Resources;
    camera: Camera;
    renderer: Renderer;
    world: World;
    stats: any;

    constructor(_canvas?: HTMLElement) {
        // Singleton
        if (instance) {
            return instance;
        }

        instance = this;

        // Global access
        //@ts-ignore
        window.Application = this;

        // Options
        if (_canvas) {
            this.canvas = _canvas;
        }
        // Setup
        this.debug = new Debug();
        this.sizes = new Sizes();
        // console.log(this.sizes);
        this.time = new Time();
        this.scene = new THREE.Scene();
        this.cssScene = new THREE.Scene();
        this.resources = new Resources(sources);
        this.camera = new Camera();
        this.renderer = new Renderer();
        // Set controls after renderer is created
        this.camera.setControls();
        this.world = new World();

        this.stats = new Stats();
        this.stats.showPanel(0); // 0: fps, 1: ms, 2: mb, 3+: custom
        document.body.appendChild(this.stats.dom);

        // Resize event
        this.sizes.on('resize', () => {
            this.resize();
        });

        // Time tick event
        this.time.on('tick', () => {
            this.update();
        });
    }

    resize() {
        this.camera.resize();
        this.renderer.resize();
    }

    update() {
        this.stats.begin();
        this.camera.update();
        this.world.update();
        this.renderer.update();
        this.stats.end();
    }

    destroy() {
        this.sizes.off('resize');
        this.time.off('tick');

        // Traverse the whole scene
        this.scene.traverse((child) => {
            // Test if it's a mesh
            if (child instanceof THREE.Mesh) {
                child.geometry.dispose();

                // Loop through the material properties
                for (const key in child.material) {
                    const value = child.material[key];

                    // Test if there is a dispose function
                    if (value && typeof value.dispose === 'function') {
                        value.dispose();
                    }
                }
            }
        });

        this.camera.controls.dispose();
        this.renderer.instance.dispose();

        if (this.debug.active) this.debug.ui.destroy();
    }
}
