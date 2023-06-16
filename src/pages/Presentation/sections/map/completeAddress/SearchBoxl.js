import React, { useEffect } from "react";
import { OutlinedInput } from "@mui/material";
import "./SearchBox.css";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemIcon from "@mui/material/ListItemIcon";
import ListItemText from "@mui/material/ListItemText";

const NOMINATIM_BASE_URL = "https://nominatim.openstreetmap.org/search?";

export default function SearchAddress(props) {
  const [searchText, setSearchText] = React.useState("");
  const [listPlace, setListPlace] = React.useState([]);
  const { setPlaceSelector } = props;
  const HandleChangeValue = (e) => {
    if (searchText == "") {
      setListPlace([]);
    }
    setSearchText(e.target.value);
    const params = {
      q: e.target.value,
      format: "json",
      addressdetails: 1,
      polygon_geojson: 0,
    };

    const querys = new URLSearchParams(params).toString();
    const requestOptions = {
      method: "get",
      redirect: "follow",
    };

    fetch(`${NOMINATIM_BASE_URL}${querys}`, requestOptions)
      .then((response) => response.text())
      .then((result) => {
        setListPlace(JSON.parse(result));
      })
      .catch((err) => console.log("err: ", err));
  };

  

  return (
    <div
      style={{
        margin: "5px",
        position: "absolute",
        background: "#fff",
        width: "450px",
      }}
      className=" in-front-of-map"
    >
      <OutlinedInput
        className="in-front-of-map input-search-location"
        placeholder="Tìm kiếm trên Monitor Map"
        type="text"
        value={searchText}
        onChange={(e) => {
          HandleChangeValue(e);
        }}
        sx={{ padding: 0 }}
      />
      <List className="in-front-of-map" sx={{ padding: 0 }}>
        {listPlace.map((a) => (
          <ListItem sx={{ padding: 0 }} disablePadding key={a?.osm_id}>
            <ListItemButton
              sx={{ padding: "5px 15px" }}
              className="button-no-margin"
              onClick={() => {
                setPlaceSelector(a)
              }}
            >
              <ListItemIcon>
                <img
                  src={require("../icon/iconsearching.png")}
                  style={{ width: "30px", height: "30px" }}
                />
              </ListItemIcon>
              <ListItemText
                primary={a?.display_name}
                sx={{
                  whiteSpace: "nowrap",
                  overflow: "hidden",
                  textOverflow: "ellipsis",
                  display: "inline-block",
                  maxWidth: "calc(100% - 56px)",
                }}
              />
            </ListItemButton>
          </ListItem>
        ))}
      </List>
    </div>
  );
}
