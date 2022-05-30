import {Card, CardContent, Container, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
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
          <Container>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                margin: "50px",
              }}>
              <div
                style={{
                  margin: "20px",
                }}>
                <Typography gutterBottom variant="h6" component="div">
                  Nomber des intevrnetions curatives d'aujourd'hui :{" "}
                  {getTodayInterventions()}
                </Typography>
              </div>
              <div
                style={{
                  margin: "20px",
                }}>
                <Typography gutterBottom variant="h6" component="div">
                  Nomber des intevrnetions Totale : {getInteventionsTotal()}
                </Typography>
              </div>
              <div
                style={{
                  margin: "20px",
                }}>
                <Typography gutterBottom variant="h6" component="div">
                  Nomber des intevrnetions ouverts : {getNomberOuvert()}
                </Typography>
              </div>
              <div
                style={{
                  margin: "20px",
                }}>
                <Typography gutterBottom variant="h6" component="div">
                  Nomber des intevrnetions En cours : {getNomberEncours()}
                </Typography>
              </div>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
