import {Card, CardContent, Container, Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";

export default function CountCuratif() {
  const [interventions, setInterventions] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/InteventionCuratives`)
      .then(response => {
        setInterventions(response.data);
        setLoading(false);
      });
  }, []);
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
    if (nb === 0) {
      return nb;
    } else {
      return nb - 1;
    }
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
                justifyContent: "center",
              }}>
              <Card>
                <CardContent>
                  <Typography gutterBottom variant="h4" component="div">
                    Nomber des intevrnetions curatives d'aujourd'hui :{" "}
                    {getTodayInterventions()}
                  </Typography>
                </CardContent>
              </Card>
            </div>
          </Container>
        </>
      )}
    </>
  );
}
