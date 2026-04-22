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

function networkMove() {
  if (localStorage.getItem("lastLevelId") == "town-square" && !getCurrentLvl()[1]) {
    return false
  }
  return true
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
async function loadLevel(lvlId, spawn) {
  await clearLevel()
  await main.loadLevel(lvlId, spawn)

  const lvl = getCurrentLvl()[0]
  var goto = null
  for (const spn in lvl.spawns) {
    if (spn.tag == spawn) {
      goto = spn
    }
  }
  if (goto === null) {
    goto = lvl.spawn
  }
  tele(goto)

  main.inputEnabled = true
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


function nxtNpcDialog(npc, id) {
  if (id == "") return;
  for (const d of npc.dialogueTree) {
    if (d.id == id) {
      const nt = d.nodeType || "npc";
      if (nt == "npc") {
        if (d.text.startsWith("~~ACTION")) {
          // Split by newline
          d.text.split(String.fromCharCode(10)).forEach(txt=>{
            if (txt.startsWith("~")) checkApply({action: {type: txt.slice(1)}})
          })
          return;
        }
        NpcDialog({ name: npc.name, img: npc.sprite+".webp" }, d.text, ()=>{
          nxtNpcDialog(npc, d.nextNodeId)
        })
      } else if (nt == "player") {
        Choices(d.choices.map(c=>{ return c.label }), idx=>{
          nxtNpcDialog(npc, d.choices[idx].nextNodeId)
        })
      } else {
        console.warn("[MoreMorp] Unknown npc action: "+nt)
      }
      break;
    }
  }
}
function runNpc(npc) {
  if (!npc.dialogueTree || npc.dialogueTree.length == 0) return;
  nxtNpcDialog(npc, npc.dialogueTree[0].id)
}


function checkApply(obj) {
  if (obj.action.type.startsWith("mm_")) {
    let spl = obj.action.type.split("_").slice(1)
    if (spl[0] == "enter") {
      teleport("mminit", "default")
    } else if (spl[0] == "exit") {
      teleport("town-square", "")
    } else if (spl[0] == "npc") {
      runNpc(obj.action.data)
    } else {
      console.warn("[MoreMorp] Unknown object action: "+spl[0])
    }
    return "everythings_fine"
  }
}
