import React from 'react';
import logo from './logo.svg';
import './App.css';
import ToDoTable from './components/ToDoDashboard/ToDoTable';
import { Typography } from '@mui/material';
import TODOLogo from "../src/images/TODOLogo.jpg";
import { styled } from '@mui/material/styles';

const StyledImg = styled("img")({});
function App() {
  return (
    <div className="App">
      <StyledImg
        src={TODOLogo}
        alt="TODO LOGO"
        sx={{
          width: 300
        }}
      />
      {/* <Typography variant="h2" component="h2">
        TODO
      </Typography> */}

      <div>
        <ToDoTable />
      </div>
    </div>
  );
}

export default App;
