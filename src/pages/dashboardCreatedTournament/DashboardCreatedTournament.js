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
} from "@mui/material";
import { getTournamentById } from "../../api/TournamentService";
import AccordionDashboard from "../../components/accordionDashboard/AccordionDashboard";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";
import AddCompetitorDialog from "../addCompetitorsDialog/AddCompetitorsDialog";

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

export default function DashboardCreatedTournament() {
  const cookies = new Cookies();
  const [tournamentData, setTournamentData] = useState(null);
  const [tournamentRiders, setTournamentRiders] = useState(null);


  const [isLoading, setIsLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const td = cookies.get("tournamentData");
    setTournamentData(td);
    setTournamentRiders(td.riders)
    setIsLoading(false);
    console.log(tournamentRiders)
  }, []);

  const addRider = () => {
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
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
          <Typography variant="h5" style={{ marginTop: 20 }}>
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
              <Table aria-label="simple table">
                <TableHead>
                  <TableRow className="headerTableDCT">
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

          <AddCompetitorDialog open={isModalOpen} onClose={handleCloseModal} />
        </>
      ) : (
        <p>Error al cargar los datos del torneo.</p>
      )}
    </div>
  );
}
