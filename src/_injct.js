function modifyJSON(url, js) {
    //console.log(js)
    if (url.includes("town-square")) {
        js.objects.push({
            id: portal,
            action: { label: "Travel", type: "mm_enter" },
            rotation: 0.4,
            scale: 1.2,
            type: portal,
            x: 0,
            z: 2,
        })
    }
    if (js.npcs && js.npcs.length > 0 && 'id' in js.npcs[0]) {
        js.npcs.map(npc=>{
            var labl;
            if (npc.name.startsWith("~")) {
                labl = npc.name.slice(1)
            } else {
                labl = "talk to "+npc.name
            }
            js.objects.push({
                ...npc, type: npc.sprite,
                action: { label: labl, type: "mm_npc", data: npc },
            })
        })
        js.npcs = []
    }
}

inst = null
function hook() {
    document.addEventListener("DOMContentLoaded", () => {
        // Do stuff with the index file
        idx = document.head.innerHTML.indexOf("index")
        file = document.head.innerHTML.slice(idx,document.head.innerHTML.indexOf(".", idx)) + ".js"
        import('/assets/'+file).then(module => {
            for (o in module) {
                ob = module[o]
                if ("getInstance" in ob) {
                    proto = ob.prototype

                    oldgsi = proto.getSpriteIds
                    proto.getSpriteIds = function () {
                        return oldgsi.call(this).concat(Object.keys(MANIF.sprites))
                    }
                    oldgsd = proto.getSpriteDefinition
                    proto.getSpriteDefinition = function (obj) {
                        if (obj in MANIF.sprites) {
                            return MANIF.sprites[obj];
                        }
                        return oldgsd.call(this, obj);
                    }
                    oldload = proto._loadEssential
                    var init = true
                    proto._loadEssential = async function (...args) {
                        await oldload.call(this, ...args)
                        if (!this.levelDataPromises.get("old-town-square")) {
                            const dat = this.getLevelData("town-square")
                            if (dat === null) {
                                const ts = this.levelDataPromises.get("town-square")
                                if (ts) {
                                    ts.then(obj=>{
                                        this.levelDataCache.set("old-town-square", obj)
                                    })
                                }
                            } else {
                                this.levelDataCache.set("old-town-square", dat)
                            }
                        }
                        if (init) {
                            init = false
                            for (const [nam, conts] of Object.entries(MANIF.sprites)) {
                                try {
                                    this.textures.set(nam, await this.getOrLoadTexture(conts.path));
                                } catch (t) {
                                    console.warn(`[MoreMorp] [deferred] Failed to load sprite "${nam}":`, t),
                                    this.textures.set(nam, this.createFallbackTexture("MM"+nam));
                                }
                            }
                        }
                    }
                    console.log("[MoreMorp] Successfully injected custom objects!")
                    return;
                }
            }
            console.error("[MoreMorp] Unable to find an instanceable object in the module!")
        });
    })
}
