import React from 'react';
import { Box, Divider, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
import SchemaIcon from "@mui/icons-material/Schema";
import DesignServicesIcon from "@mui/icons-material/DesignServices";
import PeopleAltIcon from "@mui/icons-material/PeopleAlt";
import LogoutIcon from "@mui/icons-material/Logout";
import { Link } from 'react-router-dom';
import "./SidebarStyles.css";


const Sidebar = ({ open, onClose }) => {

  const toggleDrawer = (event) => {
    if (
      event.type === "keydown" &&
      (event.key === "Tab" || event.key === "Shift")
    ) {
      return;
    }

    onClose();
  };

  const list = () => (
    <Box
      sx={{ width: 300 }}
      role="presentation"
      onClick={toggleDrawer}
      onKeyDown={toggleDrawer}
    >
      <div />
      <div className="titleContainer">
        <p className="title">MENU</p>
      </div>
      <List>
        <ListItem>
          {/* Organigrama */}
          <ListItemButton>
            <ListItemIcon>
              <SchemaIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/">
              Tablero Del Torneo
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Admin Unidades */}
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <DesignServicesIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/adminUnidades">
              Agregar Competidores
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Adminstrar Usuarios */}
        <ListItem>
          <ListItemButton>
            <ListItemIcon>
              <PeopleAltIcon />
            </ListItemIcon>
            <Link style={{ color: "#193F76" }} to="/adminUsuarios">
              Cerrar torneo
            </Link>
          </ListItemButton>
        </ListItem>
        <Divider />
        {/* Cerrar Sesion */}
        <ListItem >
          <ListItemButton>
            <ListItemIcon>
              <LogoutIcon />
            </ListItemIcon>
            <ListItemIcon style={{ color: "#193F76" }}>
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
    </div>
  );
};

export default Sidebar;