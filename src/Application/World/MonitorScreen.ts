import * as THREE from 'three';
import { CSS3DObject } from 'three/examples/jsm/renderers/CSS3DRenderer.js';
import GUI from 'lil-gui';
import Application from '../Application';
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Sizes from '../Utils/Sizes';
import Camera from '../Camera/Camera';
import EventEmitter from '../Utils/EventEmitter';
import e from 'express';

const SCREEN_SIZE = { w: 1280, h: 1024 };
const IFRAME_PADDING = 64;
const IFRAME_SIZE = {
    w: SCREEN_SIZE.w - IFRAME_PADDING,
    h: SCREEN_SIZE.h - IFRAME_PADDING,
};

export default class MonitorScreen extends EventEmitter {
    application: Application;
    scene: THREE.Scene;
    cssScene: THREE.Scene;
    resources: Resources;
    debug: Debug;
    sizes: Sizes;
    debugFolder: GUI;
    screenSize: THREE.Vector2;
    position: THREE.Vector3;
    rotation: THREE.Euler;
    camera: Camera;
    prevInComputer: boolean;
    inComputer: boolean;
    dimmingPlane: THREE.Mesh;
    videoTextures: { [key in string]: THREE.VideoTexture };

    constructor() {
        super();
        this.application = new Application();
        this.scene = this.application.scene;
        this.cssScene = this.application.cssScene;
        this.sizes = this.application.sizes;
        this.resources = this.application.resources;
        this.screenSize = new THREE.Vector2(SCREEN_SIZE.w, SCREEN_SIZE.h);
        this.camera = this.application.camera;
        this.position = new THREE.Vector3(0, 950, 255);
        this.rotation = new THREE.Euler(-3 * THREE.MathUtils.DEG2RAD, 0, 0);
        this.videoTextures = {};

        // Create screen
        this.initializeScreenEvents();
        this.createIframe();
        const maxOffset = this.createTextureLayers();
        this.createEnclosingPlanes(maxOffset);
        this.createPerspectiveDimmer(maxOffset);
    }

    initializeScreenEvents() {
        document.addEventListener(
            'mousemove',
            (event) => {
                // @ts-ignore
                this.inComputer = event.inComputer;

                if (this.inComputer && !this.prevInComputer) {
                    this.camera.trigger('enterMonitor');
                }

                if (!this.inComputer && this.prevInComputer) {
                    this.camera.trigger('leftMonitor');
                }

                this.application.mouse.trigger('mousemove', [event]);

                this.prevInComputer = this.inComputer;
            },
            false
        );
        document.addEventListener(
            'mousedown',
            (event) => {
                // @ts-ignore
                this.inComputer = event.inComputer;

                this.application.mouse.trigger('mousedown', [event]);

                this.prevInComputer = this.inComputer;
            },
            false
        );
        document.addEventListener(
            'mouseup',
            (event) => {
                // @ts-ignore
                this.inComputer = event.inComputer;

                this.application.mouse.trigger('mouseup', [event]);

                this.prevInComputer = this.inComputer;
            },
            false
        );
    }

    /**
     * Creates the iframe for the computer screen
     */
    createIframe() {
        // Create container
        const container = document.createElement('div');
        container.style.width = this.screenSize.width + 'px';
        container.style.height = this.screenSize.height + 'px';
        container.style.paddingTop = IFRAME_PADDING + 'px';
        container.style.paddingLeft = IFRAME_PADDING + 'px';
        container.style.opacity = '1';
        container.style.background = '#1d2e2f';

        // Create iframe
        const iframe = document.createElement('iframe');

        // Bubble mouse move events to the main application, so we can affect the camera
        iframe.onload = () => {
            if (iframe.contentWindow) {
                window.addEventListener('message', (event) => {
                    var evt = new CustomEvent(event.data.type, {
                        bubbles: true,
                        cancelable: false,
                    });

                    // @ts-ignore
                    evt.inComputer = true;
                    if (event.data.type === 'mousemove') {
                        var clRect = iframe.getBoundingClientRect();
                        const { top, left, width, height } = clRect;
                        const widthRatio = width / IFRAME_SIZE.w;
                        const heightRatio = height / IFRAME_SIZE.h;

                        // @ts-ignore
                        evt.clientX = Math.round(
                            event.data.clientX * widthRatio + left
                        );
                        //@ts-ignore
                        evt.clientY = Math.round(
                            event.data.clientY * heightRatio + top
                        );
                    } else if (event.data.type === 'keydown') {
                        // @ts-ignore
                        evt.keyCode = event.data.keyCode;
                    } else if (event.data.type === 'keyup') {
                        // @ts-ignore
                        evt.keyCode = event.data.keyCode;
                    }

                    iframe.dispatchEvent(evt);
                });
            }
        };

        // Set iframe attributes
        // DEV
        // iframe.src = 'http://localhost:3000/';
        // PROD
        iframe.src = 'https://portfolio-inner.vercel.app/';
        iframe.style.width = IFRAME_SIZE.w + 'px';
        iframe.style.height = IFRAME_SIZE.h + 'px';
        iframe.style.opacity = '1';
        iframe.className = 'jitter';
        iframe.frameBorder = '0';

        // Add iframe to container
        container.appendChild(iframe);

        // Create CSS plane
        this.createCssPlane(container);
    }

