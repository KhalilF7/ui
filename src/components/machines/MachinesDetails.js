import {Delete} from "@mui/icons-material";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import {
  Button,
  Grid,
  MenuItem,
  Select,
  Slider,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinning from "../Spinning";
import { useStateContext } from "../../contexts/ContextProvider";

export default function MachinesDetails() {
  const { currentColor } = useStateContext();
  const param = useParams();
  const [edit, setEdit] = useState(false);
  const navigate = useNavigate();
  const [machine, setMachine] = useState();
  const [ateliers, setAteliers] = useState();
  const [catMachine, setCatMachine] = useState();
  const [loading, setLoading] = useState(true);
  const MySwal = withReactContent(Swal);
  useEffect(() => {
    fetchData();
  }, []);
  const fetchData = () => {
    axios.get(`/api/machine/${param.code}`).then(response => {
      let data = response.data;
      setMachine(data);
    });
    axios.get(`/api/categoriMachines`).then(response => {
      setCatMachine(response.data);
    });

    axios.get(`/api/ateliers`).then(response => {
      setAteliers(response.data);
    });
    setLoading(false);
  };
  const handelEdit = () => {
    setEdit(true);
  };
  const getStatus = etat => {
    switch (etat) {
      case "fonction":
        return "Bon fonctionnement ";

      case "degradee":
        return "Fonctionnement degrade";

      default:
        return "Arrêt";
    }
  };
  const handelUpdate = () => {
    const tmp = {
      code: machine.code,
      brand: machine.brand,
      model: machine.model,
      anneeManifacture: machine.anneeManifacture,
      currentState: machine.currentState,
      schudledTime: machine.schudledTime,
      timeLosses: machine.timeLosses,
      descriptions: machine.descriptions,
      availibilty: machine.availibilty,
      type: machine.type,
      atelier: machine.atelier,
    };
    axios.patch(`/api/machine/${param.code}`, tmp).then(response => {
      let data = response.data;
      console.log(data);
      setEdit(false);
    });
  };
  const handelCancelEditMode = () => {
    setEdit(false);
  };
  const handelChanges = e => {
    setMachine({...machine, [e.target.name]: e.target.value});
  };
  const handelDelete = e => {
    MySwal.fire({
      title: <p>Are you sure about deleting changes</p>,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
      cancelButtonColor: currentColor,
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/machine/${param.code}`)
          .then(response => {
            let data = response.data;
            console.log(data);
            if (data.message === "deleted") {
              MySwal.fire(
                "Supprimer!",
                "la machine est supprimer avec succes",
                "success",
              );
              navigate("/");
            } else {
              MySwal.fire("Error", "un error detecter ", "error");
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "les changement sont annuler", "error");
      }
    });
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && machine && Object.keys(machine) !== 0 && (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <div
          style={{
            margin: "100px",
          }}>
          <form>
            <div
              style={{
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
                margin: "20px",
              }}>
              <img width="300px" src={`/api/${machine.image}`} alt="" />
            </div>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                <div> Marque : {machine.brand} </div>
              </Grid>
              <Grid item xs={4}>
                <div> Type : {machine.model} </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  {catMachine && Object.keys(catMachine) !== 0 && (
                    <div>
                      Categorie :
                      {catMachine.map(row => (
                        <div key={row.codeCategorie}>
                          {row && row.codeCategorie === machine.type && (
                            <> {row.nomCategrie}</>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div> Date de fabrication : {machine.anneeManifacture} </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  {!edit ? (
                    <>
                      Description :
                      {machine.descriptions !== "" && machine.descriptions}
                      {machine.descriptions === "" && (
                        <p> aucune discription disponible </p>
                      )}
                    </>
                  ) : (
                    <>
                      <TextField
                        onChange={handelChanges}
                        id="descriptions"
                        value={machine.descriptions}
                        name="descriptions"
                        label="Adescriptions"
                        type="text"
                        multiline
                        rows={4}
                        fullWidth
                        variant="outlined"
                        required
                      />
                    </>
                  )}
                </div>
              </Grid>
              <Grid item xs={4}>
                {!edit ? (
                  <div> État actuel : {getStatus(machine.currentState)} </div>
                ) : (
                  <>
                    <label htmlFor="type">Etat du machine </label>
                    <Select
                      onChange={handelChanges}
                      defaultValue={machine.currentState}
                      name="currentState"
                      id="atelier"
                      variant="outlined"
                      fullWidth>
                      <MenuItem value="enArret">En Arret</MenuItem>
                      <MenuItem value="fonction">fontionee</MenuItem>
                      <MenuItem value="degradee">En etat dégradee</MenuItem>
                    </Select>
                  </>
                )}
              </Grid>
              <Grid item xs={4}>
                {!edit ? (
                  <div> Heure prévue (heures): {machine.schudledTime} </div>
                ) : (
                  <>
                    <label htmlFor="schudledTime">Heure prévue</label>
                    <Slider
                      aria-label="Heure Prévue "
                      onChange={handelChanges}
                      value={machine.schudledTime}
                      valueLabelDisplay="auto"
                      name="schudledTime"
                      step={1}
                      marks
                      min={0}
                      max={200}
                    />
                  </>
                )}
              </Grid>
              <Grid item xs={4}>
                <div> Pertes de temps (heures): {machine.timeLosses} </div>
              </Grid>
              <Grid item xs={4}>
                <div> Disponibilité: {machine.availibilty} % </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  {ateliers && Object.keys(ateliers) !== 0 && (
                    <div>
                      Atelier :
                      {ateliers.map(row => (
                        <div key={row.idAtelier}>
                          {row && row.idAtelier === machine.atelier && (
                            <> {row.nomAtelier}</>
                          )}
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </Grid>
              {edit && (
                <>
                  <Grid item xs={8}>
                    <Button style={{ backgroundColor: currentColor}} variant="contained" onClick={handelUpdate}>
                      affecter les changements
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button style={{ backgroundColor: currentColor}} variant="contained" onClick={handelCancelEditMode}>
                      Annuler
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
          {/** graphe de : nomber de panne , moyenne de temps de panne , nomber de panne selon type  */}
          <SpeedDial
            ariaLabel="Action"
            sx={{position: "fixed", bottom: 50, right: 50}}
            icon={<SpeedDialIcon />}>
            <SpeedDialAction
              icon={<EditIcon />}
              tooltipTitle="editer"
              onClick={handelEdit}
            />
            <SpeedDialAction
              icon={<Delete />}
              tooltipTitle="supprimer"
              onClick={handelDelete}
            />
          </SpeedDial>
        </div>
        </div>
      )}
    </>
  );
}
