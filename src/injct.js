function modifyJSON(url, js) {
    //console.log(url, js);
    if (url.includes("town-square")) {
        js.objects.push({
            id: "9999999999999_aaaaaaa",
            // action?
            rotation: 0.4,
            scale: 1.2,
            type: "1771541102415_smgqcvx", // cidery
            x: -8,
            z: -2,
        })
    }
}

function hook() {}
