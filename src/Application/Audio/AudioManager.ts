import * as THREE from 'three';
import Application from '../Application';
import { ComputerAudio, RadioAudio } from './AudioSources';
import UIEventBus from '../UI/EventBus';
export default class Audio {
    application: Application;
    listener: THREE.AudioListener;
    context: AudioContext;
    loadedAudio: { [key in string]: LoadedAudio };
    audioPool: { [key in string]: THREE.PositionalAudio | THREE.Audio };
    audioSources: {
        computer: ComputerAudio;
        radio: RadioAudio;
    };
    scene: THREE.Scene;

    constructor() {
        this.application = new Application();
        this.listener = new THREE.AudioListener();
        this.application.camera.instance.add(this.listener);
        this.loadedAudio = this.application.resources.items.audio;
        this.scene = this.application.scene;
        this.audioPool = {};

        this.audioSources = {
            computer: new ComputerAudio(this),
            radio: new RadioAudio(this),
        };

        UIEventBus.on('loadingScreenDone', () => {
            // console.log('RESUMING CONTEXT');
            setTimeout(() => {
                const AudioContext =
                    // @ts-ignore
                    window.AudioContext || window.webkitAudioContext;
                this.context = new AudioContext();
                this.context.resume();
            }, 100);
        });
    }

    playAudio(
        sourceName: string,
        options: {
            volume?: number;
            randDetuneScale?: number;
            loop?: boolean;
            position?: THREE.Vector3;
            refDistance?: number;
        } = {}
    ) {
        // Resume context if it's suspended
        if (this.context) this.context.resume();

        // Get the audio source
        sourceName = this.getRandomVariant(sourceName);

        // Setup
        const buffer = this.loadedAudio[sourceName];
        const poolKey = sourceName + '_' + Object.keys(this.audioPool).length;

        let audio: THREE.Audio<any> | THREE.PositionalAudio = new THREE.Audio(
            this.listener
        );

        if (options.position) {
            audio = new THREE.PositionalAudio(this.listener);

            // @ts-ignore
            audio.setRefDistance(options.refDistance || 1000);

            const sphere = new THREE.SphereGeometry(100, 8, 8);
            const material = new THREE.MeshBasicMaterial({ color: 0xff0000 });
            const mesh = new THREE.Mesh(sphere, material);

            mesh.position.copy(options.position);
            mesh.name = poolKey;
            this.scene.add(mesh);
        }

        // Set options
        audio.setBuffer(buffer);
        audio.setLoop(options.loop ? true : false);
        audio.setVolume(options.volume || 1);
        audio.play();

        // Calculate detune
        const detuneAmount =
            (Math.random() * 200 - 100) * (options.randDetuneScale || 1);

        // Set detune after .play is called
        audio.setDetune(detuneAmount);

        // Add to pool
        if (audio.source) {
            audio.source.onended = () => {
                delete this.audioPool[poolKey];
                if (options.position) {
                    const positionalObject =
                        this.scene.getObjectByName(poolKey);
                    if (positionalObject) {
                        this.scene.remove(positionalObject);
                    }
                }
            };
            this.audioPool[poolKey] = audio;
        }
    }

    getRandomVariant(sourceName: string) {
        const variants = [];
        for (const key in this.loadedAudio) {
            if (key.includes(sourceName)) {
                variants.push(key);
            }
        }
        return variants[Math.floor(Math.random() * variants.length)];
    }
}
