import {Card, CardContent, Container, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdFiberNew, MdList, MdLockOpen, MdOutlineNewReleases, MdOutlineSupervisorAccount } from "react-icons/md";
import { useStateContext } from "../../contexts/ContextProvider";
import { Interventions } from "../../pages";
import NewInterventions from "../NewInterventions";
import Spinning from "../Spinning";
import UserProfile from "../UserProfile";

export default function CountCuratif() {
  const { isClicked, setIsClicked, handleClick } = useStateContext();
  const [interventions, setInterventions] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`/api/InteventionCuratives`).then(response => {
      setInterventions(response.data);
      setLoading(false);
    });
  }, []);
  const getInteventionsTotal = () => {
    return interventions.length;
  };
  const getNomberOuvert = () => {
    let nb = 0;
    interventions.filter(row => {
      if (row.etatInterventions === "ouvert") {
        nb++;
      }
    });
    return nb;
  };
  const getNomberEncours = () => {
    let nb = 0;
    interventions.filter(row => {
      if (row.etatInterventions === "encours") {
        nb++;
      }
    });
    return nb;
  };
  const getTodayInterventions = () => {
    let date = new Date();
    let nb = 0;
    interventions.filter(row => {
      let rapport = new Date(row.dateRapport);
      if (
        rapport.getFullYear() === date.getFullYear() &&
        rapport.getMonth() === date.getMonth() &&
        rapport.getDay() === date.getDay()
      ) {
        nb++
      }
    });
    return nb;
  };

  return (
    <>
      {loading && <Spinning />}
      {!loading && interventions && (
        <>
        {(getTodayInterventions() === 0) ? (
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" style={{ color: 'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                  <MdFiberNew />
              </button>
              <p className="mt-3">
                  <span className="text-lg font-semibold">
                      {getTodayInterventions()}
                  </span>
              </p>
              <p className="text-sm text-gray-800 mt-1">Intevrnetions curatives d'aujourd'hui</p>
          </div>
        ) : (
          <div style={{ backgroundColor: 'rgb(228, 106, 118)' }} className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" 
              style={{ color: 'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)' }} 
              className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl" 
              onClick={() => handleClick('intervention')}
              >
                  <MdFiberNew />
              </button>
              <div className="flex">
              </div>
              <p className="mt-3">
                  <span className="text-lg font-semibold">
                      {getTodayInterventions()}
                      {isClicked.intervention && <NewInterventions />}
                  </span>
              </p>
              <p className="text-sm text-gray-800 mt-1">Intevrnetions curatives d'aujourd'hui</p>
          </div>
        )}
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" style={{ color: 'rgb(255, 244, 229)', backgroundColor: 'rgb(254, 201, 15)' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                  <MdList />
              </button>
              <p className="mt-3">
                  <span className="text-lg font-semibold">
                      {getInteventionsTotal()}
                  </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Intevrnetions totales</p>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" style={{ color: '#03C9D7', backgroundColor: '#E5FAFB' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                  <MdLockOpen />
              </button>
              <p className="mt-3">
                  <span className="text-lg font-semibold">
                      {getNomberOuvert()}
                  </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Intevrnetions ouverts</p>
          </div>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
              <button type="button" style={{ color: 'rgb(0, 194, 146)', backgroundColor: 'rgb(235, 250, 242)' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                  <HiOutlineRefresh />
              </button>
              <p className="mt-3">
                  <span className="text-lg font-semibold">
                      {getNomberEncours()}
                  </span>
              </p>
              <p className="text-sm text-gray-400 mt-1">Intevrnetions En cours</p>
          </div>
        </>
      )}
    </>
  );
}
