import {Delete} from "@mui/icons-material";
import NoPhotographyIcon from "@mui/icons-material/NoPhotography";
import {Grid, SpeedDial, SpeedDialAction, SpeedDialIcon} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate, useParams} from "react-router-dom";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";
import Spinning from "../Spinning";
export default function MachinesDetails() {
  const param = useParams();
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
    axios
      .get(`${process.env.REACT_APP_API_URL}/machine/${param.code}`)
      .then(response => {
        let data = response.data;
        setMachine(data);
      });
    axios
      .get(`${process.env.REACT_APP_API_URL}/categoriMachines`)
      .then(response => {
        setCatMachine(response.data);
      });

    axios.get(`${process.env.REACT_APP_API_URL}/ateliers`).then(response => {
      setAteliers(response.data);
    });
    setLoading(false);
  };

  const handelDelete = e => {
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
              {machine.image !== null ? (
                <img
                  width="300px"
                  src={`${process.env.REACT_APP_API_URL}${machine.image}`}
                  alt=""
                />
              ) : (
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "center",
                  }}>
                  Aucune image disponible
                  <br />
                  <NoPhotographyIcon fontSize="large" color="primary" />
                </div>
              )}
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
                <div> État actuel : {machine.currentState} </div>
              </Grid>
              <Grid item xs={4}>
                <div> Heure prévue (heures): {machine.schudledTime} </div>
              </Grid>
              <Grid item xs={4}>
                <div> Pertes de temps (heures): {machine.timeLosses} </div>
              </Grid>
              <Grid item xs={4}>
                <div> Disponibilité: {machine.availibilty} % </div>
              </Grid>
              <Grid item xs={4}>
                <div> Heure prévue (heures): {machine.schudledTime} </div>
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
            </Grid>
          </form>
          {/** graphe de : nomber de panne , moyenne de temps de panne , nomber de panne selon type  */}
          <SpeedDial
            ariaLabel="Action"
            sx={{position: "fixed", bottom: 50, right: 50}}
            icon={<SpeedDialIcon />}>
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
