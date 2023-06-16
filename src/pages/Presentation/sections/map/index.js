import { MapContainer, TileLayer } from "react-leaflet";
import "leaflet-control-geocoder/dist/Control.Geocoder.css";
import "leaflet-control-geocoder/dist/Control.Geocoder.js";

import "leaflet/dist/leaflet.css";
import { useState, useRef } from "react";
import L, { Icon } from "leaflet";
import ReactDOM from "react-dom";

import config_map from "./config_map";
import FindPlace from "./findPlace";
import RoutingMachine from "./RoutingMachine";
import LocationUser from "./LocationUser";
import PlaceHistory from "./PlaceHistory";
import fullscreenIcon from "pages/Presentation/sections/map/icon/Nofull-screen.png";
import closeFullscreenIcon from "pages/Presentation/sections/map/icon/switch-to-full-screen-button.png";
import ViewListPerson from "./ListPerson";

//import { FullPage, Slide } from "react-full-page";

export default function Maps() {
  //const [center, setCenter] = useState({ lat: 10.870019, lng: 106.77621 });
  const center = { lat: 10.870019, lng: 106.77621 };
  //  const [position, setPosition] = useState(null);
  //   const map = useMap();

  const iconWidth = 35;
  const iconHeight = 35;
  const [isFullscreen, setIsFullscreen] = useState(false);
  const mapRef = useRef(null);

  const toggleFullscreen = () => {
    setIsFullscreen(!isFullscreen);
  };

  const iconMarker = new Icon({
    iconUrl: require("./icon/placeholder.png"),
    iconSize: [iconWidth, iconHeight],
    popupAnchor: [0, -15],
    iconAnchor: [iconWidth / 2, iconHeight],
  });
  L.Marker.prototype.options.icon = iconMarker;

  const renderMap = () => {
    if (isFullscreen) {
      return ReactDOM.createPortal(
        <div className="map-container" style={{ inset: "0", zIndex: "900", position: "fixed" }}>
          <button
            onClick={toggleFullscreen}
            style={{ zIndex: "999", position: "fixed", left: "10px", top: "10px", border: "none" }}
          >
            <img
              src={fullscreenIcon}
              alt="Exit Fullscreen"
              style={{ width: "20px", height: "20px" }}
            />
          </button>
          <MapContainer
            zoom={13}
            scrollWheelZoom={true}
            center={center}
            zoomControl={false}
            ref={mapRef}
            style={{ width: "100%", height: "100%" }}
          >
            {/* config map */}
            <TileLayer
              attribution={config_map.maptitler.attribution}
              url={config_map.maptitler.url}
            />

            {/* <MarkerCustomize latitude={10.870946} longitude={106.772219} icon={iconMarker}/> */}

            <RoutingMachine />
            <LocationUser />
            <PlaceHistory />
            <FindPlace />
          </MapContainer>
        </div>,
        document.getElementById("root")
      );
    } else {
      return (
        <div
          className="map-container"
          style={{
            width: "100%",
            height: "500px",
            display: "flex",
            justifyContent: "center",
            marginTop: "100px",
          }}
        >
          <div
            style={{
              height: "100%",
              position: "relative",
            }}
          >
            <button
              onClick={toggleFullscreen}
              style={{
                zIndex: "999",
                position: "absolute",
                left: "10px",
                top: "10px",
                border: "none",
              }}
            >
              <img
                src={closeFullscreenIcon}
                alt="Exit Fullscreen"
                style={{ width: "20px", height: "20px" }}
              />
            </button>
            <MapContainer
              zoom={13}
              scrollWheelZoom={true}
              center={center}
              zoomControl={false}
              ref={mapRef}
              style={{ width: "800px", height: "100%" }}
            >
              {/* config map */}
              <TileLayer
                attribution={config_map.maptitler.attribution}
                url={config_map.maptitler.url}
              />

              {/* <MarkerCustomize latitude={10.870946} longitude={106.772219} icon={iconMarker}/> */}

              {/* <RoutingMachine /> */}
              <LocationUser />
              <PlaceHistory />
              <FindPlace />
            </MapContainer>
          </div>
          <ViewListPerson />
        </div>
      );
    }
  };

  return renderMap();
}
