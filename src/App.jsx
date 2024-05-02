import { BrowserRouter, Route, Routes } from "react-router-dom";
import FinoLogin from "./pages/HomeComponent/FinoLogin";
import { ThemeProvider } from "@emotion/react";
import { FinoTheme } from "./theme/FinoTheme";
import { Card } from "@mui/material";
import TopNavbar from "./pages/HomeComponent/TopNavbar";
import Layout from "./pages/Layout/Layout";
import Dashboard from "./pages/Dashboard/Dashboard";

const App = () => {


  return (
    <ThemeProvider theme={FinoTheme()}>
     <Card elevation={0} sx={{backgroundColor:"#F1F3F8",borderRadius:0,height:"100dvh",width:"100dvw"}}>
     <TopNavbar/>
    <Routes>
    <Route path="/" element={<FinoLogin/>}></Route>
    <Route path="/Layout" element={<Layout/>}>
      <Route path="dashboard" element={<Dashboard/>}></Route>

    </Route>
    </Routes>
    </Card> 
    </ThemeProvider>
  );
};

export default App;
