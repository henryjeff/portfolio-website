import * as THREE from 'three';
import Application from '../Application';
import { PeripheralAudio } from './AudioSources';

export default class Audio {
    application: Application;
    listener: THREE.AudioListener;
    context: AudioContext;
    loadedAudio: { [key in string]: LoadedAudio };
    audioPool: { [key in string]: THREE.Audio };
    audioSources: {
        peripheral: PeripheralAudio;
    };

    constructor() {
        this.application = new Application();
        this.listener = new THREE.AudioListener();
        this.application.camera.instance.add(this.listener);
        this.loadedAudio = this.application.resources.items.audio;
        this.audioPool = {};

        // @ts-ignore
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        this.context = new AudioContext();

        this.audioSources = {
            peripheral: new PeripheralAudio(this),
        };
    }

    playAudio(
        sourceName: string,
        options: {
            volume?: number;
            randDetuneScale?: number;
            loop?: boolean;
        } = {}
    ) {
        // Resume context if it's suspended
        this.context.resume();

        // Get the audio source
        sourceName = this.getRandomVariant(sourceName);

        // Setup
        const buffer = this.loadedAudio[sourceName];
        const audio = new THREE.Audio(this.listener);
        const poolKey = sourceName + '_' + Object.keys(this.audioPool).length;

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
