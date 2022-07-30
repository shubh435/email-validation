import {
  Container,
  Grid,
  TextField,
  Chip,
  FormHelperText,
} from "@mui/material";
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

  //fc to validate email
  const validateEmail = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/; //regex to validate a email
    const str = e.target.value;
    if (!pattern.test(str)) {
      setError("Email is not valid"); //set the error msg if email is  not valid
    } else {
      setError(""); //free to the error if email is valid
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
          minHeight: "120%",
        }}
        onSubmit={(e) => {
          e.preventDefault();

          !error && handleSubmit();
        }}
      >
        <TextField
          variant="outlined"
          label="Enter your email here"
          value={email}
          onChange={(e) => {
            setEmail(e.target.value);
            validateEmail(e);
          }}
        />

        <FormHelperText error>{error}</FormHelperText>
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
