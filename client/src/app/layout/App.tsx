//   TSX   Type Script using JSX syntax
//   JSX   Java Script XML   JSX allows to write HTML

import { createTheme, CssBaseline, ThemeProvider } from "@mui/material";
import { Container } from "@mui/system";
import { useState } from "react";
import Catalog from "../../features/catalog/Catalog";
import Header from "./Header";


function App() {      //our COMPONENT just a Funciton returns something div.,.
  const [darkMode, setDarkMode]= useState(false);
  const paletteType = darkMode ? 'dark' : 'light';
  const theme = createTheme({
    palette:{
      mode:paletteType,
      background:{
        default: paletteType === 'light' ? '#eaeaea':'#121212'
      }
    }
  })

  function handleThemeChange(){
    setDarkMode(!darkMode);
  }

  return (
    <ThemeProvider theme={theme}>
    <CssBaseline/>
      <Header darkMode={darkMode}  handleThemeChange={handleThemeChange}/>
      <Container>
       <Catalog/> 
      </Container>
      
    </ThemeProvider>
  );
}

export default App;
