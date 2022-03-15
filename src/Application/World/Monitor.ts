import GUI from 'lil-gui';
import * as THREE from 'three';
import Application from '../Application';
import BakedModel from '../Utils/BakedModel';
import Debug from '../Utils/Debug';
import Resources from '../Utils/Resources';
import Time from '../Utils/Time';

export default class Monitor {
    application: Application;
    scene: THREE.Scene;
    resources: Resources;
    time: Time;
    debug: Debug;
    debugFolder: GUI;
    resource: LoadedModel;
    bakedModel: BakedModel;

    constructor() {
        this.application = new Application();
        this.scene = this.application.scene;
        this.resources = this.application.resources;
        this.time = this.application.time;
        this.debug = this.application.debug;

        // Debug
        if (this.debug.active) {
            this.debugFolder = this.debug.ui.addFolder('computer');
        }

        this.bakedModel = new BakedModel(
            this.resources.items.gltfModel.monitorModel,
            this.resources.items.texture.monitorTexture,
            890
        );

        this.setModel();
    }

    setModel() {
        this.scene.add(this.bakedModel.getModel());
    }
}
