import "./style.css";

import Application from "./Application/Application";

const canvas = document.querySelector("canvas.webgl");

if (canvas) {
  const app: Application = new Application(canvas as HTMLElement);
}
