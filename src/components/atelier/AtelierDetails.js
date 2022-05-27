import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import Spinning from "../Spinning";
import withReactContent from "sweetalert2-react-content";
import axios from "axios";
import EditIcon from "@mui/icons-material/Edit";
import {
  Button,
  Grid,
  SpeedDial,
  SpeedDialAction,
  SpeedDialIcon,
  TextField,
} from "@mui/material";
import {Delete} from "@mui/icons-material";

export default function AtelierDetails() {
  const param = useParams();
  const [atelier, setAtelier] = useState();
  const [loading, setLoading] = useState(true);
  const [edit, setEdit] = useState(false);
  const MySwal = withReactContent(Swal);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/atelier/${param.code}`).then(response => {
      let data = response.data;
      console.log(data);
      setAtelier(data);
      setLoading(false);
    });
  }, [edit]);

  const handelChange = e => {
    setAtelier({...atelier, [e.target.name]: e.target.value});
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
          .delete(`${process.env.REACT_APP_API_URL}/atelier/${param.code}`)
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
              navigate("/");
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
            `${process.env.REACT_APP_API_URL}/atelier/${atelier.idAtelier}`,
            atelier,
          )
          .then(response => {
            let data = response.data;
            if (data) {
              console.log(data);
              setAtelier(data);
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
      {!loading && atelier && Object.keys(atelier) !== 0 && (
        <div style={{margin: "100px"}}>
          <form>
            <Grid container spacing={8}>
              <Grid item xs={4}>
                {edit ? (
                  <TextField
                    onChange={handelChange}
                    autoFocus
                    id="nom"
                    name="nomAtelier"
                    label="Nom de l'atelier"
                    type="text"
                    fullWidth
                    value={atelier.nomAtelier}
                    variant="outlined"
                    required
                  />
                ) : (
                  <div> nom : {atelier.nomAtelier}</div>
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
