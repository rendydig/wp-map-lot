import { useState } from "../renderhtml.js"
import { lotDataSample, mapController } from "../utils/mapUtils/mapController.js";

export const useMap = (mapID) => {
    const [map,
        setMap] = useState(null);
    const [lotList,
        setLotList] = useState({})
    const [inspectorData,
        setInspectorData] = useState(null)
    const [lastId,
        setLastId] = useState(0)

    // console.log("last id ", { lastId })
    const onDraw = (event, drawnMapItems, map) => {
        const layer = event.layer;
        let data = {
            ...lotDataSample
        }
        // console.log({setLastId})
        setLastId((lastId) => {
            const curLastId = lastId + 1;
            data['id'] = curLastId;
            return curLastId;
        })

        console.log("data", { data })
        data.latLangs = layer.getLatLngs();
        const layerType = event.layerType;
        const centerPos = layer
            .getBounds()
            .getCenter();
        // var newMarker = new L.marker(markerPos);
        let iconText = new L.marker(centerPos, {
            icon: L.divIcon({
                iconSize: [
                    16, 16
                ],
                className: `text-labels ${data.availability}`, // Set class for CSS styling
                html: data.id
            })
        })
        const fGroup = L
            .featureGroup()
            .addTo(drawnMapItems)
        layer.setStyle({ fillColor: "yellow", color: "green" })
        layer.addTo(fGroup)
        // newMarker.addTo(fGroup)
        iconText.addTo(fGroup)

        fGroup.on("click", () => {
            console.log("data here ", { data })
            onLotClick(data.id)
        })
        fGroup.bindPopup(`<b>${data.lotName}</b><br/>` + `<b class="popup-text ${data.availability}">${data.availability}</b>`, { className: 'popup-with-no-events' });
        fGroup.on("mouseover", function (e) {
            this.openPopup();
        })
        fGroup.on('mouseout', function (e) {
            this.closePopup();
        });
        data.fGroup = fGroup;
        data.iconText = iconText;

        setLotList((ltList) => {
            console.log({ ltList, data })
            ltList[data.id] = data
            console.log({ ltList })
            // ltL[data.id] = data;
            return ltList
            // return { ...lotList }
        })
        // fGroup.addLayer(layer) fGroup.addLayer(newMarker) drawnItems.addLayer(layer);
    }
    const LControl = (drawnMapItems) => {
        return new L
            .Control
            .Draw({
                edit: {
                    featureGroup: drawnMapItems,
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
                    simpleshape: true
                }
            })
    };

    const onLotClick = (lotId) => {
        let lotListItem;
        setLotList(lotList => {
            lotListItem = lotList;
            return lotList
        })

        setInspectorData(() => {
            return lotListItem[lotId]
        })
        console.log("lot is clicked")
    }
    if (!map) {

        const interval = setInterval(() => {
            const isMapDivAvailable = document.getElementById(mapID);

            if (isMapDivAvailable) {
                const mapData = mapController({
                    mapID,
                    lotList,
                    setLotList,
                    inspectorData,
                    setInspectorData,
                    onLotClick,
                    onDraw,
                    LControl,
                    setLastId
                })

                setMap(mapData)
                clearInterval(interval)
            }
        }, 300);
    }

    return { map, lotList, inspectorData, setLotList, setInspectorData };

}