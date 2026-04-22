//console.log(LABLS)
var then;

function slowread(txt) {
    function out(e) {
        var i = 0;
        const id = setInterval(()=>{
            e.innerText = txt.slice(0, i++)
            if (i > txt.length) clearInterval(id);
        }, 10);

        function handler(event) {
            if (event.code !== 'Space') { return; }
            if (i <= txt.length) {
                i = txt.length+1;
                e.innerText = txt;
                clearInterval(id);
                return;
            }
            then();
            document.removeEventListener("keydown", handler);
        }
        document.addEventListener("keydown", handler);
    }
    return out
}

function el({ tag, cls, text, src, alt, fn } = {}, children = []) {
    const e = document.createElement(tag||"div");
    if (cls) e.className = cls;
    if (text) e.innerText = text;
    if (src) e.src = src;
    if (alt) e.alt = alt;
    children.forEach(child => e.appendChild(child));
    if (fn) fn(e);
    return e;
}

function buildUI(thn, childr) {
    if (document.getElementsByClassName("OVERLAY").length > 0) return;
    const parent = document.getElementById("root").firstElementChild;
    const container = document.createElement("div");
    container.className = LABLS.overlay + " OVERLAY";
    main.inputEnabled = false
    then = ()=>{
        main.inputEnabled = true
        container.remove()
        if (thn) thn()
    }

    childr.forEach(child => container.appendChild(child));

    parent.insertBefore(container, parent.lastElementChild)
}

function NPCDialog(name, img, txt, thn) {
    buildUI(thn, [
        el({ cls: LABLS.dialogueWrapper }, [
            el({ cls: LABLS.portraitContainer }, [
                el({
                    tag: "img",
                    cls: LABLS.portrait,
                    src: img,
                    alt: name
                })
            ]),
            el({ cls: LABLS.container }, [
                el({ cls: LABLS.nameTag, text: name }),
                el({ cls: LABLS.textBox }, [
                    el({ cls: LABLS.text, fn: slowread(txt) }),
                    el({ cls: LABLS.actions }, [
                        el({ cls: LABLS.prompt, text: "Press Space to continue" })
                    ])
                ])
            ])
        ])
    ])
}

function testUI(thn) {
    NPCDialog("Poobert", "/assets/sprites/npcs/poobert/idle.webp", "Hello! How are you?", thn)
}
