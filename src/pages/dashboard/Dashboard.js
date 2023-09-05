import React, { useEffect, useState } from "react";
import Button from "@mui/material/Button";
import Navbar from "../../components/navbar/Navbar";
import Paper from "@mui/material/Paper";
import { Link } from "react-router-dom";
import FormControlLabel from "@mui/material/FormControlLabel";

import "./styles.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Container,
  Grid,
  IconButton,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Toolbar,
  Typography,
} from "@mui/material";
import LockIcon from "@mui/icons-material/Lock";
import image from "../../utils/images/Logo.png";
import Cookies from "universal-cookie";
import AccordionDashboard from "../../components/accordionDashboard/AccordionDashboard";


function createData(name, calories, fat, carbs, protein) {
  return { name, calories, fat, carbs, protein };
}

const rows = [
  createData("Frozen yoghurt", 159, 6.0, 24, 4.0),
  createData("Ice cream sandwich", 237, 9.0, 37, 4.3),
  createData("Eclair", 262, 16.0, 24, 6.0),
  createData("Cupcake", 305, 3.7, 67, 4.3),
  createData("Gingerbread", 356, 16.0, 49, 3.9),
];

export default function Dashboard() {
  const cookies = new Cookies();
  const [tournamentState, setTournamentState] = useState();
  const [tournamentData, setTournamentData] = useState();


  useEffect(() => {
    const ts = cookies.get("tournamentState");
    const td = cookies.get("tournamentData");
    const parse = ts ? JSON.parse(ts) : false;
    setTournamentState(parse);
    setTournamentData(td);
  }, []);

  return (
    <div className="dashboardContainer">
      <div className="appbarContainer">
        <AppBar position="static">
          <Toolbar className="appbar">
            <img src={image} alt="Logo" className="logo" />
            <Typography variant="h4" className="titleAppbar">
              TABLA DE POSICIONES
            </Typography>

            <Link to="/layout">
              <IconButton edge="end" color="inherit" className="icon">
                <Avatar sx={{}}>
                  <LockIcon />
                </Avatar>
              </IconButton>
            </Link>
          </Toolbar>
        </AppBar>
      </div>

      {tournamentData ? (
        <AccordionDashboard tournamentData={tournamentData} />
      ) : (
        <></>
      )}

      {tournamentState ? (
        <div className="dashboardTableContainer">
          <TableContainer component={Paper}>
            <Table aria-label="simple table">
              <TableHead>
                <TableRow className="headerTable">
                  <TableCell className="titles" align="center">
                    Posicion
                  </TableCell>
                  <TableCell className="titles" align="center">
                    Foto
                  </TableCell>
                  <TableCell className="titles" align="center">
                    Nombre
                  </TableCell>
                  <TableCell className="titles" align="center">
                    Redes
                  </TableCell>
                  <TableCell className="titles" align="center">
                    Puntaje
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {rows.map((row) => (
                  <TableRow
                    key={row.name}
                    sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
                  >
                    <TableCell
                      component="th"
                      scope="row"
                      align="center"
                      className="dashboardTableRow"
                    >
                      {row.name}
                    </TableCell>
                    <TableCell align="center" className="dashboardTableRow">
                      {row.calories}
                    </TableCell>
                    <TableCell align="center" className="dashboardTableRow">
                      {row.fat}
                    </TableCell>
                    <TableCell align="center" className="dashboardTableRow">
                      {row.carbs}
                    </TableCell>
                    <TableCell align="right" className="dashboardTableRow">
                      {row.protein}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      ) : (
        <div className="rootTournamentNotFound">
          <Container maxWidth="sm" className="paperTournamentNotFound">
            <img
              src={image}
              alt="No existe ningún torneo"
              className="imageTournamentNotFound"
            />
            <Typography className="textTournamentNotFound">
              NO EXISTE NINGUN TORNEO ACTIVO
            </Typography>
          </Container>
        </div>
      )}
    </div>
  );
}
