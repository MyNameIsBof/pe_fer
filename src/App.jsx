import { ToastContainer } from "react-toastify";
import { Route, Routes } from "react-router-dom";
import Home from "./page/Home";
import ArtTools from "./page/ArtTools";
import Contact from "./page/Contact";
import NavBar from "./components/NavBar";
import Detail from "./page/Detail";

function App() {
  return (
    <>
      <NavBar />
      <ToastContainer />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/art-tools" element={<ArtTools />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/detail/:id" element={<Detail />} />
      </Routes>
    </>
  );
}

export default App;
