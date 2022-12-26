export const lotDataSample = {
    price: "$10,000",
    lotName: "Lot Name",
    landSize: "900m2",
    frontSize: "20m",
    precint: "Parkside Precinct",
    availability: "sold",
    latLangs: [],
    id: 0

}

const inspect = (data, fGroup) => {

    const menuDiv = $("#inspector")
    const dataDiv = $(`
                <div id="lot-lotName">${data.lotName}</div>
                <div id="lot-landSize">${data.landSize}</div>
                <div id="lot-frontSize">${data.frontSize}</div>
                <div id="lot-precint">${data.precint}</div>
                <div id="lot-availability">${data.availability}</div>
                <div id="lot-price">${data.price}</div>
            `);
    const deleteButton = $('<button>delete</button>')
    const saveButton = $('<button>save</button>')
    menuDiv.html(dataDiv)
    menuDiv.children("div").attr('contenteditable', 'true');
    const onDelete = () => {
        fGroup.remove();
        menuDiv.html("");
        delete lotList[data.id]
    }
    const onSave = () => {
        const dt = ({
            lotName: $("#lot-lotName").html(),
            landSize: $("#lot-landSize").html(),
            frontSize: $("#lot-frontSize").html(),
            precint: $("#lot-precint").html(),
            availability: $("#lot-availability").html(),
            price: $("#lot-price").html(),
        })
        console.log({ f: fGroup._popup.getContent(), html: menuDiv.html() })
        const k = JSON.stringify(dt, null, 2);
        fGroup._popup.setContent(`<pre style="width: 200px; height:200px; overflow:auto;">${k}</pre>`)

    };
    deleteButton.on("click", onDelete)
    saveButton.on("click", onSave)
    menuDiv.append(deleteButton)
    menuDiv.append(saveButton)
}

export const mapController = ({ mapID, onDraw, LControl, setDrawnItems, setLastId }) => {
    const map = L.map(mapID, {
        maxZoom: 24,
        minZoom: 1,
        crs: L.CRS.Simple
    }).setView([0, 0], 1);

    const mapBounds = map.getBounds();
    const [imageWidth, imageHeight] = [1080, 829]

    const mapDiv = $(document.getElementById(mapID))
    const [mapDivHeight, mapDivWidth] = [mapDiv.height(), mapDiv.width()];
    const scale = imageHeight / mapDivHeight * 6;
    const [natW, natH] = [imageWidth / scale, imageHeight / scale]
    // map.setMaxBounds(new L.LatLngBounds([0, 0], [width, height]));
    const drawnMapItems = L.featureGroup().addTo(map)

    map.addControl(LControl(drawnMapItems));

    map.on(L.Draw.Event.CREATED, (event) => {

        onDraw(event, drawnMapItems, setLastId, map)
    });

    let imageUrl = 'https://kingbirdliving.com.au/wp-content/uploads/2022/05/lorekeet_sitemap_n.jpg'
    const mapCenter = map.getCenter();
    map.invalidateSize(true)

    let originPoint = map.latLngToContainerPoint(mapCenter);
    /* 2) Add the image pixel dimensions.
     * Positive x to go right (East).
     * Negative y to go up (North). 
     **/
    let nextCornerPoint = originPoint.add({ x: -natW, y: natH });
    /**
     *  3) Convert back into LatLng.
     */
    let nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);

    L.imageOverlay(imageUrl, [[natH / 2, natW / 2], nextCornerLatLng]).addTo(map);
    /**
     *  set zoom after adding image 
     **/
    map.setZoom(3)
    // L.marker(mapCenter).addTo(map);
    return map

}