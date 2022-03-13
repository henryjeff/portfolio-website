import Application from "../Application";
import Resources from "../Utils/Resources";
//@ts-ignore
// import Environment from "./Environment";
import Computer from "./Computer";
import ComputerScreen from "./ComputerScreen";
export default class World {
  application: Application;
  scene: THREE.Scene;
  resources: Resources;
  floor: any;
  computer: any;
  environment: any;
  computerScreen: any;

  constructor() {
    this.application = new Application();
    this.scene = this.application.scene;
    this.resources = this.application.resources;

    // Wait for resources
    this.resources.on("ready", () => {
      // Setup
      this.computer = new Computer();
      this.computerScreen = new ComputerScreen();
      // this.environment = new Environment();
    });
  }

  update() {
    // if (this.floor) this.fox.update();
  }
}
