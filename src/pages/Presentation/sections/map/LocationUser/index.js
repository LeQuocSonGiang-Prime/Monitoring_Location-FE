import { useState, useEffect } from "react";
import { Marker, Popup, useMap } from "react-leaflet";
import L, { Icon } from "leaflet";

function MarkerCustomize() {
  const [position, setPosition] = useState(null);
  const map = useMap();
  const iconWidth = 35;
  const iconHeight = 45;

  const iconMarker = new Icon({
    // iconUrl: require("../icon/userLocation.png"),
    iconUrl: require("pages/Presentation/sections/map/icon/userLocation.png"),
    iconSize: [iconWidth, iconHeight],
    popupAnchor: [0, -35],
    iconAnchor: [iconWidth / 2, iconHeight],
  });

  useEffect(() => {
    map.locate().on("locationfound", function (e) {
      setPosition(e.latlng);
      map.flyTo(e.latlng, map.getZoom());
      const radius = e.accuracy;
      const circle = L.circle(e.latlng, radius);
      circle.addTo(map);
    });
  }, [map]);

  return position === null ? null : (
    <Marker position={position} icon={iconMarker}>
      <Popup>You are here.</Popup>
    </Marker>
  );
}

export default MarkerCustomize;
