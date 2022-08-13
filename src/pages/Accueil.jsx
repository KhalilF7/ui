import {Card, Container} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../components/Spinning";
import Categorie from "../components/AcceuilRes/Categorie";
import logo from "../Assets/logo.png";
import CountCuratif from "../components/AcceuilRes/CountCuratif";

import { BsBoxSeam, BsCurrencyDollar } from 'react-icons/bs';
import { GoPrimitiveDot } from 'react-icons/go';
import { Button } from '../components';
import { useStateContext } from "../contexts/ContextProvider";
import { earningData } from '../data/dummy';
import { MdOutlineSupervisorAccount } from "react-icons/md";
import { HiOutlineRefresh } from "react-icons/hi";
import { FiBarChart } from "react-icons/fi";


const Accueil = () => {


  const [interventions, setInterventions] = useState();
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

  const [machines, setMachines] = useState();
  const [categories, setCategorie] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios.get(`/api/machines`).then(response => {
      setMachines(response.data);

      setLoading(false);
    });
    axios.get(`/api/categoriMachines`).then(response => {
      setCategorie(response.data);
    });
  };
  return (
    <div className="mt-12">
        <div className="flex flex-wrap lg:flex-nowrap justify-center">
            {/*<div className="bg-white dark:text-gray-200 dark:bg-secondary-dark-bg h-44 rounded-xl w-full lg:w-80 p-8 pt-9 m-3 bg-hero-pattern bg-no-repeat bg-cover bg-center">
                <div className="flex justify-between items-center">
                    <div>
                        <p className="font-bold text-gray-400">Earnings</p>
                        <p className="text-2xl">$63,448.78</p>
                    </div>
                </div>
                <div className="mt-6">
                    <Button color="white" bgColor="blue" text="Download" borderRadius="10px" size="md" />
                </div>
            </div>*/}
            <div className="flex m-3 flex-wrap justify-center gap-1 items-center">
            <CountCuratif />
                
            </div>
        </div>
        <div>
        {loading && <Spinning />}
      {!loading && machines && categories && Object.keys(machines) !== 0 && (
        <>
          <Box
            sx={{
              display: "flex",
            }}>
            {categories.map(row => (
              <Container key={row.codeCategorie}>
                <div>
                  <div>
                    <p>{<Categorie detail={row} machines={machines} />} </p>
                  </div>
                </div>
              </Container>
            ))}
          </Box>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "100px",
            }}>
            <img src={logo} alt="logo" />
          </div>
        </>
      )}
        </div>
    </div>

    
    );
    {/*<>
      {loading && <Spinning />}
      {!loading && machines && categories && Object.keys(machines) !== 0 && (
        <>
          <Box
            sx={{
              display: "flex",
            }}>
            {categories.map(row => (
              <Container key={row.codeCategorie}>
                <div>
                  <div>
                    <p>{<Categorie detail={row} machines={machines} />} </p>
                  </div>
                </div>
              </Container>
            ))}
          </Box>
          <CountCuratif />
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              margin: "100px",
            }}>
            <img src={logo} alt="logo" />
          </div>
        </>
      )}
        </>*/}
  
}
export default Accueil;