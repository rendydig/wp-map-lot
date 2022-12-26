export const onDrawCreated = (event) => {
    var layer = event.layer;

    const data = {
        ...lotData,
        id: generateID()
    }
    data.latLangs = layer.getLatLngs();
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

    console.log("data", { data })
}