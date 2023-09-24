import React, { useEffect, useState } from "react";

import "./ResumeDashboard.css";
import {
  Accordion,
  AccordionDetails,
  AccordionSummary,
  AppBar,
  Avatar,
  Box,
  Button,
  CircularProgress,
  Container,
  Grid,
  IconButton,
  Paper,
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
import { Link, useNavigate } from "react-router-dom";
import LockIcon from "@mui/icons-material/Lock";
import image from "../../utils/images/Logo.png";
import { doc, onSnapshot } from "firebase/firestore";
import { observeCookie } from "../../api/CookiesService";
import { db } from "../../api/Firebase";
import Cookies from "universal-cookie";
import AccordionDashboard from "../../components/accordionDashboard/AccordionDashboard";
import ImageSlider from "../../components/imageSlider/ImageSlider";

function ResumeDashboard() {
  const cookies = new Cookies();
  const [tournamentState, setTournamentState] = useState(null);
  const [tournamentData, setTournamentData] = useState(null);
  const [tournamentRiders, setTournamentRiders] = useState(null);
  const [riderId, setRiderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tournamentId, setTournamentId] = useState(cookies.get("tournamentId"));
  let navigate = useNavigate();

  useEffect(() => {
    let tid = cookies.get("tournamentId");

    if (!tid) {
      tid = null;
    }

    const stopObserving = observeCookie("tournamentId", (newValue) => {
      setTournamentId(tid);
      fetchData(tid);
    });

    if (tid) {
      fetchData(tid);

      return () => {
        stopObserving();
      };
    }
  }, []);

  const fetchData = (tid) => {
    const tournamentRef = doc(db, "tournaments", tid);

    const unsubscribe = onSnapshot(tournamentRef, (snapshot) => {
      if (snapshot.exists()) {
        const tournamentData = snapshot.data();
        setTournamentData(tournamentData);
        setTournamentRiders(tournamentData.riders);
        setTournamentState(tournamentData.state);
        setIsLoading(false);
      } else {
        setTournamentState(false);
        setIsLoading(false);
      }
    });

    return () => {
      unsubscribe();
    };
  };

  const seeMore = () => {
    navigate("/dashboard");
  };

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
            <>
              <div className="resumeDashboardTableContainer">
                <TableContainer
                  component={Paper}
                  className="tableResumeContainer"
                >
                  <div className="headerTableDCT headerTableDCTTitle">
                    COMPETIDORES
                  </div>
                  <Table aria-label="simple table" className="responsive-table">
                    <TableHead>
                      <TableRow className="headerTableDCT">
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

                        <TableCell
                          className="titles"
                          align="center"
                          style={{
                            borderColor: "black",
                            borderWidth: "0 1px 0 1px",
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
                                <span className="puntuacionTitle">Club:</span>{" "}
                                {row.club}
                              </div>
                              <div>
                                <span className="puntuacionTitle">
                                  Redes Sociales:
                                </span>{" "}
                                {row.socialNetworks}
                              </div>
                            </div>
                          </TableCell>
                          <TableCell
                            align="center"
                            className="dCTTableRow hidden-mobile "
                            style={{
                              borderColor: "#ff7f00",
                              borderWidth: "0 1px 1px 1px",
                              borderStyle: "solid",
                              fontSize: "20px",
                              width: "60px",
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
            </>
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
      <div className="seeMoreButton">
        <Button
          onClick={seeMore}
          color="primary"
          variant="contained"
          className="addCompetitorsDialogButtons"
        >
          Ver Mas Detalles
        </Button>
      </div>

      <ImageSlider />
    </div>
  );
}

export default ResumeDashboard;
