function slowread(txt) {
    function out(e) {
        var i = 0;
        const id = setInterval(()=>{
            e.innerText = txt.slice(0, i++)
            if (i > txt.length) clearInterval(id);
        }, 10);
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

function testUI() {
    const parent = document.getElementById("root").firstElementChild;

    const main = el({ cls: LABLS.overlay }, [
        el({ cls: LABLS.dialogueWrapper }, [
            el({ cls: LABLS.portraitContainer }, [
                el({
                    tag: "img",
                    cls: LABLS.portrait,
                    src: "/assets/sprites/npcs/poobert/idle.webp",
                    alt: "Poobert"
                })
            ]),
            el({ cls: LABLS.container }, [
                el({ cls: LABLS.nameTag, text: "Poobert" }),
                el({ cls: LABLS.textBox }, [
                    el({ cls: LABLS.text, fn: slowread("Hello! How are you?") }),
                    el({ cls: LABLS.actions }, [
                        el({ cls: LABLS.prompt, text: "Press Space to continue" })
                    ])
                ])
            ])
        ])
    ]);

    parent.insertBefore(main, parent.lastElementChild)
}
