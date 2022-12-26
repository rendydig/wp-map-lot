$(document).ready(function () {
    loadMap();
});
const lotList = {};
const lotData = {
    price: "$10,000",
    lotName: "Lot Name",
    landSize: "900m2",
    frontSize: "20m",
    precint: "Parkside Precinct",
    availability: "sold",
    latLangs: [],
    id: 0

}
let lastId = 0;
const loadMap = function () {
    var map = L.map('map', {
        maxZoom: 24,
        minZoom: 1,
        crs: L.CRS.Simple
    }).setView([0, 0], 1);
    const mapBounds = map.getBounds(); console.log({ mapBounds })
    const [width, height] = [1080, 829]
    const mapDiv = $("#map")
    const [mapDivHeight, mapDivWidth] = [mapDiv.height(), mapDiv.width()];
    const scale = height / mapDivHeight * 6;

    const [natW, natH] = [width / scale, height / scale]
    // map.setMaxBounds(new L.LatLngBounds([0, 0], [width, height]));
    const drawnItems = L.featureGroup().addTo(map);

    map.addControl(new L.Control.Draw({
        edit: {
            featureGroup: drawnItems,
            poly: {
                allowIntersection: false
            },
            remove: false,
            edit: false
        },

        draw: {
            polyline: false,
            rectangle: false,
            circlemarker: false,
            circle: false,
            // marker: false,
            simpleshape: true,
        },
    }));

    const generateID = () => {
        const curLastId = lastId;
        lastId = curLastId + 1;
        return lastId;
    }
    map.on(L.Draw.Event.CREATED, function (event) {
        var layer = event.layer;


        const latLangs = "";
        // if(typeof(layer.getLatLng))
        const data = {
            ...lotData,
            id: generateID()
        }
        data.latLangs = layer.getLatLngs();
        const layerType = event.layerType;
        const info = "index info";
        const markerPos = layer.getBounds().getCenter();
        // var newMarker = new L.marker(markerPos);
        let iconText = new L.marker(markerPos, {
            icon: L.divIcon({
                iconSize: [16, 16],
                className: 'text-labels',   // Set class for CSS styling
                html: data.id
            })
        })
        const fGroup = L.featureGroup().addTo(drawnItems)
        layer.setStyle({
            fillColor: "yellow",
            color: "green"
        })
        layer.addTo(fGroup)
        // newMarker.addTo(fGroup)
        iconText.addTo(fGroup)

        fGroup.on("click", () => {
            inspect(data, fGroup)
            // fGroup.remove();
        })
        fGroup.bindPopup("<b> new info</b>");
        fGroup.on("mouseover", function (e) {
            this.openPopup();
        })
        fGroup.on('mouseout', function (e) {
            this.closePopup();
        });
        lotList[data.id] = data;
        // fGroup.addLayer(layer)
        // fGroup.addLayer(newMarker)
        // drawnItems.addLayer(layer);
    });

    var imageUrl = 'https://kingbirdliving.com.au/wp-content/uploads/2022/05/lorekeet_sitemap_n.jpg'
    const mapCenter = map.getCenter();
    map.invalidateSize(true)
    console.log({ mapCenter })
    var imageBounds = [
        [0, 0],
        [natH, natW]
    ];

    var originPoint = map.latLngToContainerPoint(mapCenter);
    /* 2) Add the image pixel dimensions.
     * Positive x to go right (East).
     * Negative y to go up (North). 
     **/
    var nextCornerPoint = originPoint.add({ x: -natW, y: natH });
    /**
     *  3) Convert back into LatLng.
     */
    var nextCornerLatLng = map.containerPointToLatLng(nextCornerPoint);

    var imageOverlay = L.imageOverlay(imageUrl, [[natH / 2, natW / 2], nextCornerLatLng]).addTo(map);
    /**
     *  set zoom after adding image 
     **/
    map.setZoom(3)
    // L.marker(mapCenter).addTo(map);

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