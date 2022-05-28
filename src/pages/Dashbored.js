import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Routes, Route, useNavigate} from "react-router-dom";

import Acceuil from "../components/Acceuil";
import AllAtelier from "../components/atelier/AllAtelier";
import AtelierDetails from "../components/atelier/AtelierDetails";
import Ateliers from "../components/atelier/Ateliers";
import AllBranches from "../components/Branches/AllBranches";

import Branches from "../components/Branches/Branches";
import AllInterventions from "../components/interventionCurative/AllInterventions";
import Interventions from "../components/interventionCurative/Interventions";
import AllMachines from "../components/machines/AllMachines";
import Machines from "../components/machines/Machines";
import MachinesDetails from "../components/machines/MachinesDetails";
import AllResponsabels from "../components/responsables/AllResponsabels";
import ResponsabelDetails from "../components/responsables/ResponsabelDetails";
import Responsabels from "../components/responsables/Responsabels";
import SideNav from "../components/sideNave/SideNav";
import AllTehniciens from "../components/techniciens/AllTehniciens";
import Techniciens from "../components/techniciens/Techniciens";
import TechniciensDeatils from "../components/techniciens/TechniciensDeatils";
import MainAcceuil from "../components/AcceuilRes/MainAcceuil";
import InterventionsDetails from "../components/interventionCurative/InterventionsDetails";
import AcceuilTech from "../components/AcceuilTech/AcceuilTech";
import InterventionPrevetif from "../components/interventionPreventif/InterventionPrevetif";
import AllPreventif from "../components/interventionPreventif/AllPreventif";

import SousTraitent from "../components/Sous-Traitent/SousTraitent";
import AllSousTraitents from "../components/Sous-Traitent/AllSousTraitents";
import Statistic from "../components/Statistic/Statistic";

export default function Dashbored() {
  const navigate = useNavigate();
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const user = useSelector(state => state.userReducer.data);
  useEffect(() => {
    if (!logedIn) {
      navigate("/auth");
    }
  });
  return (
    <div style={{display: "flex"}}>
      <div style={{flex: "1"}}>
        <SideNav />
      </div>
      <div style={{flex: "5"}}>
        <Routes>
          {user["profile"] === "pdg" && (
            <>
              <Route path="branches" element={<Branches />}>
                <Route index element={<AllBranches />} />
              </Route>
              <Route path="responsables" element={<Responsabels />}>
                <Route index element={<AllResponsabels />}></Route>
                <Route path=":code" element={<ResponsabelDetails />}></Route>
              </Route>
              <Route path="*" element={<AllBranches />}></Route>
            </>
          )}
          {user["profile"] === "res" && (
            <>
              <Route path="Acceuil" index element={<MainAcceuil />}></Route>
              <Route path="techniciens" element={<Techniciens />}>
                <Route index element={<AllTehniciens />}></Route>
                <Route path=":code" element={<TechniciensDeatils />}></Route>
              </Route>
              <Route path="Statistique" element={<Statistic />}></Route>
              <Route path="atelier" element={<Ateliers />}>
                <Route index element={<AllAtelier />}></Route>
                <Route path=":code" element={<AtelierDetails />}></Route>
              </Route>
              <Route path="machines" element={<Machines />}>
                <Route index element={<AllMachines />}></Route>
                <Route path=":code" element={<MachinesDetails />}></Route>
              </Route>
              <Route path="Interventions" element={<Interventions />}>
                <Route index element={<AllInterventions />}></Route>
                <Route path=":code" element={<InterventionsDetails />}></Route>
              </Route>
              <Route path="sousTraitences" element={<SousTraitent />}>
                <Route index element={<AllSousTraitents />}></Route>
              </Route>
              <Route path="*" element={<MainAcceuil />}></Route>
            </>
          )}
          {user["profile"] === "tech" && (
            <>
              <Route path="Interventions" element={<Interventions />}>
                <Route index element={<AllInterventions />}></Route>
                <Route path=":code" element={<InterventionsDetails />}></Route>
              </Route>
              <Route path="machines" element={<Machines />}>
                <Route index element={<AllMachines />}></Route>
                <Route path=":code" element={<MachinesDetails />}></Route>
              </Route>
              <Route path="Preventif" element={<InterventionPrevetif />}>
                <Route index element={<AllPreventif />}></Route>
              </Route>
              <Route path="*" element={<AcceuilTech />}></Route>
            </>
          )}
          <Route path="*" element={<Acceuil />}></Route>
        </Routes>
      </div>
    </div>
  );
}
