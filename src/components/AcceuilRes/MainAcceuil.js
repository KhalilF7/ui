import {Card, Container} from "@mui/material";
import {Box} from "@mui/system";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";
import Categorie from "./Categorie";
import logo from "../../Assets/logo.png";
import CountCuratif from "./CountCuratif";

export default function MainAcceuil() {
  const [machines, setMachines] = useState();
  const [categories, setCategorie] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/machines`).then(response => {
      setMachines(response.data);

      setLoading(false);
    });
    axios
      .get(`${process.env.REACT_APP_API_URL}/categoriMachines`)
      .then(response => {
        setCategorie(response.data);
      });
  };

  return (
    <>
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
              height: "100%",
            }}>
            <img src={logo} alt="logo" />
          </div>
          <CountCuratif />
        </>
      )}
    </>
  );
}
