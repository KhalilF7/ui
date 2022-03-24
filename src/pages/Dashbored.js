import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Routes, Route, useNavigate} from "react-router-dom";

import Acceuil from "../components/Acceuil";
import AllBranches from "../components/Branches/AllBranches";
import Branche from "../components/Branches/Branche";
import Branches from "../components/Branches/Branches";
import AllResponsabels from "../components/responsables/AllResponsabels";
import ResponsabelDetails from "../components/responsables/ResponsabelDetails";
import Responsabels from "../components/responsables/Responsabels";
import SideNav from "../components/sideNave/SideNav";
import AllTehniciens from "../components/techniciens/AllTehniciens";
import Techniciens from "../components/techniciens/Techniciens";
import TechniciensDeatils from "../components/techniciens/TechniciensDeatils";
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
      <div style={{flex: "4"}}>
        <Routes>
          {user["profile"] === "pdg" && (
            <>
              <Route path="branches" element={<Branches />}>
                <Route index element={<AllBranches />} />
                <Route path=":code" element={<Branche />} />
              </Route>
              <Route path="responsables" element={<Responsabels />}>
                <Route index element={<AllResponsabels />}></Route>
                <Route path=":code" element={<ResponsabelDetails />}></Route>
              </Route>
            </>
          )}
          {user["profile"] === "res" && (
            <>
              <Route path="techniciens" element={<Techniciens />}>
                <Route index element={<AllTehniciens />}></Route>
                <Route path=":code" element={<TechniciensDeatils />}></Route>
              </Route>
            </>
          )}

          <Route path="*" element={<Acceuil />}></Route>
        </Routes>
      </div>
    </div>
  );
}
