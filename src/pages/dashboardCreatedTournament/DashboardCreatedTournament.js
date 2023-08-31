import * as React from 'react';
import './DashboardCreatedTournamentStyles.css';
import Navbar from '../../components/navbar/Navbar';
import Cookies from 'universal-cookie';
import { Button, CircularProgress, Typography } from '@mui/material'; // Importar Typography
import { getTournamentById } from '../../api/TournamentService';
import { useEffect } from 'react';

export default function DashboardCreatedTournament() {
  const cookies = new Cookies();
  const [tournamentData, setTournamentData] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(true);

  useEffect(() => {
    async function fetchData() {
      try {
        const id = cookies.get('tournamentid');
        getTournamentById(id)
          .then(data => {
            setTournamentData(data);
            setIsLoading(false);
          })
          .catch(error => {
            console.error('Error fetching tournament data:', error);
            setIsLoading(false);
          });
      } catch (error) {
        console.error('Error al obtener los datos:', error);
      }
    }

    // Llamamos a la función asíncrona
    fetchData();
  }, []);

  return (
    <div className="dashboardCTContainer">
      <Navbar title="TABLERO TORNEO" />

      {isLoading ? (
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', paddingTop: '10rem' }}>
          <CircularProgress size={100} style={{ color: 'orange' }} />
          <Typography variant="h5" style={{ marginTop: 20 }}>
            Cargando datos...
          </Typography>
        </div>
      ) : tournamentData ? (
        <>
          <p>Nombre: {tournamentData.tournamentName}</p>
          <p>Ubicacion: {tournamentData.location}</p>
          <p>Fecha: {tournamentData.tournamentDate}</p>
          <p>Modalidad: {tournamentData.modality}</p>
          <p>Categoria: {tournamentData.category}</p>
          <p>Descripcion: {tournamentData.description}</p>
          <p>Nombre pista: {tournamentData.trackName}</p>
          <p>Numero de saltos: </p>

          <Button
            variant="contained"
            sx={{ mt: 4, mb: 6 }}
            type="submit"
            className="sendButton"
          >
            Agregar Competidores
          </Button>
        </>

      ) : (
        <p>Error al cargar los datos del torneo.</p>
      )}


    </div>
  );
}
