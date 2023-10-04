import { Box, Container, Typography } from "@mui/material";
import React from "react";
import { Link } from "react-router-dom";

export default function Footer() {
  return (
    <Box
      sx={{
        backgroundColor: "#ff7f00",
        p: 1,
      }}
      component="footer"
    >
      <Container maxWidth="sm">
        <Typography variant="body2" color="black" align="center">
          {"Copyright © "}
          <Link color="black" href="https://your-website.com/">
            Your Website
          </Link>{" "}
          {new Date().getFullYear()}
          {"."}
        </Typography>
      </Container>
    </Box>
  );
}
