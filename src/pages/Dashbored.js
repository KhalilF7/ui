import React, {useEffect} from "react";
import {useSelector} from "react-redux";
import {Routes, Route, useNavigate} from "react-router-dom";

import Acceuil from "../components/Acceuil";
import Branches from "../components/Branches";
import SideNav from "../components/SideNav";
export default function Dashbored() {
  const navigate = useNavigate();
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const user = useSelector(state => state.userReducer.data);
  useEffect(() => {
    if (!logedIn) {
      navigate("/auth");
    }
    console.log(user);
  });
  return (
    <div style={{display: "flex"}}>
      <div style={{flex: "1"}}>
        <SideNav />
      </div>
      <div style={{flex: "4"}}>
        <Routes>
          <Route index element={<Acceuil />}></Route>
          {user["profile"] === "pdg" && (
            <Route path="/branches/*" element={<Branches />}></Route>
          )}
          <Route path="*" element={<Acceuil />}></Route>
        </Routes>
      </div>
    </div>
  );
}
