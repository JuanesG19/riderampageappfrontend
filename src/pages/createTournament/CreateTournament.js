import React, { useState } from "react";
import { AppBar, Toolbar, Typography, IconButton, CssBaseline, Grid, Container, TextField, Button } from '@mui/material';
import MenuIcon from '@mui/icons-material/Menu';
import ExitToAppIcon from '@mui/icons-material/ExitToApp';

import "./styles.css";
import Navbar from "../../components/navbar/Navbar";
import Sidebar from "../../components/sidebar/Sidebar";

function CreateTournament() {

  return (
    <div >
      <Navbar title="CREAR TORNEO" />
      <Grid >
        <Grid item xs={12} md={9} lg={10}>
          <Container>
            <Typography variant="h5" sx={{ mt: 3 }}>
              Crear Torneo
            </Typography>
            <TextField label="Nombre del Torneo" fullWidth margin="normal" />
            <TextField label="Ubicación" fullWidth margin="normal" />
            <TextField label="Fecha del Torneo" type="date" fullWidth margin="normal" />
            <TextField label="Modalidad" fullWidth margin="normal" />
            <TextField label="Descripción" multiline rows={4} fullWidth margin="normal" />
            <Button variant="contained" color="primary" sx={{ mt: 2 }}>
              Crear Torneo
            </Button>
          </Container>
        </Grid>
      </Grid>
    </div>
  );
}
export default CreateTournament;