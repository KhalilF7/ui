import React, { useEffect, useState } from 'react';
import { MdOutlineCancel } from 'react-icons/md';

import { Button } from '.';
import { chatData } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';
import axios from 'axios';
import Spinning from './Spinning';
import { useNavigate } from 'react-router-dom';

const NewInterventions = () => {
  const { currentColor } = useStateContext();
  const [interventions, setInterventions] = useState();
  const [loading, setLoading] = useState(true);
  const [machines, setMachines] = useState();
  const navigate = useNavigate();
  let date = new Date();
  useEffect(() => {
    axios.get(`/api/InteventionCuratives`).then(response => {
        setInterventions(response.data);
      setLoading(false);
    });
    axios.get(`/api/machines`).then(response => {
        setMachines(response.data);
      });
  }, []);
  const hadelRedirect = code => {
    navigate(`/interventions/${code}`);
  };

  const getMachineName = code => {
    var m = [];
    if (machines) {
      // eslint-disable-next-line array-callback-return
      m = machines.filter(row => {
        if (row.code === code) {
          return row;
        }
      });
    }
    return m[0].brand;
  };

  return (
    <div className="nav-item absolute left-40 md:right-40 top-30 bg-white dark:bg-[#42464D] p-8 rounded-lg w-96 drop-shadow-xl" style={{ color: 'rgb(228, 106, 118)', backgroundColor: 'rgb(255, 244, 229)' }} >
      <div className="flex justify-between items-center" >
        <div className="flex gap-3" >
          <p className="font-semibold text-lg">Interventions d'aujourd'hui</p>
        </div>
        <Button icon={<MdOutlineCancel />} color="rgb(153, 171, 180)" bgHoverColor="light-gray" size="2xl" borderRadius="50%" />
      </div>
      <div className="mt-5 ">
        {interventions && (
            interventions.filter(row => {
              let rapport = new Date(row.dateRapport);
              if (
                rapport.getFullYear() === date.getFullYear() &&
                rapport.getMonth() === date.getMonth() &&
                rapport.getDay() === date.getDay()
              ) {
                return row;
              }
            }).map((row) => (
                <div key={row.codeCuratif} className="flex items-center leading-8 gap-5 border-b-1 border-color p-3">
                    <button onClick={() => { hadelRedirect(row.codeCuratif); }}>
                        <p className="font-semibold">Intervention Numéro: {row.codeCuratif}</p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">Équipement:  {getMachineName(row.machine)} </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">Type de panne:  {row.TypeDePanne} </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">Sympthomes:  {row.Sympthomes} </p>
                        <p className="text-gray-500 text-sm dark:text-gray-400">État de l'intervention: {row.etatInterventions} </p>
                    </button>
                </div>
                )
            ))
        }
        <div className="mt-5">
        </div>
      </div>
    </div>
  );
};

export default NewInterventions;
