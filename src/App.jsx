import { BrowserRouter, Route, Routes } from "react-router-dom";
import FinoLogin from "./pages/HomeComponent/FinoLogin";

const App = () => {


  return (
    <Routes>
    <Route path="/" element={<FinoLogin/>}></Route>
    </Routes>
  );
};

export default App;
