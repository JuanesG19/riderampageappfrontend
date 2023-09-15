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
  CircularProgress,
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
import { doc, onSnapshot } from "firebase/firestore";
import { db } from "../../api/Firebase";

export default function Dashboard() {
  const cookies = new Cookies();
  const [tournamentState, setTournamentState] = useState(null);
  const [tournamentData, setTournamentData] = useState(null);
  const [tournamentRiders, setTournamentRiders] = useState(null);
  const [riderId, setRiderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tournamentId, setTournamentId] = useState(cookies.get("tournamentId"));

  useEffect(() => {
    const ts = cookies.get("tournamentState");
    const parse = ts ? JSON.parse(ts) : false;
    setTournamentState(parse);

    const tid = cookies.get("tournamentId");
    setTournamentId(tid);

    const unsubscribe = onSnapshot(
      doc(db, "tournaments", tournamentId),
      (snapshot) => {
        if (snapshot.exists) {
          setTournamentData(snapshot.data());
          setTournamentRiders(snapshot.data().riders);
          setTournamentState(true);
          setIsLoading(false);
        } else {
          setTournamentState(false);
        }
      }
    );

    return () => {
      unsubscribe();
    };
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
        <>
          {isLoading ? (
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                paddingTop: "10rem",
              }}
            >
              <CircularProgress size={100} style={{ color: "orange" }} />
              <Typography
                variant="h5"
                style={{ marginTop: 20, color: "white" }}
              >
                Cargando datos...
              </Typography>
            </div>
          ) : (
            <div className="dashboardTableContainer">
              <TableContainer component={Paper} className="tableDCTContainer">
                <div className="headerTableDCT headerTableDCTTitle">
                  COMPETIDORES
                </div>
                <Table aria-label="simple table" className="responsive-table">
                  <TableHead>
                    <TableRow className="headerTableDCT">
                      {/* Salida */}
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 1px 0 0",
                          borderStyle: "solid",
                        }}
                      >
                        Salida
                      </TableCell>
                      {/* Score */}
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 1px 0 1px",
                          borderStyle: "solid",
                        }}
                      >
                        Ranking
                      </TableCell>
                      {/* Información */}

                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 0 0 0",
                          borderStyle: "solid",
                        }}
                      >
                        Información
                      </TableCell>

                      {/* Puntuacion */}
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 0 0 1px",
                          borderStyle: "solid",
                        }}
                      ></TableCell>
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 0 0 0",
                          borderStyle: "solid",
                        }}
                      >
                        Score
                      </TableCell>
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 1px 0 0",
                          borderStyle: "solid",
                        }}
                      ></TableCell>
                      <TableCell
                        className="titles"
                        align="center"
                        style={{
                          borderColor: "black",
                          borderWidth: "0 0 0 0",
                          borderStyle: "solid",
                        }}
                      >
                        Puntaje Final
                      </TableCell>
                    </TableRow>
                  </TableHead>
                  <TableBody>
                    {tournamentRiders.map((row) => (
                      <TableRow
                        key={row.name}
                        sx={{
                          "&:last-child td, &:last-child th": { border: 0 },
                        }}
                      >
                        {/* Salida */}
                        <TableCell
                          align="center"
                          className="dCTTableRow hidden-mobile points"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 0",
                            borderStyle: "solid",
                            width: "30px",
                          }}
                        >
                          1
                        </TableCell>

                        {/* Score */}
                        <TableCell
                          align="center"
                          className="dCTTableRow hidden-mobile points"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 0",
                            borderStyle: "solid",
                            width: "30px",
                          }}
                        >
                          2
                        </TableCell>

                        {/* Columnas 3-5 */}
                        <TableCell
                          align="center"
                          className="dCTTableRow"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 0 1px 0",
                            borderStyle: "solid",
                          }}
                        >
                          <div>
                            <span className="puntuacionTitle">Nombre:</span>
                            {row.name}
                            <div>
                              <span className="puntuacionTitle">Ciudad:</span>{" "}
                              {row.city}
                            </div>
                            <div>
                              <span className="puntuacionTitle">Club:</span>{" "}
                              {row.club}
                            </div>
                            <div>
                              <span className="puntuacionTitle">Redes Sociales:</span>{" "}
                              {row.socialNetworks}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          align="center"
                          className="dCTTableRow"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 1px",
                            borderStyle: "solid",
                          }}
                        >
                          <div>
                            <div className="puntuacionTitle">Score 1</div>
                            <div className="puntuacionContent">
                              {row.score[0].firstScore}
                            </div>
                          </div>
                        </TableCell>

                        {/* Columnas 9-11 */}
                        <TableCell
                          align="center"
                          className="dCTTableRow"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 0",
                            borderStyle: "solid",
                          }}
                        >
                          <div>
                            <div className="puntuacionTitle">Score 2</div>
                            <div className="puntuacionContent">
                              {" "}
                              {row.score[0].secondScore}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          align="center"
                          className="dCTTableRow"
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 0",
                            borderStyle: "solid",
                          }}
                        >
                          <div>
                            <div className="puntuacionTitle">Score 3</div>
                            <div className="puntuacionContent">
                              {" "}
                              {row.score[0].tirthScore}
                            </div>
                          </div>
                        </TableCell>

                        <TableCell
                          align="center"
                          className="dCTTableRow hidden-mobile "
                          style={{
                            borderColor: "#ff7f00",
                            borderWidth: "0 1px 1px 0",
                            borderStyle: "solid",
                            fontSize: "20px",
                            width: "30px",
                          }}
                        >
                          {row.score[0].finalScore}
                        </TableCell>
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              </TableContainer>
            </div>
          )}
        </>
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
