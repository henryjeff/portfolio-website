import Application from "../Application";
import Resources from "../Utils/Resources";
//@ts-ignore
// import Environment from "./Environment";
import Computer from "./Computer";
//@ts-ignore
// import Floor from "./Floor.js";
// //@ts-ignore
// import Fox from "./Fox.js";

export default class World {
  application: Application;
  scene: THREE.Scene;
  resources: Resources;
  floor: any;
  computer: any;
  environment: any;

  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      // this.floor = new Floor();
      this.computer = new Computer();
      // this.environment = new Environment();
    });
  }

  update() {
    // if (this.floor) this.fox.update();
  }
}
