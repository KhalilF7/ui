import {Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";

export default function Couts(props) {
  const [couts, setCouts] = useState();
  const [loading, setloading] = useState(true);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/couts`).then(resposne => {
      if (resposne.data) {
        setCouts(resposne.data);
        setloading(false);
      } else {
        setEmpty(true);
        setloading(false);
      }
    });
  }, []);

  const getType = cout => {
    if (cout.typeDeCout === "facture") {
      return "Facture ";
    } else if (cout.typeDeCout === "heureSupp") {
      return "Heure Supplementaire";
    }
  };
  return (
    <>
      {loading && <Spinning />}{" "}
      {!loading && couts && (
        <>
          <div>
            <Typography variant="h5"> Couts : </Typography>
            {couts
              .filter(c => {
                if (props.type === "cur") {
                  if (c.Curative === props.code) {
                    return c;
                  }
                } else {
                  if (c.Prevetive === props.code) {
                    return c;
                  }
                }
              })
              .map(c => (
                <>
                  <div>
                    {getType(c)} :<> {c.Cout} </>
                  </div>
                </>
              ))}
          </div>
        </>
      )}
      {!loading && empty && <div> Aucune payement exist </div>}
    </>
  );
}
