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
export function teleport(to) {
  if (!check()) return;
  main.loadLevel(to)
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
