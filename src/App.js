import Authentification from "./pages/Authentifcation";
import {Routes, Route, Navigate, BrowserRouter} from "react-router-dom";
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

const App = () => {
  const logedIn = useSelector(state => state.userReducer.logedIn);
  const { activeMenu, themeSettings, setThemeSettings, currentColor, currentMode } = useStateContext();

  return (
    <div className={currentMode === 'Sombre' ? 'dark' : ''}>
      <BrowserRouter>
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
                <Route path="/auth" element={<Authentification />} />
                {/*{logedIn && <Route path="/dashbored/*" element={<Dashbored />} />}
                <Route
                  path="*"
                  element={<Navigate to={logedIn ? "/dashbored" : "/auth"} />}
                />*/}
                <Route path="/" element={<Accueil />} />
                <Route path="/accueil" element={<Accueil />} />
                
                <Route path="/machines"element={<Machines />} />
                <Route path="/machines/:code" element={<MachinesDetails />}></Route>
                <Route path="/techniciens"element={<Techniciens />} />
                <Route path="/sous-traitants"element={<SousTraitants />} />
                <Route path="/interventions"element={<Interventions />} />
                <Route path="/interventions/:code" element={<InterventionsDetails />}></Route>
                <Route path="/atelier"element={<Atelier />} />

                <Route path="/statistiques"element={<Statistiques />} />
              </Routes>

            </div>
          </div>

      </div>
        
      </BrowserRouter>
    </div>
    
  );
}

export default App;
