import React, { useState, useEffect } from "react";
import "./LayoutStyles.css";
import Navbar from "../../components/navbar/Navbar";
import Cookies from "universal-cookie";
import CreateTournament from "../createTournament/CreateTournament";
import DashboardCreatedTournament from "../dashboardCreatedTournament/DashboardCreatedTournament";

export default function Layout() {
  const cookies = new Cookies();
  const [tournamentState, setTournamentState] = useState(false);

  useEffect(() => {
    setTournamentState(cookies.get("createdTournament") === "true"); // Parse the cookie value as boolean
  }, []);

  return (
    <>
      {tournamentState ? <DashboardCreatedTournament /> : <CreateTournament />}
    </>
  );
}
