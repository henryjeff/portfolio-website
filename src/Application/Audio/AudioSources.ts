import AudioManager from './AudioManager';

export class PeripheralAudio {
    constructor(audio: AudioManager) {
        document.addEventListener('mousedown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                audio.playAudio('mouseClick', { volume: 0.5 });
            }
        });

        document.addEventListener('keydown', (event) => {
            // @ts-ignore
            if (event.inComputer) {
                audio.playAudio('keyboardKeydown', { volume: 0.7 });
            }
        });
    }
}
