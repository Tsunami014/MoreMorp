var main = null;
function setMain(nmain) {
  main = nmain;
  console.log("[MoreMorp] Injected the GameCanvas!")
  console.log(main)
}
function check() {
  if (main === null) {
    console.error("[MoreMorp] Not ready!");
    return false;
  }
  return true;
}

var current = null;
export function getCurrentLvl() {
  if (!check()) return {};
  var ld = main.assetManager.levelDataCache;
  if (current === null) {
    return [ld.get("old-town-square"), true];
  }
  return [ld.get(current), current == "old-town-square"];
}
export function teleport(to, spawn) {
  if (!check()) return;
  if (to == "town-square") { to = "old-town-square"; }
  var ld = main.assetManager.levelDataCache;
  ld.set("town-square", ld.get(to))
  const lvlId = "town-square"
  current = to

  let player = main.players.get(main.localPlayerId);
  let n = player.mesh.position.clone().project(main.camera),
    r = (n.x + 1) / 2,
    i = (-n.y + 1) / 2;
  main.setInputEnabled(!1);
  let c = main.sceneTransition,
    l = main.onTransitionStateChange;
  c.play(
    r, i,
    async () => {
        l?.(!0), await main.loadLevel(lvlId, spawn), main.inputEnabled = true;
    },
    () => {
        l?.(!1);
    }
  )
}
