import Authentification from "./pages/Authentifcation";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
import Dashbored from "./pages/Dashbored";
import {useSelector} from "react-redux";
import React, { useEffect } from "react";
import { FiSettings } from 'react-icons/fi';
import { TooltipComponent } from '@syncfusion/ej2-react-popups';
import "./App.css";

import { Navbar, Footer, Sidebar, ThemeSettings } from "./components";
import { Atelier, Accueil, Interventions, Machines, SousTraitants, Techniciens } from "./pages";

const App = () => {
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const activeMenu = false;

  return (
    <div>
      <BrowserRouter>
      <div className="flex relative dark:bg-main-dark-bg">
        <div className="fixed right-4 bottom-4" style={{ zIndex: '1000' }}>
          <TooltipComponent content="Settings" position="Top">
            <button type="button"
            className="text-3xl p-3 hover:drop-shadow-xl hover:bg-light-gray text-white"
            style={{ background: 'blue', borderRadius: '50%' }}>
              <FiSettings />
            </button>
          </TooltipComponent>
        </div>
        {activeMenu ? (
          <div className="w-72 fixed sidebar dark:bg-secondary-dark-bg bg-white">
            Sidebar
          </div>
        ) : (
          <div className="w-0 dark:bg-secondary-dark-bg">
            Sidebar w-0
          </div>
          )}
          <div className={
            `dark:bg-main-bg bg-main-bg min-h-screen w-full ${activeMenu ? 'md:ml-72' : 'flex-2'}`
          }>
            <div className="fixed md:static bg-main-bg dark:bg-main-dark-bg navbar w-full">
              Navbar
            </div>
          </div>

          <div>
            <Routes>
              {/*<Route path="/auth" element={<Authentification />} />
              {logedIn && <Route path="/dashbored/*" element={<Dashbored />} />}
              <Route
                path="*"
                element={<Navigate to={logedIn ? "/dashbored" : "/auth"} />}
              />*/}
              <Route path="/" element="Accueil" />
              <Route path="/accueil" element="Accueil" />
              
              <Route path="/machines"element="Machines" />
              <Route path="/techniciens"element="Techniciens" />
              <Route path="/sous-traitants"element="Sous-taitants" />
              <Route path="/interventions"element="Interventions" />
              <Route path="/atelier"element="Atelier" />

              <Route path="/statistiques"element="Statistiques" />
            </Routes>

          </div>

      </div>
        
      </BrowserRouter>
    </div>
    
  );
}

export default App;
