import { Container, Typography } from "@mui/material";
import React from "react";
import { useParams } from "react-router-dom";

const About = () => {
  const params = useParams();
  
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
