import Authentification from "./pages/Authentifcation";
import {Routes, Route, Navigate, BrowserRouter, useNavigate} from "react-router-dom";
import Dashbored from "./pages/Dashbored";
import {useSelector} from "react-redux";
import React, { useEffect } from "react";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import "./App.css";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Atelier, Accueil, Interventions, Machines, SousTraitants, Techniciens, Statistiques } from "./pages";

import { useStateContext } from './contexts/ContextProvider';
import MachinesDetails from "./components/machines/MachinesDetails";
import InterventionsDetails from "./components/interventionCurative/InterventionsDetails";
import Branches from "./components/Branches/Branches";
import AllBranches from "./components/Branches/AllBranches";
import Responsabels from "./components/responsables/Responsabels";
import AllResponsabels from "./components/responsables/AllResponsabels";
import ResponsabelDetails from "./components/responsables/ResponsabelDetails";
import AtelierDetails from "./components/atelier/AtelierDetails";
import TechniciensDeatils from "./components/techniciens/TechniciensDeatils";
import InterventionPrevetif from "./components/interventionPreventif/InterventionPrevetif";
import AllPreventif from "./components/interventionPreventif/AllPreventif";
import AcceuilTech from "./components/AcceuilTech/AcceuilTech";
import Acceuil from "./components/Acceuil";
import Responsables from "./pages/Responsables";

const App = () => {
  
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const user = useSelector(state => state.userReducer.data);
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Sombre' ? 'dark' : ''}>
      <BrowserRouter>
      {logedIn ? (
        <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            onClick={() => setThemeSettings(true)}
            style={{ background: currentColor, borderRadius: '50%' }}>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            <Sidebar />
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            <Sidebar />
          </div>
          )}
          <div className={
            `dark:bg-main-dark-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
          }>
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              <Navbar />
            </div>

            <div>

              {themeSettings && <ThemeSettings />}

              <Routes>
              {user["profile"] === "pdg" && (
                <>
                  <Route path="branches" element={<Branches />}>
                    <Route index element={<AllBranches />} />
                  </Route>
                  <Route path="/responsables" element={<Responsables />} />
                  <Route path="/responsables/:code" element={<ResponsabelDetails />} />
                  <Route path="*" element={<AllBranches />} />
                </>
              )}
          {user["profile"] === "res" && (
            <>
                <Route path="*" element={<Accueil />} />
                <Route path="/accueil" element={<Accueil />} />
                
                <Route path="/equipements"element={<Machines />} />
                <Route path="/equipements/:code" element={<MachinesDetails />} />
                <Route path="/techniciens"element={<Techniciens />} />
                <Route path="/techniciens/:code"element={<TechniciensDeatils />} />
                <Route path="/sous-traitants"element={<SousTraitants />} />
                <Route path="/interventions"element={<Interventions />} />
                <Route path="/interventions/:code" element={<InterventionsDetails />} />
                <Route path="/atelier"element={<Atelier />} />
                <Route path="/atelier/:code"element={<AtelierDetails />} />

                <Route path="/statistiques"element={<Statistiques />} />
            </>
          )}
          {user["profile"] === "tech" && (
            <>
              <Route path="/equipements"element={<Machines />} />
              <Route path="/equipements/:code" element={<MachinesDetails />} />
              <Route path="/interventions"element={<Interventions />} />
              <Route path="/interventions/:code" element={<InterventionsDetails />} />
              <Route path="/preventif" element={<InterventionPrevetif />}>
                <Route index element={<AllPreventif />}></Route>
              </Route>
              <Route path="*" element={<AcceuilTech />}></Route>
            </>
          )}
              </Routes>

            </div>
          </div>

      </div>
      ) : (
        <Routes>
          <Route path="/auth" element={<Authentification />} />
        </Routes>
      )}
      </BrowserRouter>
    </div>
    
  );
}

export default App;