    /**
     * Creates a CSS plane and GL plane to properly occlude the CSS plane
     * @param element the element to create the css plane for
     */
    createCssPlane(element: HTMLElement) {
        // Create CSS3D object
        const object = new CSS3DObject(element);

        // copy monitor position and rotation
        object.position.copy(this.position);
        object.rotation.copy(this.rotation);

        // Add to CSS scene
        this.cssScene.add(object);

        // Create GL plane
        const material = new THREE.MeshLambertMaterial();
        material.side = THREE.DoubleSide;
        material.opacity = 0;
        material.transparent = true;
        // NoBlending allows the GL plane to occlude the CSS plane
        material.blending = THREE.NoBlending;

        // Create plane geometry
        const geometry = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        // Create the GL plane mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Copy the position, rotation and scale of the CSS plane to the GL plane
        mesh.position.copy(object.position);
        mesh.rotation.copy(object.rotation);
        mesh.scale.copy(object.scale);

        // Add to gl scene
        this.scene.add(mesh);
    }

    /**
     * Creates the texture layers for the computer screen
     * @returns the maximum offset of the texture layers
     */
    createTextureLayers() {
        const textures = this.resources.items.texture;

        this.getVideoTextures('video-1');
        this.getVideoTextures('video-2');

        // Scale factor to multiply depth offset by
        const scaleFactor = 4;

        // Construct the texture layers
        const layers = {
            smudge: {
                texture: textures.monitorSmudgeTexture,
                blending: THREE.AdditiveBlending,
                opacity: 0.12,
                offset: 24,
            },
            innerShadow: {
                texture: textures.monitorShadowTexture,
                blending: THREE.NormalBlending,
                opacity: 1,
                offset: 5,
            },
            video: {
                texture: this.videoTextures['video-1'],
                blending: THREE.AdditiveBlending,
                opacity: 0.5,
                offset: 10,
            },
            video2: {
                texture: this.videoTextures['video-2'],
                blending: THREE.AdditiveBlending,
                opacity: 0.1,
                offset: 15,
            },
        };

        // Declare max offset
        let maxOffset = -1;

        // Add the texture layers to the screen
        for (const [_, layer] of Object.entries(layers)) {
            const offset = layer.offset * scaleFactor;
            this.addTextureLayer(
                layer.texture,
                layer.blending,
                layer.opacity,
                offset
            );
            // Calculate the max offset
            if (offset > maxOffset) maxOffset = offset;
        }

        // Return the max offset
        return maxOffset;
    }

    getVideoTextures(videoId: string) {
        const video = document.getElementById(videoId);
        if (!video) {
            setTimeout(() => {
                this.getVideoTextures(videoId);
            }, 100);
        } else {
            this.videoTextures[videoId] = new THREE.VideoTexture(
                video as HTMLVideoElement
            );
        }
    }

