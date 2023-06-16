import React, { useState, useEffect, useRef } from "react";
import "./style.css";
import axios from "axios";
import iconAddPerson from "pages/Presentation/sections/map/icon/addperson.png";
import Button from "@mui/material/Button";
import List from "@mui/material/List";
import ListItem from "@mui/material/ListItem";
import ListItemButton from "@mui/material/ListItemButton";
import ListItemText from "@mui/material/ListItemText";
import ListItemAvatar from "@mui/material/ListItemAvatar";
import Avatar from "@mui/material/Avatar";
import TextField from "@mui/material/TextField";
import OverlaySpin from "./OverlaySpin";
import DeleteIcon from "@mui/icons-material/Delete";
import TokenIcon from "@mui/icons-material/Token";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import Typography from "@mui/material/Typography";
import Popover from "@mui/material/Popover";
import PopupState, { bindTrigger, bindPopover } from "material-ui-popup-state";
import Box from "@mui/system/Box";
import Snackbar from "@mui/material/Snackbar";

function ViewListPerson() {
  const [listPerson, setListPerson] = useState([]);
  const [isAddPerson, setIsAddPerson] = useState(false);
  const inputRef = useRef(null);
  const [isLoading, setIsLoading] = useState(false);
  const [namePerson, setNamePerson] = useState("");
  const [tokenPerson, setTokenPerson] = useState("");
  const [state, setState] = React.useState({
    open: false,
    vertical: "bottom",
    horizontal: "left",
  });
  const { vertical, horizontal, open } = state;

  const handleClose = () => {
    setState({ ...state, open: false });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:8558/monitoring-location/api/v1/person/1");
      setListPerson(response.data.data);
    } catch (error) {
      console.error(error);
    }
  };
  const toggleAddPerson = () => {
    setIsAddPerson(!isAddPerson);
  };
  const handleBlur = () => {
    console.log(isAddPerson);
    setIsAddPerson(false);
  };

  const handleKeyPress = (event) => {
    if (event.key === "Enter") {
      toggleAddPerson();
      setIsLoading(true);
      handleAddPerson();
      setNamePerson("");
    }
  };

  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }

  //delete Person
  const handleConfirmDeletePerson = async (person) => {
    console.log("id person delete ", person.id);
    setIsLoading(true);
    try {
      await axios.delete(`http://localhost:8558/monitoring-location/api/v1/person/${person.id}`);
      await sleep(500); // tam dung 0.5s
      fetchData();
      setIsLoading(false);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  //Add person
  const handleAddPerson = async () => {
    const dataSend = {
      user: {
        id: "3",
      },
      name: namePerson,
    };

    try {
      const response = await axios.post(
        "http://localhost:8558/monitoring-location/api/v1/person/insert",
        dataSend
      );
      await sleep(500); // tam dung 0.5s
      setTokenPerson(response.data.data.token);
      setIsLoading(false);
      fetchData();
      console.log("token", tokenPerson);
    } catch (error) {
      console.error(error);
      setIsLoading(false);
    }
  };

  // Copy Token
  const handleCopyToken = (person) => {
    const token = person.token;
    const inputElement = document.createElement("input");
    inputElement.value = token;
    document.body.appendChild(inputElement);

    inputElement.select();
    document.execCommand("copy");
    document.body.removeChild(inputElement);
    setState({ open: true, ...state });
    console.log("open", open);
  };

  return (
    <div
      style={{
        width: "350px",
        margin: "50px 0 50px 30px",
        position: "relative",
        display: "flex",
        flexDirection: "column",
        alignItems: "center",
        backgroundColor: "#e5e5e5",
        borderRadius: "10px",
      }}
    >
      <h2>Danh sách theo dõi</h2>

      <div
        style={{
          width: "100%",
          padding: "20px",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
          borderRadius: "10px",
          overflow: "hidden",
        }}
      >
        <List dense sx={{ width: "300px", maxWidth: 360, bgcolor: "background.paper" }}>
          {listPerson.map((value) => {
            return (
              <ListItem key={value.id}>
                <ListItemButton color="danger">
                  <ListItemAvatar>
                    <Avatar
                      alt={value.name.charAt(0)}
                      src={`/static/images/avatar/${value + 1}.jpg`}
                    />
                  </ListItemAvatar>
                  <ListItemText primary={value.name} />
                  <span className="wrap-icon">
                    <ModeEditIcon />
                  </span>

                  <span className="wrap-icon">
                    <TokenIcon color="success" onClick={() => handleCopyToken(value)} />
                  </span>

                  <PopupState variant="popover" popupId="demo-popup-popover">
                    {(popupState) => (
                      <div>
                        <span className="wrap-icon" {...bindTrigger(popupState)}>
                          <DeleteIcon color="error" />
                        </span>
                        <Popover
                          {...bindPopover(popupState)}
                          anchorOrigin={{
                            vertical: "bottom",
                            horizontal: "center",
                          }}
                          transformOrigin={{
                            vertical: "top",
                            horizontal: "center",
                          }}
                        >
                          <Box
                            sx={{ p: 2, fontSize: "12px" }}
                            style={{ backgroundColor: "rgb(218, 217, 217)" }}
                          >
                            <Typography sx={{ mb: 1, fontSize: "18px" }}>Xác nhận xóa?</Typography>
                            <Button
                              variant="contained"
                              color="error"
                              onClick={popupState.close}
                              sx={{ p: 1 }}
                            >
                              Hủy
                            </Button>
                            <Button
                              sx={{ ml: 1, p: 1 }}
                              variant="contained"
                              color="success"
                              onClick={() => handleConfirmDeletePerson(value)}
                            >
                              Xác nhận
                            </Button>
                          </Box>
                        </Popover>
                      </div>
                    )}
                  </PopupState>
                </ListItemButton>
              </ListItem>
            );
          })}
        </List>

        <Button
          variant="contained"
          color="success"
          style={{ margin: "20px" }}
          onClick={toggleAddPerson}
        >
          <span style={{ marginRight: "5px" }}>
            <img src={iconAddPerson} style={{ width: "20px" }} />
          </span>
          Thêm
        </Button>

        {isAddPerson && (
          <TextField
            id="filled-basic"
            value={namePerson}
            label="Tên người bị giám sát"
            variant="filled"
            onBlur={handleBlur}
            ref={inputRef}
            onKeyDown={handleKeyPress}
            onChange={(e) => setNamePerson(e.target.value)}
          />
        )}
        {isLoading && <OverlaySpin />}
      </div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        open={open}
        onClose={handleClose}
        message="Copy"
        key={vertical + horizontal}
      />
    </div>
  );
}

export default ViewListPerson;
