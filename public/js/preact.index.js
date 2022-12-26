import Map from "./components/Map.js"
import { render, html, useState } from "./renderhtml.js"

function App(props) {
    const c = { halo: "rendy" }
    const [name, setName] = useState(0)
    const dt = { dcom: [c], setName, name };
    const MyMap = Map(dt);
    return html`${MyMap}`;
}

render(html`<${App}/>`, document.getElementById("preact"));