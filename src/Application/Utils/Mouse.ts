import EventEmitter from './EventEmitter';

export default class Mouse extends EventEmitter {
    x: number;
    y: number;
    inComputer: boolean;

    constructor() {
        super();

        // Setup
        this.x = 0;
        this.y = 0;
        this.inComputer = false;

        // Resize event
        this.on('mousemove', (event: any) => {
            if (event.clientX && event.clientY) {
                this.x = event.clientX;
                this.y = event.clientY;
            }
            this.inComputer = event.inComputer ? true : false;
        });
    }
}
