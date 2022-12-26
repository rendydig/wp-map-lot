import { useState, html } from '../renderhtml.js';
import LotsPanel from './LotsPanel.js';

const RightPanel = (props) => {
    const { lotList, setLotList, inspectorData, setInspectorData } = props;
    // const { curData, setCurData } = useState(null);
    console.log({ inspectorData, lotList })
    if (!inspectorData) return html`<div id="right-panel">
    <${LotsPanel} lotList=${lotList}/>
    </div>`
    const handleChange = (event) => {
        const target = event.target;
        const fieldName = target.name;
        const value = target.value;
        lotList[inspectorData.id][fieldName] = value;
        lotList[inspectorData.id]['iconText'].setIcon(L.divIcon({
            iconSize: [
                16, 16
            ],
            className: `text-labels ${lotList[inspectorData.id].availability}`, // Set class for CSS styling
            html: inspectorData.id
        }))
        lotList[inspectorData.id].fGroup._popup.setContent(
            `<b>${lotList[inspectorData.id].lotName}</b><br/>
            <b class="popup-text ${lotList[inspectorData.id].availability}">${lotList[inspectorData.id].availability}</b>`
        )
        setLotList({ ...lotList })
        console.log(event)
    }
    const onRemove = () => {
        lotList[inspectorData.id].fGroup.remove();
        setInspectorData(null)
        delete lotList[inspectorData.id];
        console.log("lot List", lotList)
        setLotList({ ...lotList })
    }
    const lotInspector = html`
       <div class="inspector-panel">
            <h2> Lot Info </h2>
            <div id="lot-lotName">
                <input name="lotName" onChange=${handleChange} value=${inspectorData.lotName}/>
            </div>
            <div id="lot-landSize">${inspectorData.landSize}</div>
            <div id="lot-frontSize">${inspectorData.frontSize}</div>
            <div id="lot-precint">${inspectorData.precint}</div>
            <div id="lot-availability">
            <select name="availability" value=${inspectorData.availability} onChange=${handleChange}>
                <option value="sold">sold</option>
                <option value="available">available</option>
            </select></div>
            <div id="lot-price">${inspectorData.price}</div>
            <button onClick=${onRemove}>remove lot</button>
       </div>
    `;

    return html`<div id="right-panel">
       <${LotsPanel} lotList=${lotList}/>
       <hr/>
       ${lotInspector}
    </div>`;
}

export default RightPanel
