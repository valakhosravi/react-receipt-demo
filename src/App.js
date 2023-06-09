import React, { useState } from "react";
import { FaGithub } from "react-icons/fa";
import {
  AppBar,
  Toolbar,
  Typography,
  Container,
  TextField,
  Button,
  IconButton,
} from "@mui/material";
import invoicePrint from "./utils/receipt";

const App = () => {
  const [jsonText, setJsonText] = useState("");

  const handleJsonChange = (event) => {
    setJsonText(event.target.value);
  };

  const handleFormatJson = () => {
    try {
      const formattedJson = JSON.stringify(JSON.parse(jsonText), null, 2);
      setJsonText(formattedJson);
    } catch (error) {
      console.error("Invalid JSON:", error);
    }
  };

  const handleDownloadReceipt = () => {
    // TODO
    invoicePrint();
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar >
          <Typography variant="h6">React Receipt Demo</Typography>
          <IconButton
            aria-label="GitHub"
            variant="text"
            color="white"
            href="https://github.com/valakhosravi/react-receipt"
          >
            <FaGithub color="white" />
          </IconButton>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: "2rem" }}>
        <TextField
          id="outlined-multiline-static"
          label="Enter your JSON"
          multiline
          rows={6}
          fullWidth
          variant="outlined"
          value={jsonText}
          onChange={handleJsonChange}
          sx={{ marginBottom: "1rem" }}
        />
        <Button
          variant="contained"
          color="primary"
          onClick={handleDownloadReceipt}
          style={{ marginRight: "1rem" }}
        >
          Download Receipt
        </Button>
        <Button variant="outlined" color="primary" onClick={handleFormatJson}>
          Format JSON
        </Button>
      </Container>
    </div>
  );
};

export default App;
