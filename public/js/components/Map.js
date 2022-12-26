import { h, Component, render } from 'https://unpkg.com/preact?module';
import htm from 'https://unpkg.com/htm?module';
import { useMap } from '../hooks/useMap.js';
import { useState } from '../renderhtml.js';
import { onDrawCreated } from '../utils/mapUtils/onDrawCreated.js';
import RightPanel from './RightPanel.js';
const html = htm.bind(h);

const Map = (props) => {
    const { map, lotList, setLotList, inspectorData , setInspectorData} = useMap("divmap")
    let rightPanel = null;
    if (map) {
        rightPanel = RightPanel({ lotList,setLotList, inspectorData , setInspectorData})
    }
    return html`<div id="map-container">
        <div id="divmap"></div> ${rightPanel}
    </div>
    `;
}

export default Map
