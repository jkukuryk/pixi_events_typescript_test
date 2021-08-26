import * as PIXI from "pixi.js";
import * as PIXIEvents from "@pixi/events";
import { example1 } from "./example";

let app: PIXI.Application;
let mainContainer: PIXI.Container;

delete PIXI.Renderer.__plugins.interaction;

export function init() {
  const resolution = [800, 600];
  app = new PIXI.Application({
    backgroundColor: 0x666666,
    width: resolution[0],
    height: resolution[1],
    antialias: true,
  });

  const container = document.body;

  container.appendChild(app.view);
  mainContainer = new PIXI.Container();
  mainContainer.sortableChildren = true;
  app.stage.addChild(mainContainer);
  createListeners();
  example1(app);
}

function createListeners() {
  if (!("events" in app.renderer)) {
    //TS-ERROR
    app.renderer.addSystem(PIXIEvents.EventSystem, "events");
  }
}
