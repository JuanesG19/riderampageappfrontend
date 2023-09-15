import React, { useState } from "react";
import {
  Box,
  Divider,
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import SchemaIcon from "@mui/icons-material/Schema";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

import Cookies from "universal-cookie";
import "./SidebarStyles.css";
import { logOut } from "../../api/LoginService";
import AddCompetitorDialog from "../../pages/addCompetitorsDialog/AddCompetitorsDialog";

const Sidebar = ({ open, onClose }) => {
  const [addCompetitorDialogOpen, setAddCompetitorDialogOpen] = useState(false);
  const cookies = new Cookies();
  const navigate = useNavigate();

  const logout = async () => {
    const logout = await logOut();

    if (logout) {
      cookies.remove("userId");
      cookies.remove("loginTime");
      window.alert("Cierre de sesión exitoso");
      setTimeout(navigate("/"), 9000);
    } else {
      window.alert("Error cerrando sesión");
      setTimeout(navigate("/"), 9000);
    }
  };

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };

  const openAddCompetitorDialog = () => {
    setAddCompetitorDialogOpen(true);
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
      className="sidebarContainer"
    >
      <div />
      <div className="titleContainer">
        <p>MENU</p>
      </div>
      <List>
        <ListItem>
          <Link className="linkSidebar" to="/">
            <ListItemButton className="listSidebar">
              <ListItemIcon>
                <SchemaIcon />
              </ListItemIcon>
              Tablero Del Torneo
            </ListItemButton>
          </Link>
        </ListItem>

        <Divider />

        <ListItem>
          <ListItemButton
            className="listSidebar"
            onClick={openAddCompetitorDialog}
          >
            <ListItemIcon>
              <DesignServicesIcon />
            </ListItemIcon>
            Agregar Competidores
          </ListItemButton>
        </ListItem>

        <Divider />

        <ListItem>
          <Link className="linkSidebar" to="/adminUsuarios">
            <ListItemButton className="listSidebar">
              <ListItemIcon>
                <PeopleAltIcon />
              </ListItemIcon>
              Cerrar torneo
            </ListItemButton>
          </Link>
        </ListItem>

        <Divider />

        <ListItem onClick={logout}>
          <ListItemButton className="listSidebar">
            <ListItemIcon className="linkSidebar">
              <ListItemIcon>
                <LogoutIcon />
              </ListItemIcon>
              Cerrar Sesión
            </ListItemIcon>
          </ListItemButton>
        </ListItem>
        <Divider />
      </List>
    </Box>
  );

  return (
    <div>
      <Drawer anchor="left" open={open} onClose={toggleDrawer}>
        {list()}
      </Drawer>
      <AddCompetitorDialog
        open={addCompetitorDialogOpen}
        onClose={() => setAddCompetitorDialogOpen(false)}
      />
    </div>
  );
};

export default Sidebar;
