import {
  Button,
  Container,
  Table,
  TableCell,
  TableContainer,
  TableHead,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Spinning from "../Spinning";
export default function AllInterventions() {
  const user = useSelector(state => state.userReducer.data);
  const [tech, setTech] = useState();
  const [interventions, setInterventions] = useState();
  const [loading, setLoading] = useState(true);
  const fetchData = () => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/technicien/${user.userID}`)
      .then(response => {
        setTech(response.data);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/IntevetionCuratives`)
      .then(response => {
        setInterventions(response.data);
      });
  };
  useEffect(() => {
    fetchData();
    setLoading(false);
  }, []);
  const ancientIntervention = () => {
    console.log("fired");
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && interventions && tech && (
        <>
          <Container
            sx={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              alignSelf: "center",
              padding: "20px",
            }}>
            {tech.isResponsableMaintenance && (
              <>
                {/** todo : feuille complet d'intevention encient  */}
                <Button variant="contained" onClick={ancientIntervention}>
                  ajouter une ancient intervention
                </Button>
              </>
            )}
          </Container>
          {/** fillter d intevention selon : etat (ouvert , en cours , achiver , cloture) */}
          {/** chercher par nom du machine  */}
          <TableContainer component={Container}>
            <Table sx={{minWidth: 650}} aria-label="Tous les interventions">
              <TableHead>
                <TableCell align="center"> Code intervention </TableCell>
                <TableCell align="center"> machine </TableCell>
                <TableCell align="center"> Etat </TableCell>
              </TableHead>
            </Table>
          </TableContainer>
        </>
      )}
    </>
  );
}
