import { Container, Typography } from "@mui/material";
import React from "react";
import { useLocation } from "react-router-dom";
import { useParams } from "react-router-dom";

const About: React.FC = () => {
  const params = useParams();
  const location = useLocation();
  console.log(location);
  return (
    <Container sx={{ marginTop: "70px" }}>
      <Typography variant="h2" align="center">
        About
        {params.email}
      </Typography>
    </Container>
  );
};

export default About;
