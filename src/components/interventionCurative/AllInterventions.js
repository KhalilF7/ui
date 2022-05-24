import {
  Button,
  Container,
  Fab,
  FormControl,
  InputLabel,
  MenuItem,
  Select,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
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
  const [selectedEtat, setselectedEtat] = useState("");
  const [selectedMachine, setSelectedMachine] = useState("");

  const navigate = useNavigate();
  const etat = ["ouvert", "encours", "achieve", "cloture"];
  const fetchData = () => {
    if (user.profile === "tech") {
      axios
        .get(`${process.env.REACT_APP_API_URL}/technicien/${user.userID}`)
        .then(response => {
          setTech(response.data);
        });
    } else {
      axios
        .get(`${process.env.REACT_APP_API_URL}/responsable/${user.userID}`)
        .then(response => {
          setTech(response.data);
        });
    }
    axios
      .get(`${process.env.REACT_APP_API_URL}/InteventionCuratives`)
      .then(response => {
        setInterventions(response.data);
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
    return machine[0].model;
  };
  const getColor = etat => {
    switch (etat) {
      case "ouvert":
        return "#FC4445";
      case "encours":
        return "#E7A302";
      case "achieve":
        return "#5431F0";
      default:
        return "#5CDB95";
    }
  };
  const getStatus = etat => {
    switch (etat) {
      case "ouvert":
        return "Ouvert  ";
      case "encours":
        return "En cours";
      case "achieve":
        return "Achever";
      default:
        return "Clotûre";
    }
  };
  const handelEtatChange = e => {
    setselectedEtat(e.target.value);
  };
  const handleMachineChange = e => {
    setSelectedMachine(e.target.value);
    console.log(e.target.value);
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && interventions && tech && machines && (
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
          <div style={{display: "flex", justifyContent: "space-around"}}>
            <div>
              <InputLabel> Etat de l'intervention </InputLabel>
              <FormControl>
                <Select
                  autoWidth
                  onChange={handelEtatChange}
                  displayEmpty
                  name="etat"
                  defaultValue=""
                  value={selectedEtat}
                  label="etat intervention">
                  <MenuItem value={""}> Tout </MenuItem>
                  {etat.map(e => (
                    <MenuItem value={e}>{getStatus(e)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
            <div>
              <InputLabel> Machine </InputLabel>
              <FormControl>
                <Select
                  autoWidth
                  onChange={handleMachineChange}
                  displayEmpty
                  defaultValue=""
                  name="machine"
                  value={selectedMachine}
                  label="etat intervention">
                  <MenuItem value={""}> Tout </MenuItem>
                  {machines.map(e => (
                    <MenuItem value={e.code}>{getMachineName(e.code)}</MenuItem>
                  ))}
                </Select>
              </FormControl>
            </div>
          </div>
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
                  {interventions
                    .filter(row => {
                      if (selectedEtat === "" && selectedMachine === "") {
                        return row;
                      } else if (
                        row.etatInterventions === selectedEtat &&
                        selectedMachine === ""
                      ) {
                        return row;
                      } else if (
                        row.machine === selectedMachine &&
                        selectedEtat === ""
                      ) {
                        return row;
                      } else if (
                        row.etatInterventions === selectedEtat &&
                        row.machine === selectedMachine
                      ) {
                        return row;
                      }
                    })
                    .map(row => (
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
                        <TableCell align="center">
                          {" "}
                          {row.codeCuratif}{" "}
                        </TableCell>
                        <TableCell align="center">
                          {machines && getMachineName(row.machine)}
                        </TableCell>
                        <TableCell align="center">
                          {getStatus(row.etatInterventions)}
                        </TableCell>
                        <TableCell
                          sx={{
                            backgroundColor: getColor(row.etatInterventions),
                          }}></TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
          {tech.isResponsableProduction && user.profile === "tech" && (
            <>
              <Fab
                color="primary"
                onClick={handleDemande}
                aria-label="add"
                sx={{
                  position: "fixed",
                  bottom: "60px",
                  right: "60px",
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
            interventions={interventions}
            machines={machines}
            open={demand}
            handelClose={handelCloseDemande}
          />
        </>
      )}
    </>
  );
}
