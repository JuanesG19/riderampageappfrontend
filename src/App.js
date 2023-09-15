import AppRoutes from "./routes/AppRoutes";
import "./App.css";
import { ThemeProvider } from "@emotion/react";
import theme from "./theme";
import { useEffect, useState } from "react";
import Cookies from "universal-cookie";
import {
  collection,
  doc,
  getDoc,
  getDocs,
  onSnapshot,
  query,
  where,
} from "firebase/firestore";
import { db } from "./api/Firebase";
import { Typography } from "@mui/material";
import { CircularProgress } from "@mui/material";

const App = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = new Cookies();

      const queryCollection = collection(db, "tournaments");
      const tournamentState = query(
        queryCollection,
        where("state", "==", true)
      );

      const unsubscribe = onSnapshot(tournamentState, (querySnapshot) => {
        if (!querySnapshot.empty) {
          setResponse(true);
          querySnapshot.forEach((doc) => {
            cookies.set("tournamentData", doc.data());
            cookies.set("tournamentId", doc.id);
          });
        } else {
          setResponse(false);
          cookies.remove("tournamentData");
          cookies.remove("tournamentId");
        }
        // Cuando los datos se carguen, establece isLoading en falso después de 3 segundos.
        setTimeout(() => {
          setIsLoading(false);
        }, 3000);
      });

      return () => {
        unsubscribe();
      };
    };

    fetchData();
  }, []);

  // Si isLoading es verdadero, muestra el mensaje de carga, de lo contrario, muestra la aplicación real.
  return (
    <ThemeProvider theme={theme}>
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
          <Typography variant="h5" style={{ marginTop: 20, color: "black" }}>
            Cargando datos...
          </Typography>
        </div>
      ) : (
        <AppRoutes />
      )}
    </ThemeProvider>
  );
};

export default App;
