import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Spinning from "../Spinning";
import Grid from "@mui/material/Grid";
import EditIcon from "@mui/icons-material/Edit";
import Swal from "sweetalert2";
import {
  Button,
  MenuItem,
  Select,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import withReactContent from "sweetalert2-react-content";
import {Delete} from "@mui/icons-material";

export default function ResponsabelDetails() {
  const param = useParams();
  const [responsable, setResponsable] = useState();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const [branches, setBranches] = useState();
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/responsable/${param.code}`)
      .then(response => {
        let data = response.data;
        setResponsable(data);
        setLoading(false);
      });
  }, [edit]);
  const handelBranches = async () => {
    axios.get(`${process.env.REACT_APP_API_URL}/branches`).then(response => {
      const data = response.data.branches;
      setBranches(data);
    });
    return true;
  };
  const handelChange = e => {
    setResponsable({...responsable, [e.target.name]: e.target.value});
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
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/responsable/${param.code}`)
          .then(response => {
            let data = response.data;
            console.log(data);
            if (data.message === "deleted") {
              console.log(data);
              MySwal.fire(
                "Supprimer!",
                "le responsable est supprimer avec succes",
                "success",
              );
              navigate("/responsables");
            } else {
              MySwal.fire("Error", "un error detecter ", "error");
            }
          });
      } else if (result.dismiss === Swal.DismissReason.cancel) {
        MySwal.fire("Cancelled", "les changement sont annuler", "error");
        setEdit(false);
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
          .put(
            `${process.env.REACT_APP_API_URL}/responsable/${responsable.matricule}`,
            responsable,
          )
          .then(response => {
            let data = response.data;
            if (data) {
              console.log(data);
              setResponsable(data);
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
    handelBranches().then(res => {
      if (branches) {
        setEdit(true);
      }
    });
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && responsable && Object.keys(responsable) !== 0 && (
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
                    value={responsable.nom}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> nom : {responsable.nom}</div>
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
                    value={responsable.prenom}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> Prenom : {responsable.prenom}</div>
                )}
              </Grid>
              <Grid item xs={4}>
                <div> matricule : {responsable.matricule}</div>
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
                    value={responsable.telephone}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> Numero telephonique : {responsable.telephone}</div>
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
                    value={responsable.login}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div>
                    {" "}
                    {responsable.username === "" ? (
                      <div> aucun login affecter </div>
                    ) : (
                      <div> username : {responsable.login} </div>
                    )}{" "}
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
                    value={responsable.motDePasse}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div>
                    {responsable.password === "" ? (
                      <div> aucune mot du passe affecter </div>
                    ) : (
                      <div> mot du passe : {responsable.motDePasse} </div>
                    )}
                  </div>
                )}
              </Grid>
              <Grid item xs={4}>
                {edit ? (
                  <>
                    <Select
                      onChange={handelChange}
                      defaultValue={responsable.branche}
                      id="branches"
                      variant="outlined"
                      fullWidth
                      label="branches">
                      {branches.map(branche => (
                        <MenuItem value={branche.code} key={branche.code}>
                          {branche.nom}
                        </MenuItem>
                      ))}
                    </Select>
                  </>
                ) : (
                  <div> Branche : {responsable.branche}</div>
                )}
              </Grid>
              {edit && (
                <Grid item xs={8}>
                  <Button variant="contained" onClick={handelUpdate}>
                    affecter les changements
                  </Button>
                </Grid>
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
