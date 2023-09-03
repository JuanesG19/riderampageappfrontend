import * as React from "react";
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
import { useEffect } from "react";
import AccordionDashboard from "../../components/accordionDashboard/AccordionDashboard";
import { Modal } from "@mui/base";
import { Box } from "@mui/system";

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
  const [tournamentData, setTournamentData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);
  const [isModalOpen, setIsModalOpen] = React.useState(false);

  useEffect(() => {
    const td = cookies.get("tournamentData");
    setTournamentData(td);
    setIsLoading(false);
  }, []);

  const addRider = (event) => {
    // Abre el modal cuando se hace clic en "Agregar Competidor"
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    // Cierra el modal
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
              sx={{ mt: 4, mb: 6 }}
              type="submit"
              className="sendButton"
              onClick={addRider}
            >
              Agregar Competidor
            </Button>
          </div>

          <div className="dashboardTableContainer">
            <TableContainer component={Paper}>
              <div className="headerTableDCT">COMPETIDORES</div>
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

          {/* Modal para agregar competidor */}
          <Dialog
            open={isModalOpen}
            onClose={handleCloseModal}
            maxWidth="md" // Puedes ajustar el tamaño del modal aquí (por defecto, es 'sm')
            fullWidth // Opcional: Hace que el modal ocupe el ancho completo
          >
            <DialogTitle>Agregar Competidor</DialogTitle>
            <DialogContent>
              {/* Formulario para agregar competidor en una grilla */}
              <form>
                <Grid container spacing={2}>
                  <Grid item xs={4}>
                    <TextField label="Nombre" fullWidth sx={{ width: '100%' }} /> {/* Ajusta el ancho del TextField */}
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Cédula" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Teléfono" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Edad" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Ciudad" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Club" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="EPS" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Teléfono del Responsable" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                  <Grid item xs={4}>
                    <TextField label="Redes" fullWidth sx={{ width: '100%' }} />
                  </Grid>
                </Grid>
              </form>
            </DialogContent>
            <DialogActions>
              <Button onClick={handleCloseModal} color="primary">
                Cancelar
              </Button>
              <Button onClick={handleCloseModal} color="primary">
                Guardar
              </Button>
            </DialogActions>
          </Dialog>
        </>
      ) : (
        <p>Error al cargar los datos del torneo.</p>
      )}
    </div>
  );
}
