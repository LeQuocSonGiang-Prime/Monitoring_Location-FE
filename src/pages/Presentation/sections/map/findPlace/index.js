import { useMap } from "react-leaflet";
import L from "leaflet";
// import { useEffect } from "react";

function FindPlace() {
  const map = useMap();
  // useEffect(() => {
  L.Control.geocoder({
    defaultMarkGeocode: false,
  })
    .on("markgeocode", function (e) {
      var latlng = e.geocode.center;
      L.marker(latlng).addTo(map).bindPopup(e.geocode.name).openPopup();
      map.fitBounds(e.geocode.bbox);
    })
    .addTo(map);
  // }, []);
  return null;
}

export default FindPlace;
