import React from 'react';
import { AppBar, Toolbar, Typography, Container, TextField, Button } from '@mui/material';

const App = () => {
  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Typography variant="h6">React Reciept Demo</Typography>
        </Toolbar>
      </AppBar>
      <Container maxWidth="sm" sx={{ marginTop: '2rem' }}>
        <TextField
          id="outlined-multiline-static"
          label="Enter your text"
          multiline
          rows={4}
          fullWidth
          variant="outlined"
          sx={{ marginBottom: '1rem' }}
        />
        <Button variant="contained" color="primary">
          Submit
        </Button>
      </Container>
    </div>
  );
};

export default App;
