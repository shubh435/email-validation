import {
  Button,
  Container,
  Grid,
  TextField,
  Box,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
const EmailComp = () => {
  const [email, setEmail] = React.useState<string>("");
  const [emails, setEmails] = React.useState<string[]>(
    JSON.parse(`${localStorage.getItem("Email")}`) || []
  );
  const [error, setError] = useState<string>("");
  const handleSubmit = (): void => {
    if (emails.find((arr) => arr === email)) {
      setError("Email is already present");
      return;
    }
    if (email) {
      localStorage.setItem("Email", JSON.stringify([...emails, email]));
      setEmails(JSON.parse(`${localStorage.getItem("Email")}`));
      setEmail("");
      setError("");
    }
  };

  const handleDeleteByName = (name: string) => {
    setError("");
    const newEmail = emails.filter((email) => email !== name);
    localStorage.setItem("Email", JSON.stringify(newEmail));
    setEmails(JSON.parse(`${localStorage.getItem("Email")}`));
  };
  const validateEmail = () => {
    console.log(email.includes(""));
    let mailformat = /^\w+([.-]?\w+)*@\w+([.-]?\w+)*(\.\w{2,3})+$/;

    if (email.match(mailformat) || email.trim()) {
      setError("");
    } else {
      setError("Email is not valid");
      return;
    }
  };
  return (
    <Container>
      <form
        style={{
          display: "grid",
          justifyContent: "center",
          alignItems: "center",
          margin: "10% auto 2% auto ",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          handleSubmit();
        }}
      >
        <TextField
          variant="outlined"
          label="Enter your email here"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            console.log({ email }, e.target.value);
            validateEmail();
          }}
        />
        {error ? <p>{error}</p> : ""}
      </form>

      <Container>
        <Grid container>
          {emails.map((email: string) => (
            <Grid item md={4} key={email}>
              <Box
                sx={{
                  display: "flex",
                  justifyContent: "space-between",
                  margin: "10px 5px ",
                  background: "yellow",
                  borderRadius: "25px",
                  padding: "10px",
                }}
              >
                <Typography variant="h6">{email}</Typography>
                <Button
                  variant="text"
                  color="error"
                  onClick={() => handleDeleteByName(email)}
                >
                  x
                </Button>
              </Box>
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default EmailComp;
