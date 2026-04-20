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

async function clearLevel() {
  main.npcs.forEach((e) => {
    main.scene.remove(e.mesh), main.disposeObject(e.mesh);
  })
  main.npcs.clear()
  main.interactableSprites.clear()
  main.nearbySprite = null
  main.onNearbySpriteChange?.(null)
  main.activeZoneIds.clear()
}
async function afterLoadLevel() {
  // WIP
  /*const curLvl = main.levelLoader.currentLevel
  curLvl.npcs.forEach(npc=>{
    main.npcs.set(npc.id, {...npc, mesh: main.createNPCSprite(npc.sprite)})
  })*/
}
async function loadLevel(lvlId, spawn) {
  await clearLevel()
  await main.loadLevel(lvlId, spawn)
  main.inputEnabled = true
  await afterLoadLevel()
  main.onAfterLevelTransition()
}
export async function teleport(to, spawn) {
  if (!check()) return;
  await main.assetManager.ensureEssential(to)
  console.log("[MoreMorp] Teleporting to", to, spawn)
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
        l?.(!0), await loadLevel(lvlId, spawn);
    },
    () => {
        l?.(!1);
    }
  )
}
