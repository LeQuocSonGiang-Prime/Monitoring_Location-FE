import { MapContainer, TileLayer, useMap, Marker, Popup } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import "leaflet/dist/leaflet.css";
import { useState, useEffect } from "react";
import L, { Icon } from "leaflet";
//import SearchBox from "./completeAddress/SearchBox";

import config_map from "./config_map";
import FindPlace from "./findPlace";
import RoutingMachine from "./RoutingMachine";

// function ResetCenterView(props) {
//   const { placeSelector } = props;
//   const map = useMap();
//   useEffect(() => {
//     if (placeSelector) {
//       map.setView(
//         L.latLng(placeSelector?.lat, placeSelector?.lng),
//         map.getZoom(),
//         { anime: true }
//       );
//     }
//   }, [placeSelector]);

//   return null;
// }

export default function Maps() {
  const [center, setCenter] = useState({ lat: 10.870019, lng: 106.77621 });
  // const [placeSelector, setPlaceSelector] = useState();
  // const locationSelector = { lat: placeSelector?.lat, lng: placeSelector?.lon };



  // useEffect(() => {
  //   setCenter(locationSelector);
  // }, [placeSelector]);

  return (
    <div className="map-container">
      <MapContainer
        zoom={13}
        scrollWheelZoom={true}
        center={center}
        zoomControl={false}
      >
        <TileLayer
          attribution={config_map.maptitler.attribution}
          url={config_map.maptitler.url}
        />

        {/* {placeSelector && (
          <Marker position={locationSelector} icon={iconMarker}>
            <Popup>
              A pretty CSS3 popup. <br /> Easily customizable.
            </Popup>
          </Marker>
        )} */}
        {/* {placeSelector && <ResetCenterView placeSelector={locationSelector} />} */}
        <FindPlace />
        <RoutingMachine />
        {/* Search Location */}
      </MapContainer>
      {/* <SearchBox className="search-box" setPlaceSelector={setPlaceSelector} /> */}
    </div>
  );
}

const iconMarker = new Icon({
  iconUrl: require("./icon/placeholder.png"),
  iconSize: [35, 35],
  popupAnchor:[0,-15]
});
L.Marker.prototype.options.icon= iconMarker;