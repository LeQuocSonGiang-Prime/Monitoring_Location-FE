import { useEffect, useState } from "react";
//import { useNavigate } from "react-router-dom";
import { Icon } from "leaflet";
import { Marker, Popup } from "react-leaflet";
import MarkerClusterGroup from "react-leaflet-cluster";
import "leaflet.markercluster/dist/MarkerCluster.css";
import "leaflet.markercluster/dist/MarkerCluster.Default.css";
// import { useNavigate } from "react-router-dom";
//import { fetchData } from "authentication/FetchData";
import axios from "axios";

function LocationHistory() {
  const [data, setData] = useState();
  const iconWidth = 25;
  const iconHeight = 25;
  // const navigate = useNavigate();

  const iconOffline = new Icon({
    iconUrl: require("../icon/locationPast1.png"),
    iconSize: [25, 25],
    popupAnchor: [0, -15],
    iconAnchor: [iconWidth / 2, iconHeight],
  });

  const iconOnline = new Icon({
    iconUrl: require("../icon/giphy (1).gif"),
    iconSize: [25, 60],
    popupAnchor: [0, -15],
    iconAnchor: [iconWidth / 2, iconHeight],
  });

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8558/monitoring-location/api/v1/location/1"
        );
        setData(response.data.data);
      } catch (error) {
        console.error(error);
        //    navigate("/monitoring-prime/authentication/sign-in");
      }
    };
    // const props = { link: "http://localhost:8558/monitoring-location/api/v1/location/1", navigate };
    // const datas = fetchData(props);
    const interval = setInterval(() => {
      fetchData();
    }, 3000); // Gọi API mỗi giây (1000 milliseconds)
    return () => {
      clearInterval(interval); // Xóa interval khi component unmount
    };
  }, []);

  const createClusterIcon = () => {
    return iconOffline;
  };

  const checkOnline = (e) => {
    const time = new Date(e);
    const timeDifference = 1 * 60 * 1000;
    const currentTime = new Date();
    if (time > currentTime - timeDifference) {
      return true;
    }
    return false;
  };

  let listLocationOffline = [],
    locationOnline;

  if (data != undefined) {
    data.map((e) => {
      if (!checkOnline(e.time)) {
        listLocationOffline.push(e);
      } else locationOnline = e;
    });
  }

  const renderClusterPopup = (cluster) => {
    const clusterMarkers = cluster.getAllChildMarkers();
    if (clusterMarkers && clusterMarkers.length > 0) {
      const minTime = clusterMarkers.reduce(
        (min, marker) => Math.min(min, marker.options.options.time.getTime()),
        Infinity
      );
      const maxTime = clusterMarkers.reduce(
        (max, marker) => Math.max(max, marker.options.options.time.getTime()),
        -Infinity
      );
      const minTimeFormatted = formatDate(minTime);
      const maxTimeFormatted = formatDate(maxTime);

      const popupContent = `${minTimeFormatted}<br>${maxTimeFormatted}
    `;

      const popupOptions = { closeButton: false };

      cluster.bindPopup(popupContent, popupOptions).openPopup();
    }
  };

  const formatDate = (e) => {
    const time = new Date(e);
    const timeString =
      time.getHours() +
      ":" +
      time.getMinutes() +
      " " +
      time.getDate() +
      "/" +
      (time.getMonth() + 1) +
      "/" +
      time.getFullYear();
    return timeString;
  };

  return (
    <>
      <MarkerClusterGroup
        chunkedLoading
        disableClusteringAtZoom={22}
        iconCreateFunction={createClusterIcon}
        onMouseOver={(e) => {
          const cluster = e.layer;
          cluster.bindPopup(renderClusterPopup(cluster));
          cluster.openPopup();
        }}
        onMouseOut={(e) => {
          const cluster = e.layer;
          cluster.unbindPopup();
          cluster.closePopup();
        }}
      >
        {listLocationOffline &&
          listLocationOffline.map((e) => (
            <Marker
              key={e.id}
              position={[e.latitude, e.longitude]}
              icon={iconOffline}
              options={{ time: new Date(e.time) }}
            >
              <Popup>{formatDate(e.time)}</Popup>
            </Marker>
          ))}
      </MarkerClusterGroup>
      {locationOnline && (
        <Marker
          key={locationOnline.id}
          position={[locationOnline.latitude, locationOnline.longitude]}
          icon={iconOnline}
        >
          <Popup>{formatDate(locationOnline.time)}</Popup>
        </Marker>
      )}
    </>
  );
}

export default LocationHistory;
