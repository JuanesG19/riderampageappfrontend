import React, { useState, useEffect } from "react";
import "./LayoutStyles.css";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "universal-cookie";
import CreateTournament from "../createTournament/CreateTournament";
import DashboardCreatedTournament from "../dashboardCreatedTournament/DashboardCreatedTournament";
import { collection, query, where } from "firebase/firestore";
import { db } from "../../api/Firebase";

export default function Layout() {
  const cookies = new Cookies();
  const [tournamentState, setTournamentState] = useState(false);

  useEffect(() => {
    const createdTournamentCookie = cookies.get("createdTournament");
    setTournamentState(createdTournamentCookie);
    console.log("layo", tournamentState)

  }, []);

  return (
    <>
      {tournamentState ? <CreateTournament /> : <DashboardCreatedTournament />}
    </>
  );
}

