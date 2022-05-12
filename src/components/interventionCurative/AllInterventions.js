import {
  Button,
  Container,
  Fab,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Spinning from "../Spinning";
import OldIntervention from "./OldIntervention";
import DemandeInterventions from "./DemandeInterventions";
import {useNavigate} from "react-router-dom";
export default function AllInterventions() {
  const user = useSelector(state => state.userReducer.data);
  const [tech, setTech] = useState();
  const [interventions, setInterventions] = useState();
  const [oldInter, setOldInter] = useState(false);
  const [demand, setDemande] = useState(false);
  const [loading, setLoading] = useState(true);
  const [machines, setMachines] = useState();
  const navigate = useNavigate();
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
        console.log(response.data);
      });
    axios.get(`${process.env.REACT_APP_API_URL}/machines`).then(response => {
      setMachines(response.data);
    });
    setLoading(false);
  };
  useEffect(() => {
    fetchData();
  }, [oldInter, demand]);
  const hadelRedirect = code => {
    navigate(`${code}`);
  };
  const handelCloseOld = () => {
    setOldInter(false);
  };
  const handelCloseDemande = () => {
    setDemande(false);
  };
  const ancientIntervention = () => {
    setOldInter(true);
  };
  const handleDemande = () => {
    setDemande(true);
  };
  const getMachineName = code => {
    if (machines) {
      var machine = machines.filter(row => {
        if (row.code === code) {
          return row;
        }
      });
    }
    return machine[0].brand;
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
          {interventions && (
            <TableContainer component={Container}>
              <Table sx={{minWidth: 650}} aria-label="Tous les interventions">
                <TableHead>
                  <TableCell align="center"> Code intervention </TableCell>
                  <TableCell align="center"> machine </TableCell>
                  <TableCell align="center"> Etat </TableCell>
                </TableHead>
                <TableBody>
                  {interventions.map(row => (
                    <TableRow
                      key={row.codeCuratif}
                      onClick={() => {
                        hadelRedirect(row.codeCuratif);
                      }}
                      sx={{
                        ":hover": {
                          backgroundColor: "#8aa8ff",
                        },
                        cursor: "pointer",
                      }}>
                      <TableCell align="center"> {row.codeCuratif} </TableCell>
                      <TableCell align="center">
                        {" "}
                        {machines && getMachineName(row.machine)}
                      </TableCell>
                      <TableCell align="center">
                        {row.etatInterventions}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tech.isResponsableProduction && (
            <>
              <Fab
                color="primary"
                onClick={handleDemande}
                aria-label="add"
                sx={{
                  position: "fixed",
                  bottom: "100px",
                  right: "100px",
                  transform: "scale(1.3)",
                }}>
                <AddIcon />
              </Fab>
            </>
          )}
          <OldIntervention
            machines={machines}
            open={oldInter}
            handelClose={handelCloseOld}
          />
          <DemandeInterventions
            machines={machines}
            open={demand}
            handelClose={handelCloseDemande}
          />
        </>
      )}
    </>
  );
}
