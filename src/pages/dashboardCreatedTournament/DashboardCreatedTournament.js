import * as React from 'react';
import './DashboardCreatedTournamentStyles.css';
import Navbar from '../../components/navbar/Navbar';
import Cookies from "universal-cookie"
import { Button } from '@mui/material';


export default function DashboardCreatedTournament() {

  const cookies = new Cookies();
  const [tournamentData, setTournamentData] = React.useState(cookies.get("tournamentData"));

  React.useEffect(() => {

    console.log(tournamentData)
  }, []);

  return (
    <>
      <Navbar title="TABLERO TORNEO" />
      <p>Aqui va el tablero del torneo que se creo</p>
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
  );
}