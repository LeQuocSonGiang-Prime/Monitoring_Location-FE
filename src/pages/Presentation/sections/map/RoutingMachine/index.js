import { useEffect, useState } from "react";
import "leaflet-routing-machine";
import "leaflet-routing-machine/dist/leaflet-routing-machine.css";
import { useMap } from "react-leaflet";
import L from "leaflet";
import axios from "axios";

function RoutingMachine() {
  const [data, setData] = useState([]);

  const map = useMap();
  let points = [
    // L.latLng(10.870946, 106.772219), // Tọa độ điểm 1
    // L.latLng(10.867195, 106.789385), // Tọa độ điểm 2
    // L.latLng(10.854467, 106.781703), // Tọa độ điểm 3
    // Thêm các tọa độ của các điểm khác tại đây
  ];

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(
          "http://localhost:8558/monitoring-location/api/v1/location/2"
        );
        setData(response.data);
        console.log(response);
      } catch (error) {
        console.error(error);
      }
    };

    fetchData();
  }, []);

  useEffect(() => {
    const responseData = data.data;

    console.log(responseData); // Kiểm tra giá trị của responseData

    if (Array.isArray(responseData)) {
      const coordinates = responseData.map((item) => L.latLng(item.latitude, item.longitude));
      points = coordinates;
      console.log(coordinates); // Hiển thị mảng chứa giá trị latitude và longitude
    } else {
      console.log("Dữ liệu không hợp lệ"); // Thông báo khi dữ liệu không phải là mảng
    }

    const customIcon = L.icon({
      iconUrl: require("../icon/placeholder.png"),
      iconSize: [35, 35],
      popupAnchor: [0, -15],
    });

    const routingControl = L.Routing.control({
      waypoints: points,
      lineOptions: {
        styles: [
          {
            color: "blue",
            weight: 4,
            opacity: 0.5,
          },
        ],
      },
      routeWhileDragging: false,
      geocoder: L.Control.Geocoder.nominatim(),
      addWaypoints: true,
      draggableWaypoints: false,
      fitSelectedRoutes: true,
      showAlternatives: false,
      createMarker: function (i, waypoint) {
        return L.marker(waypoint.latLng, {
          icon: customIcon,
          draggable: false, // Không cho phép kéo thả marker
        });
      },
    }).addTo(map);

    const routingContainer = routingControl.getContainer();
    routingContainer.style.display = "block";
  }, [data, map]);

  return null;
}

export default RoutingMachine;
