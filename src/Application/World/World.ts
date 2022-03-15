import Application from "../Application";
import Resources from "../Utils/Resources";
//@ts-ignore
// import Environment from "./Environment";
import Monitor from "./Monitor";
import MonitorScreen from "./MonitorScreen";
export default class World {
  application: Application;
  scene: THREE.Scene;
  resources: Resources;
  floor: any;
  environment: any;
  monitor: Monitor;
  monitorScreen: MonitorScreen;

  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.monitor = new Monitor();
      this.monitorScreen = new MonitorScreen();
      // this.environment = new Environment();
    });
  }

  update() {
    // if (this.floor) this.fox.update();
  }
}
