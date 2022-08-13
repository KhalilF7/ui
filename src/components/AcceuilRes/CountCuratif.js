import {Card, CardContent, Container, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { BsBoxSeam } from "react-icons/bs";
import { FiBarChart } from "react-icons/fi";
import { HiOutlineRefresh } from "react-icons/hi";
import { MdOutlineNewReleases, MdOutlineSupervisorAccount } from "react-icons/md";
import Spinning from "../Spinning";

export default function CountCuratif() {
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
        nb++;
      }
    });
    return nb;
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && interventions && (
        <>
          <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color: 'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                        <MdOutlineNewReleases />
                    </button>
                    <p className="mt-3">
                        <span className="text-lg font-semibold">
                            {getTodayInterventions()}
                        </span>
                    </p>
                    <p className="text-sm text-gray-400 mt-1">Intevrnetions curatives d'aujourd'hui</p>
                </div>
                <div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg md:w-56 p-4 pt-9 rounded-2xl">
                    <button type="button" style={{ color: 'rgb(255, 244, 229)', backgroundColor: 'rgb(254, 201, 15)' }} className="text-2xl opacity-0.9 rounded-full p-4 hover:drop-shadow-xl">
                        <BsBoxSeam />
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
                        <FiBarChart />
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
