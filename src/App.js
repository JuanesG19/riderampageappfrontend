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
  query,
  where,
} from "firebase/firestore";
import { db } from "./api/Firebase";

const App = () => {
  const [response, setResponse] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      const cookies = new Cookies();

      const queryCollection = collection(db, "tournaments");
      const tournamentState = query(
        queryCollection,
        where("state", "==", true)
      );
      const docSnap = await getDocs(tournamentState);

      if (docSnap.size > 0) {
        setResponse(true);
        cookies.set("tournamentState", true);
        docSnap.forEach((doc) => {
          cookies.set("tournamentData", doc.data());
        });
      } else {
        cookies.set("tournamentState", false);
        cookies.remove("tournamentData");
      }
    };

    fetchData();
  }, []);

  console.log("app", response);
  return (
    <ThemeProvider theme={theme}>
      <AppRoutes />
    </ThemeProvider>
  );
};

export default App;
