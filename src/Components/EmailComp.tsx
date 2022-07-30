import { Container, Grid, TextField, Chip } from "@mui/material";
import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
const EmailComp: React.FC = () => {
  const [email, setEmail] = React.useState<string>("");
  const [emails, setEmails] = React.useState<string[]>(
    JSON.parse(`${localStorage.getItem("Email")}`) || []
  );
  const navigate = useNavigate();
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
  const validateEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    let pattern =/^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/;
    const str = e.target.value;
    console.log(pattern.test(str), pattern, str);
    if (!pattern.test(str)) {
      setError("Email is not valid");
    } else {
      setError("");
    }
  };
  const handleClick = (email: string) => {
    navigate(`/email:${email}`);
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

          !error && handleSubmit();
        }}
      >
        <TextField
          variant="outlined"
          label="Enter your email here"
          type="email"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e);
          }}
        />
        {error ? <p>{error}</p> : ""}
      </form>

      <Container>
        <Grid container>
          {emails.map((email: string) => (
            <Grid item md={3} key={email}>
              <Chip
                label={email}
                color="primary"
                onClick={() => handleClick(email)}
                onDelete={() => handleDeleteByName(email)}
                sx={{ marginTop: "10px " }}
              />
            </Grid>
          ))}
        </Grid>
      </Container>
    </Container>
  );
};

export default EmailComp;