    /**
     * Adds a texture layer to the screen
     * @param texture the texture to add
     * @param blending the blending mode
     * @param opacity the opacity of the texture
     * @param offset the offset of the texture, higher values are further from the screen
     */
    addTextureLayer(
        texture: THREE.Texture,
        blendingMode: THREE.Blending,
        opacity: number,
        offset: number
    ) {
        // Create material
        const material = new THREE.MeshBasicMaterial({
            map: texture,
            blending: blendingMode,
            side: THREE.DoubleSide,
            opacity,
            transparent: true,
        });

        // Create geometry
        const geometry = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        // Create mesh
        const mesh = new THREE.Mesh(geometry, material);

        // Copy position and apply the depth offset
        mesh.position.copy(
            this.offsetPosition(this.position, new THREE.Vector3(0, 0, offset))
        );

        // Copy rotation
        mesh.rotation.copy(this.rotation);

        this.scene.add(mesh);
    }

    /**
     * Creates enclosing planes for the computer screen
     * @param maxOffset the maximum offset of the texture layers
     */
    createEnclosingPlanes(maxOffset: number) {
        // Create planes, lots of boiler plate code here because I'm lazy
        const planes = {
            left: {
                size: new THREE.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        -this.screenSize.width / 2,
                        0,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
            },
            right: {
                size: new THREE.Vector2(maxOffset, this.screenSize.height),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        this.screenSize.width / 2,
                        0,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(0, 90 * THREE.MathUtils.DEG2RAD, 0),
            },
            top: {
                size: new THREE.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        0,
                        this.screenSize.height / 2,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
            },
            bottom: {
                size: new THREE.Vector2(this.screenSize.width, maxOffset),
                position: this.offsetPosition(
                    this.position,
                    new THREE.Vector3(
                        0,
                        -this.screenSize.height / 2,
                        maxOffset / 2
                    )
                ),
                rotation: new THREE.Euler(90 * THREE.MathUtils.DEG2RAD, 0, 0),
            },
        };

        // Add each of the planes
        for (const [_, plane] of Object.entries(planes)) {
            this.createEnclosingPlane(plane);
        }
    }

    /**
     * Creates a plane for the enclosing planes
     * @param plane the plane to create
     */
    createEnclosingPlane(plane: EnclosingPlane) {
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x48493f,
        });

        const geometry = new THREE.PlaneGeometry(plane.size.x, plane.size.y);
        const mesh = new THREE.Mesh(geometry, material);

        mesh.position.copy(plane.position);
        mesh.rotation.copy(plane.rotation);

        this.scene.add(mesh);
    }

    createPerspectiveDimmer(maxOffset: number) {
        const material = new THREE.MeshBasicMaterial({
            side: THREE.DoubleSide,
            color: 0x000000,
            transparent: true,
            blending: THREE.AdditiveBlending,
        });

        const plane = new THREE.PlaneGeometry(
            this.screenSize.width,
            this.screenSize.height
        );

        const mesh = new THREE.Mesh(plane, material);

        mesh.position.copy(
            this.offsetPosition(
                this.position,
                new THREE.Vector3(0, 0, maxOffset - 5)
            )
        );

        mesh.rotation.copy(this.rotation);

        this.dimmingPlane = mesh;

        this.scene.add(mesh);
    }

    /**
     * Offsets a position vector by another vector
     * @param position the position to offset
     * @param offset the offset to apply
     * @returns the new offset position
     */
    offsetPosition(position: THREE.Vector3, offset: THREE.Vector3) {
        const newPosition = new THREE.Vector3();
        newPosition.copy(position);
        newPosition.add(offset);
        return newPosition;
    }

    update() {
        if (this.dimmingPlane) {
            const planeNormal = new THREE.Vector3(0, 0, 1);
            const viewVector = new THREE.Vector3();
            viewVector.copy(this.camera.instance.position);
            viewVector.sub(this.position);
            viewVector.normalize();

            const dot = viewVector.dot(planeNormal);

            // calculate the distance from the camera vector to the plane vector
            const dimPos = this.dimmingPlane.position;
            const camPos = this.camera.instance.position;

            const distance = Math.sqrt(
                (camPos.x - dimPos.x) ** 2 +
                    (camPos.y - dimPos.y) ** 2 +
                    (camPos.z - dimPos.z) ** 2
            );

            const opacity = 1 / (distance / 10000);

            // @ts-ignore
            this.dimmingPlane.material.opacity =
                (1 - opacity) * 0.7 + (1 - dot) * 0.7;
        }
    }
}
