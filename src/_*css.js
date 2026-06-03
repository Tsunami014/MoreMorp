const CSS = [
    "_container_"
].map(it=>{
    const it2 = `[class^="${it}"]`
    return `${it2}, ${it2} *`
}).join(",") + `{
  -webkit-user-select: none;
  -moz-user-select: none;
  -ms-user-select: none;
  user-select: none;
}`
