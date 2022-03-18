import TWEEN from '@tweenjs/tween.js';
import * as THREE from 'three';
import Application from '../Application';
import EventEmitter from './EventEmitter';
import { gsap } from 'gsap';
import Resources from './Resources';

export default class Loading extends EventEmitter {
    progress: number;
    application: Application;
    resources: Resources;
    scene: THREE.Scene;
    overlay: HTMLElement;
    loadingBar: HTMLElement;
    loadingText: HTMLElement;

    constructor() {
        super();

        this.application = new Application();
        this.resources = this.application.resources;

        this.scene = this.application.scene;
        this.on('loadedSource', (sourceName, loaded, toLoad) => {
            this.progress = loaded / toLoad;
            console.log(this.progress);
            // this.loadingText.textContent = `${sourceName} ${loaded}/${toLoad}`;
            if (this.loadingText) {
                this.loadingText.innerHTML = `Loading... ${loaded}/${toLoad}`;
            }
            if (this.loadingBar) {
                this.loadingBar.style.transform = `scaleX(${this.progress})`;
            }
            if (this.progress === 1) {
                setTimeout(() => {
                    this.hideOverlay();
                }, 500);
            }
        });

        this.setOverlay();
        this.setOverlayText();
        this.setLoadingBar();
    }

    setOverlay() {
        const overlay = document.getElementById('overlay');
        if (overlay) {
            this.overlay = overlay;
        }
    }

    setOverlayText() {
        const loadingText = document.getElementById('loading-text');
        if (loadingText) {
            this.loadingText = loadingText;
        }
    }

    setLoadingBar() {
        const loadingBar = document.getElementById('loading-bar');
        if (loadingBar) {
            this.loadingBar = loadingBar;
        }
        // this.loadingBar = document.createElement('div');
        // this.loadingBar.style.width = '100%';
        // this.loadingBar.style.height = '3px';
        // // this.loadingBar.style.marginTop = '16px';
        // this.loadingBar.style.transformOrigin = 'left';
        // this.loadingBar.style.backgroundColor = '#fff';
        // this.loadingBar.style.pointerEvents = 'none';
        // this.loadingBar.style.transition = 'transform 0.5s ease-in-out';
        // this.loadingBar.style.transform = 'scaleX(0)';
        // this.loadingText.appendChild(this.loadingBar);
    }

    hideOverlay() {
        const overlayOpacity = new TWEEN.Tween({ opacity: 1 }).to(
            { opacity: 0 },
            1000
        );

        overlayOpacity.easing(TWEEN.Easing.Linear.None);

        overlayOpacity.start();
        overlayOpacity.onUpdate((value) => {
            this.overlay.style.opacity = `${value.opacity}`;
        });
    }

    update() {
        TWEEN.update();
    }
}
