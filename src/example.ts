import * as PIXI from "pixi.js";

export function example1(app: PIXI.Application) {
  const bunny = app.stage.addChild(
    PIXI.Sprite.from("https://pixijs.io/examples/examples/assets/bunny.png")
  );

  bunny.texture.baseTexture.scaleMode = PIXI.SCALE_MODES.NEAREST;

  bunny.anchor.set(0.5, 0.5);
  bunny.scale.set(3);
  bunny.position.set(
    app.renderer.screen.width / 2,
    app.renderer.screen.height / 2
  );

  // TS-ERROR
  bunny.interactive = true;

  app.stage.interactive = true;
  app.stage.hitArea = app.renderer.screen;

  // Listen for clicks
  app.stage.addEventListener("click", (e: any) => {
    if (e.target === bunny) {
      const clicks = e.detail;
      bunny.scale.set(3 * clicks ** 0.34);
    } else {
      bunny.scale.set(3);
    }
  });
}
