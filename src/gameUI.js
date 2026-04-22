function testUI() {
    const parent = document.getElementById("root").firstElementChild;
    const main = document.createElement("div");
    main.classList.add(LABLS.overlay);

    let newelm = document.createElement("div");
    newelm.classList.add(LABLS.dialogueWrapper);
    main.appendChild(newelm);

    let portrait = document.createElement("div");
    portrait.classList.add(LABLS.portraitContainer);
    newelm.appendChild(portrait);
    let portrait2 = document.createElement("img");
    portrait2.classList.add(LABLS.portrait);
    portrait2.src = "/assets/sprites/npcs/poobert/idle.webp";
    portrait2.alt = "Poobert";
    portrait.appendChild(portrait2);

    let newelm2 = document.createElement("div");
    newelm2.classList.add(LABLS.container);
    newelm.appendChild(newelm2);

    let nametag = document.createElement("div");
    nametag.classList.add(LABLS.nameTag);
    nametag.innerText = "Poobert"
    newelm2.appendChild(nametag);

    let textbox = document.createElement("div");
    textbox.classList.add(LABLS.textBox);
    newelm2.appendChild(textbox);

    let text = document.createElement("div");
    text.classList.add(LABLS.text);
    text.innerText = "Hello! How are you?";
    textbox.appendChild(text);

    let actions = document.createElement("div");
    actions.classList.add(LABLS.actions);
    textbox.appendChild(actions);
    let actions2 = document.createElement("div");
    actions2.classList.add(LABLS.prompt);
    actions2.innerText = "Press Space to continue";
    actions.appendChild(actions2);

    parent.insertBefore(main, parent.lastElementChild)
}
