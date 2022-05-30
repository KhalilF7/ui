import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Spinning from "../Spinning";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import {
  Button,
  Checkbox,
  FormControlLabel,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import {Delete} from "@mui/icons-material";
import {useSelector} from "react-redux";

export default function TechniciensDeatils() {
  const param = useParams();
  const [technicine, setTechnicien] = useState();
  const user = useSelector(state => state.userReducer.data);
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [branche, setBranche] = useState(user["branche"]);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/technicien/${param.code}`).then(response => {
      let data = response.data;
      setTechnicien(data);
      setLoading(false);
    });
  }, [param.code]);

  const handelResMaint = e => {
    setTechnicien({...technicine, isResponsableMaintenance: e.target.checked});
  };
  const handelResProd = e => {
    setTechnicien({...technicine, isResponsableProduction: e.target.checked});
  };
  const handelChange = e => {
    setTechnicien({...technicine, [e.target.name]: e.target.value});
  };
  const handelDelete = () => {
    MySwal.fire({
      title: <p>Are you sure about deleting changes</p>,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
      cancelButtonColor: "#F21800",
    }).then(result => {
      if (branche) {
        setTechnicien({...technicine, branche: branche});
      }
      if (result.isConfirmed) {
        axios.delete(`/api/technicien/${param.code}`).then(response => {
          let data = response.data;
          console.log(data);
          if (data.message === "deleted") {
            console.log(data);
            MySwal.fire(
              "Supprimer!",
              "le responsable est supprimer avec succes",
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

  const handelUpdate = () => {
    MySwal.fire({
      title: <p>Are you sure about saving changes</p>,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Modifier",
      cancelButtonColor: "#F21800",
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .put(`/api/technicien/${technicine.matricule}`, technicine)
          .then(response => {
            let data = response.data;
            if (data) {
              console.log(data);
              setTechnicien(data);
              MySwal.fire(
                "Modifier!",
                "les donners sont modifier avec succes",
                "success",
              );
              setEdit(false);
            } else {
              MySwal.fire("Error", "un error detecter ", "error");
              console.log(data);
              setEdit(false);
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "les changement sont annuler", "error");
        setEdit(false);
      }
    });
  };
  const handelEdit = () => {
    setEdit(true);
  };
  const handelCancelEditMode = () => {
    setEdit(false);
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && technicine && Object.keys(technicine) !== 0 && (
        <div style={{margin: "100px"}}>
          <form>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    autoFocus
                    id="nom"
                    name="nom"
                    label="Nom"
                    type="text"
                    fullWidth
                    value={technicine.nom}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> nom : {technicine.nom}</div>
                )}
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    id="prenom"
                    name="prenom"
                    label="Prenom"
                    type="text"
                    fullWidth
                    value={technicine.prenom}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> Prenom : {technicine.prenom}</div>
                )}
              </Grid>
              <Grid item xs={4}>
                <div> matricule : {technicine.matricule}</div>
              </Grid>
              <Grid item xs={4}>
                <div> brache : {technicine.branche}</div>
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    id="telephone"
                    name="telephone"
                    label="Numero telephonique"
                    type="text"
                    fullWidth
                    value={technicine.telephone}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> Numero telephonique : {technicine.telephone}</div>
                )}
              </Grid>

              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    id="login"
                    name="login"
                    label="Login"
                    type="text"
                    fullWidth
                    value={technicine.login}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div>
                    {technicine.login === "" ? (
                      <div> aucun login affecter </div>
                    ) : (
                      <div> username : {technicine.login} </div>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    id="motDePasse"
                    name="motDePasse"
                    label="mot de passe"
                    type="text"
                    fullWidth
                    value={technicine.motDePasse}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div>
                    {technicine.motDePasse === "" ? (
                      <div> aucune mot du passe affecter </div>
                    ) : (
                      <div> mot du passe : {technicine.motDePasse} </div>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    id="suppheurePrice"
                    name="suppheurePrice"
                    label="Prix heure supplementaire"
                    type="number"
                    fullWidth
                    value={technicine.suppheurePrice}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div>
                    prix des heures supplementaire : {technicine.suppheurePrice}
                    dt
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <>
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isResponsableMaintenance"
                          checked={technicine.isResponsableMaintenance}
                        />
                      }
                      label="Responsable maintenance"
                      onChange={handelResMaint}
                    />
                    <FormControlLabel
                      control={
                        <Checkbox
                          name="isResponsableProduction"
                          checked={technicine.isResponsableProduction}
                        />
                      }
                      label="Responsable production"
                      onChange={handelResProd}
                    />
                  </>
                ) : (
                  <div>
                    Resposablitee :
                    {technicine.isResponsableMaintenance && (
                      <div> Responsable maintenance </div>
                    )}
                    {technicine.isResponsableProduction && (
                      <div> Responsable production </div>
                    )}
                    {!technicine.isResponsableMaintenance &&
                      !technicine.isResponsableProduction && (
                        <div> aucune responsblite affecter </div>
                      )}
                  </div>
                )}
              </Grid>
              {edit && (
                <>
                  <Grid item xs={8}>
                    <Button variant="contained" onClick={handelUpdate}>
                      affecter les changements
                    </Button>
                  </Grid>
                  <Grid item xs={4}>
                    <Button variant="contained" onClick={handelCancelEditMode}>
                      Annuler
                    </Button>
                  </Grid>
                </>
              )}
            </Grid>
          </form>
          <SpeedDial
            ariaLabel="Action"
            sx={{position: "absolute", bottom: 50, right: 50}}
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
      )}
    </>
  );
}
