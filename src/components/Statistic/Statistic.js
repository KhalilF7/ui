import {
  Button,
  Container,
  Grid,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";
import moment from "moment";

export default function Statistic() {
  const [machines, setMachines] = useState();
  const [loading, setLoading] = useState(true);
  const [interventions, setInterventions] = useState();
  const [dateDebut, setDateDebut] = useState();
  const [filtred, setFiltred] = useState();
  const [dateFin, setDateFin] = useState();
  const [machine, setMachine] = useState();
  const [couts, setCouts] = useState();
  const [pieceDeRechange, setPieceDeRechange] = useState();
  const [technicines, setTechniciens] = useState();

  const handelDateDebut = e => {
    setDateDebut(e.target.value);
  };
  const handelDateFin = e => {
    setDateFin(e.target.value);
  };
  const handelMachine = e => {
    setMachine(e.target.value);
  };
  const handelSubmit = e => {
    let debut = new Date(dateDebut);
    let fin = new Date(dateFin);
    setFiltred(
      interventions.filter(intervention => {
        let dateD = new Date(intervention.dateRapport);
        let dateF = new Date(intervention.dateCloture);
        if (intervention.etatInterventions === "cloture") {
          if (machine === "all") {
            if (moment(dateD).isAfter(debut) && moment(dateF).isBefore(fin)) {
              return intervention;
            }
          } else if (intervention.machine === machine) {
            if (moment(dateD).isAfter(debut) && moment(dateF).isBefore(fin)) {
              return intervention;
            }
          }
        }
      }),
    );
  };
  const fetchData = () => {
    axios.get(`/api/InteventionCuratives`).then(response => {
      setInterventions(response.data);
    });
    axios.get(`/api/machines`).then(response => {
      setMachines(response.data);
    });
    axios.get(`/api/couts`).then(resposne => {
      if (resposne.data) {
        setCouts(resposne.data);
      }
    });
    axios.get(`/api/pieceDeRechange`).then(resposne => {
      if (resposne.data) {
        setPieceDeRechange(resposne.data);
      }
    });
    axios.get(`/api/techniciens`).then(response => {
      setTechniciens(response.data);
    });
    setLoading(false);
  };
  const getTbar = () => {
    let Dt = 0;
    filtred.map(f => {
      let a = moment(f.dateRapport);
      let b = moment(f.dateCloture);
      let res = b.diff(a, "minutes");

      Dt += res;
    });
    return Dt / filtred.length;
  };
  const mttr = () => {
    let ttr = 0;
    filtred.map(f => {
      let a = moment(f.dateDebutAction);
      let b = moment(f.dateFinAction);
      let res = b.diff(a, "minutes");

      ttr += res;
    });
    return ttr / filtred.length;
  };
  const minutToHour = d => {
    d = Number(d);
    let h = Math.floor(d / 60);
    return h;
  };
  useEffect(() => {
    fetchData();
  }, []);
  const coutTotal = () => {
    let total = 0;
    let duration = mttr();
    filtred.map(f => {
      if (couts) {
        couts.map(c => {
          if (c.Curative === f.codeCuratif) {
            total += c.Cout;
          }
        });
      }
      if (pieceDeRechange) {
        pieceDeRechange.map(p => {
          if (p.Curative === f.codeCuratif) {
            total += p.PrixUnitaire * p.quantite;
          }
        });
      }
      if (
        technicines &&
        filtred.technicines &&
        filtred.technicines.length !== 0
      ) {
        technicines.map(t => {
          filtred.technicines.map(ft => {
            if (t.matricule === ft) {
              if (t.suppheurePrice !== 0) {
                total += t.suppheurePrice * minutToHour(duration);
              }
            }
          });
        });
      }
    });
    return total;
  };

  const CountMec = () => {
    let n = 0;
    filtred.map(f => {
      if (f.TypeDePanne) {
        f.TypeDePanne.map(t => {
          if (t === "Mécanique") {
            n++;
          }
        });
      }
    });
    return n;
  };

  const CountElec = () => {
    let n = 0;
    filtred.map(f => {
      if (f.TypeDePanne) {
        f.TypeDePanne.map(t => {
          if (t === "Électrique") {
            n++;
          }
        });
      }
    });
    return n;
  };

  const CountPne = () => {
    let n = 0;
    filtred.map(f => {
      if (f.TypeDePanne) {
        f.TypeDePanne.map(t => {
          if (t === "Pneumatique") {
            n++;
          }
        });
      }
    });
    return n;
  };

  const Counthyd = () => {
    let n = 0;
    filtred.map(f => {
      if (f.TypeDePanne) {
        f.TypeDePanne.map(t => {
          if (t === "Hydraulique") {
            n++;
          }
        });
      }
    });
    return n;
  };

  const CountAutre = () => {
    let n = 0;
    filtred.map(f => {
      if (f.TypeDePanne) {
        f.TypeDePanne.map(t => {
          if (t === "Autre") {
            n++;
          }
        });
      }
    });
    return n;
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && machines && interventions && (
        <>
          <div
            style={{
              margin: "20px",
              display: "flex",
              flexDirection: "row",
              justifyContent: "space-around",
            }}>
            <div>
              <label htmlFor="dateDebut"> De : </label>
              <TextField
                onChange={handelDateDebut}
                id="date"
                name="dateDebut"
                label=""
                type="datetime-local"
                variant="outlined"
                required
              />
            </div>
            <div>
              <label htmlFor="dateFin"> A : </label>
              <TextField
                onChange={handelDateFin}
                id="date"
                name="dateFin"
                label=""
                type="datetime-local"
                variant="outlined"
                required
              />
            </div>
            <div>
              {machines && (
                <>
                  <label htmlFor="machine">Machine : </label>
                  <Select
                    onChange={handelMachine}
                    defaultValue=""
                    name="machine"
                    id="machine"
                    variant="outlined">
                    <MenuItem value="all"> Tout </MenuItem>
                    {machines.map(machine => (
                      <MenuItem value={machine.code} key={machine.code}>
                        {machine.model}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </div>
            <div>
              <Button onClick={handelSubmit} variant="contained">
                {" "}
                Chercher{" "}
              </Button>
            </div>
          </div>
          <Container>
            <>
              {filtred && (
                <>
                  {filtred.length !== 0 && (
                    <>
                      <Grid container spacing={2}>
                        <Grid item xs={4}>
                          <Typography variant="body2">
                            {" "}
                            Nombre d'interventions :{" "}
                          </Typography>
                          <Typography variant="subtitle1">
                            {filtred.length}
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography varaint="body2">
                            moyenne de temps d'arrêt :
                          </Typography>
                          <Typography variant="subtitle1">
                            {getTbar()} minuts
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography varaint="body2">
                            moyenne de temps du reparations :
                          </Typography>
                          <Typography variant="subtitle1">
                            {mttr()} minuts
                          </Typography>
                        </Grid>
                        <Grid item xs={4}>
                          <Typography varaint="body2">
                            Montant tôtale :
                          </Typography>
                          <Typography variant="subtitle1">
                            {coutTotal()} €
                          </Typography>
                        </Grid>
                        <Grid item xs={8}>
                          <Typography varaint="body2">
                            Types de panne :
                          </Typography>
                          <div
                            style={{
                              display: "flex",
                              justifyContent: "space-around",
                            }}>
                            <Typography variant="subtitle1">
                              Mécanique: {CountMec()}
                            </Typography>
                            <Typography variant="subtitle1">
                              Électrique : {CountElec()}
                            </Typography>
                            <Typography variant="subtitle1">
                              Pneumatique : {CountPne()}
                            </Typography>
                            <Typography variant="subtitle1">
                              Hydraulique : {Counthyd()}
                            </Typography>
                            <Typography variant="subtitle1">
                              Autre : {CountAutre()}
                            </Typography>
                          </div>
                        </Grid>
                      </Grid>
                    </>
                  )}

                  {filtred.length === 0 && <>no data </>}
                </>
              )}
            </>
          </Container>
        </>
      )}
    </>
  );
}
