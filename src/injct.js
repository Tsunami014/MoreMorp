const portal = "9999999999999_portall"
/// This function only adds the portal in the intro. All moremorp levels are handled elsewhere
function modifyJSON(url, js) {
    //console.log(url, js);
    if (url.includes("town-square")) {
        js.objects.push({
            id: portal,
            // action?
            rotation: 0.4,
            scale: 1.2,
            type: portal,
            x: -8,
            z: -2,
        })
    }
}

inst = null
function hook() {
    document.addEventListener("DOMContentLoaded", () => {
        idx = document.head.innerHTML.indexOf("index")
        file = document.head.innerHTML.slice(idx,document.head.innerHTML.indexOf(".", idx)) + ".js"
        import('/assets/'+file).then(module => {
            for (o in module) {
                ob = module[o]
                if ("getInstance" in ob) {
                    proto = ob.prototype

                    oldgsi = proto.getSpriteIds
                    proto.getSpriteIds = function () {
                        return oldgsi.call(this).concat(Object.keys(OBJS))
                    }
                    oldgsd = proto.getSpriteDefinition
                    proto.getSpriteDefinition = function (obj) {
                        if (obj.startsWith("999999999999")) {
                            const objspec = obj.split("_")[1]
                            return OBJS[objspec];
                        }
                        return oldgsd.call(this, obj);
                    }
                    oldload = proto._loadEssential
                    proto._loadEssential = async function (...args) {
                        await oldload.call(this, args)
                        for (const [nam, conts] of Object.entries(OBJS)) {
                            const e = "9999999999999_"+nam
                            try {
                                this.textures.set(e, await this.getOrLoadTexture(conts.path));
                            } catch (t) {
                                console.warn(`[MoreMorp] [deferred] Failed to load sprite "${e}":`, t),
                                this.textures.set(e, this.createFallbackTexture("MM"+nam));
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
