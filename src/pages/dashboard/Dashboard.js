import React, { useState } from "react";
import Button from '@mui/material/Button';
import Navbar from "../../components/navbar/Navbar";
import { Link } from "react-router-dom";


import "./styles.css";


function Dashboard() {
  return (<>
    <Navbar />
    <div >
      <Link to="/login" > 
        <Button variant="contained" color="primary" sx={{mt: 2}}>
          Login
        </Button>
      </Link>
    </div>
  </>);
}
export default Dashboard;