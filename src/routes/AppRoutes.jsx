import { Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Login from "../pages/Login";
import Registro from "../pages/Registro";
import Ofertas from "../pages/Ofertas";
import OfertaDetalle from "../pages/OfertaDetalle";
import Perfil from "../pages/Perfil";
import PublicarOferta from "../pages/PublicarOferta";
import MisOfertas from "../pages/MisOfertas";
import MisCandidaturas from "../pages/MisCandidaturas";

export default function AppRoutes() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<Login />} />
      <Route path="/registro" element={<Registro />} />
      <Route path="/ofertas" element={<Ofertas />} />
      <Route path="/ofertas/:id" element={<OfertaDetalle />} />
      <Route path="/perfil" element={<Perfil />} />
      <Route path="/publicar-oferta" element={<PublicarOferta />} />
      <Route path="/mis-ofertas" element={<MisOfertas />} />
      <Route path="/mis-candidaturas" element={<MisCandidaturas />} />
    </Routes>
  );
}
