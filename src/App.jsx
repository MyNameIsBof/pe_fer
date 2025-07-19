import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import ArtTools from "./page/ArtTools";
import Contact from "./page/Contact";
import NavBar from "./components/NavBar";
import Detail from "./page/Detail";
import Add from "./page/Add";
import Edit from "./page/Edit";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/khang" element={<ArtTools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
        <Route path="/add" element={<Add />} />
        <Route path="/edit/:id" element={<Edit />} />
      </Routes>
    </>
  );
}

export default App;
