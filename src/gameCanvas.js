const dataPref = `
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
export function teleport(to, spawn) {
  if (!check()) return;
  if (to == "town-square") { to = "old-town-square"; }
  var ld = main.assetManager.levelDataCache;
  ld.set("town-square", ld.get(to))
  const lvlId = "town-square"
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
`;
function patchData(data) {
    return dataPref+data
        .replace(/(?<=this\.networkClient ?= ?)/, "setMain(this)||")
        .replace(/(?=open_devlog_terminal:)/, `
mm_enter: () => {
  console.log("Travelling");
  teleport("mm_test");
},
`)
;
}
