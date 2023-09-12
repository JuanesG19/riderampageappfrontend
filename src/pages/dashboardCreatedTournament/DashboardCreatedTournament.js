import React, { useEffect, useState } from "react";
import "./DashboardCreatedTournamentStyles.css";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "universal-cookie";
import {
  Button,
  CircularProgress,
  Container,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Grid,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
  IconButton,
} from "@mui/material";
import {
  deleteRiderFirebase,
  getTournamentById,
} from "../../api/TournamentService";
import AccordionDashboard from "../../components/accordionDashboard/AccordionDashboard";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import AddCompetitorDialog from "../addCompetitorsDialog/AddCompetitorsDialog";
import AddIcon from "@mui/icons-material/Add";
import DeleteIcon from "@mui/icons-material/Delete";
import ScoreDialog from "../scoreDialog/ScoreDialog";
import firebase from "firebase/compat/app";
import "firebase/compat/firestore"; // Para Cloud Firestore
import { db } from "../../api/Firebase";
import { collection, doc, onSnapshot } from "firebase/firestore";

export default function DashboardCreatedTournament() {
  const cookies = new Cookies();
  const [tournamentData, setTournamentData] = useState();
  const [tournamentRiders, setTournamentRiders] = useState(null);
  const [riderId, setRiderId] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [tournamentId, setTournamentId] = useState(cookies.get("tournamentId"));

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isModalScoreOpen, setIsModalScoreOpen] = useState(false);

  useEffect(() => {
    const tid = cookies.get("tournamentId");
    setTournamentId(tid);

    const unsubscribe = onSnapshot(
      doc(db, "tournaments", tid),
      (snapshot) => {
        setTournamentData(snapshot.data());
        setTournamentRiders(snapshot.data().riders);
        setIsLoading(false);
      }
    );

    return () => {
      unsubscribe();
    };
  }, []);

  const addRider = () => {
    setIsModalOpen(true);
  };

  const scoreDialog = (id) => {
    setIsModalScoreOpen(true);
    setRiderId(id);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
  };

  const handleCloseScoreModal = () => {
    setIsModalScoreOpen(false);
  };

  const deleteRider = async (id) => {
    if (window.confirm("¿Estás seguro de que desea borrar el competidor?")) {
      const deleted = await deleteRiderFirebase(tournamentId, id);
      if (deleted) {
        alert("El competidor fue eliminado del torneo");
      } else {
        alert("Error, el jugador no pudo ser eliminado");
      }
    } else {
      alert("Acción cancelada");
    }
  };

  return (
    <div className="dashboardCTContainer">
      <Navbar title="TABLERO TORNEO" />

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
          <Typography variant="h5" style={{ marginTop: 20, color: "white" }}>
            Cargando datos...
          </Typography>
        </div>
      ) : tournamentData ? (
        <>
          <AccordionDashboard tournamentData={tournamentData} />

          <div className="addRiderButtonDCT">
            <Button
              variant="contained"
              sx={{ mt: 2, mb: 2 }}
              className="sendButtonDCT"
              onClick={addRider}
              size="small"
            >
              Agregar Competidor
            </Button>
          </div>

          <div className="dashboardTableContainer">
            <TableContainer component={Paper} className="tableDCTContainer">
              <div className="headerTableDCT">COMPETIDORES</div>
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
                      Información
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
                    {/* Puntuacion */}
                    <TableCell
                      className="titles"
                      align="center"
                      style={{
                        borderColor: "black",
                        borderWidth: "0 0 0 0",
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
                        borderWidth: "0 1px 0 0",
                        borderStyle: "solid",
                      }}
                    >
                      Puntaje Final
                    </TableCell>
                    <TableCell
                      className="titles"
                      align="center"
                      style={{
                        borderColor: "black",
                        borderWidth: "0 0 0 0",
                        borderStyle: "solid",
                      }}
                    >
                      Opciones
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {tournamentRiders.map((row) => (
                    <TableRow
                      key={row.name}
                      sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
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
                            <span className="puntuacionTitle">Cedula:</span>{" "}
                            {row.id}
                          </div>
                        </div>
                      </TableCell>

                      {/* Columnas 6-8 */}
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
                          <div>
                            <span className="puntuacionTitle">Edad:</span>{" "}
                            {row.age}
                          </div>
                          <div>
                            <span className="puntuacionTitle">Eps:</span>{" "}
                            {row.eps}
                          </div>
                        </div>
                        <div>
                          <span className="puntuacionTitle">Redes:</span>{" "}
                          {row.socialNetworks}
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
                          <div>
                            <span className="puntuacionTitle">Telefono:</span>
                          </div>
                          <div>{row.number}</div>
                          <div className="puntuacionTitle">
                            Telefono Responsable:
                          </div>
                          <div>{row.numberPersonInCharge}</div>
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

                      {/* Columnas 21-22 */}
                      <TableCell
                        align="center"
                        className="dCTTableRow"
                        style={{
                          borderColor: "#ff7f00",
                          borderWidth: "0 0 1px 0",
                          borderStyle: "solid",
                          width: "25px",
                        }}
                      >
                        <IconButton onClick={() => scoreDialog(row.id)}>
                          {" "}
                          <AddIcon />
                        </IconButton>

                        <IconButton onClick={() => deleteRider(row.id)}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          </div>

          <AddCompetitorDialog open={isModalOpen} onClose={handleCloseModal} />
          <ScoreDialog
            open={isModalScoreOpen}
            onClose={handleCloseScoreModal}
            riderId={riderId}
          />
        </>
      ) : (
        <p>Error al cargar los datos del torneo.</p>
      )}
    </div>
  );
}
