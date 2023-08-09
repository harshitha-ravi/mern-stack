import { BrowserRouter, Navigate, Routes, Route } from "react-router-dom";
import HomePage from "views/homePage";
import ProfilePage from "views/profilePage";
import LoginPage from "views/loginPage";  

// imports realted to theme settings 
import { useMemo } from "react";
import { useSelector } from "react-redux";
import { CssBaseline, ThemeProvider } from "@mui/material";
import { createTheme } from "@mui/material/styles";
import { themeSettings } from "./theme";


function App() {
  // This is how we grab the gloab state defined in initialState in state -> index.js
  // Using useSelector
  const mode = useSelector((state) => state.mode);

  // To set up the theme -> this is passed to theme provider
  const theme = useMemo(() => createTheme(themeSettings(mode)), [mode]);



  return (
    <div className="app">
      <BrowserRouter>
      <ThemeProvider theme={theme}>
        <CssBaseline />
       <Routes>
         <Route path="/" element={<LoginPage/>} />
         <Route path="/home" element={<HomePage/>} />
         <Route path="/profile/:studentId" element={<ProfilePage/>} />
       </Routes>
       </ThemeProvider>
      </BrowserRouter>
      
    </div>
  );
}

export default App;
