import { useState, html } from '../renderhtml.js';

const LotsPanel = (props) => {
    const { lotList } = props;

    const lotsComponent = Object.keys(lotList).map(lotId => {
        const lot = lotList[lotId]
        return html`<tr><td>${lot.id}</td><td>${lot.lotName}</td></tr>`
    });
    console.log({ lotsComponent })
    return html`<div id="lots-panel">
       <h2>Lot list</h2>
       <table style="width:100%;">
       ${lotsComponent}
       </table>
    </div>`;
}

export default LotsPanel
