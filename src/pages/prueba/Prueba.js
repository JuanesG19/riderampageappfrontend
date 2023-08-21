import React, { useState } from "react";
import Button from '@mui/material/Button';
import Navbar from "../../components/navbar/Navbar";
import Paper from '@mui/material/Paper';
import { Link } from "react-router-dom";
import "./Prueba.css";
import { AppBar, Avatar, Box, IconButton, Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Toolbar, Typography } from "@mui/material";
import LockIcon from '@mui/icons-material/Lock';
import image from '../../utils/images/Logo.png';

export default function Prueba() {

  return (
    <div className="appbarContainer">
      <p style={{padding: 0, margin: 0}}>Hola</p>
    </div>
  );
};
