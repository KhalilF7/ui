import React, {useState, useEffect} from "react";
import {useNavigate, useParams} from "react-router-dom";
import axios from "axios";
import HomeRepairServiceIcon from "@mui/icons-material/HomeRepairService";
import EditIcon from "@mui/icons-material/Edit";
import SaveIcon from "@mui/icons-material/Save";
import PaidIcon from "@mui/icons-material/Paid";
import moment from "moment";
import {
  Button,
  Checkbox,
  Container,
  Fab,
  FormControlLabel,
  FormGroup,
  FormLabel,
  Grid,
  IconButton,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import dateFormat from "dateformat";
import Spinning from "../Spinning";
import {useSelector} from "react-redux";
import AddCouts from "../Couts/AddCouts";
import HandymanIcon from "@mui/icons-material/Handyman";
import Couts from "../Couts/Couts";
import AddPiece from "../PieceDeRechange/AddPiece";
import PieceDeRechange from "../PieceDeRechange/PieceDeRechange";
export default function InterventionsDetails() {
  const user = useSelector(state => state.userReducer.data);
  const param = useParams();
  const [intervention, setIntevention] = useState();
  const [temp, setTemp] = useState();
  const TID = [];
  const [addCout, setAddCouts] = useState(false);
  const [Addpiece, setAddPieci] = useState(false);
  const [loading, setLoading] = useState(true);
  const [machine, setMachine] = useState();
  const [techniciens, setTechniciens] = useState();
  const [technicien, setTechnicien] = useState();
  const [sousTraitence, setSousTraitence] = useState();
  const [sousT, setSoust] = useState(false);
  const [equipeIntern, setEquipInterne] = useState(false);
  const [diagnostiqueUpdate, setDiagnotiqueUpdate] = useState(false);
  const [diagnostique, setDiagnotique] = useState();
  const [updateDebut, setUpdateDebut] = useState(false);
  const [updateFin, setUpdateFin] = useState(false);
  const [typePanne, setTypePanne] = useState({
    mec: {value: "Mécanique", cheked: false},
    elc: {value: "Électrique", cheked: false},
    pne: {value: "Pneumatique", cheked: false},
    hyd: {value: "Hydraulique", cheked: false},
    autre: {value: "Autre", checked: false},
  });
  const [etatMachine, setEtatMahine] = useState();
  const setMachineStatus = e => {
    setEtatMahine({[e.target.name]: e.target.value});
  };
  const handelAddCout = () => {
    setAddCouts(true);
  };
  const handelCloseCout = () => {
    setAddCouts(false);
  };
  const handelAddPiece = () => {
    setAddPieci(true);
  };
  const handelClosePiece = () => {
    setAddPieci(false);
  };
  const [st, setSt] = useState();

  useEffect(() => {
    axios.get(`/api/technicien/${user.userID}`).then(response => {
      let data = response.data;
      setTechnicien(data);
    });
    fetchData();
  }, [addCout, Addpiece]);
  const handelUpdateDebut = () => {
    setUpdateDebut(!updateDebut);
  };
  const handelUpdatefin = () => {
    setUpdateFin(!updateFin);
  };

  const setUpdate = () => {
    setDiagnotiqueUpdate(true);
  };
  const handelDiagnostique = e => {
    setDiagnotique(e.target.value);
  };
  const getDT = () => {
    let a = moment(intervention.dateRapport);
    let b = moment(intervention.dateCloture);
    return b.diff(a, "minutes");
  };
  const getTTR = () => {
    let a = moment(intervention.dateDebutAction);
    let b = moment(intervention.dateFinAction);
    return b.diff(a, "minutes");
  };
  const HandelPanne = e => {
    switch (e.target.name) {
      case "Mécanique":
        setTypePanne({
          ...typePanne,
          mec: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Électrique":
        setTypePanne({
          ...typePanne,
          elc: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Pneumatique":
        setTypePanne({
          ...typePanne,
          pne: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      default:
        setTypePanne({
          ...typePanne,
          hyd: {value: e.target.name, cheked: e.target.checked},
        });
    }
  };
  const enableSousTraitence = () => {
    setSoust(!sousT);
  };
  const eanbelEquipe = () => {
    setEquipInterne(!equipeIntern);
  };
  const handelChanges = e => {
    setTemp({...temp, [e.target.name]: e.target.value});
  };
  const handelTechs = e => {
    if (e.target.checked === true) {
      TID.push(e.target.value);
    } else {
      TID.pop(e.target.value);
    }
  };
  const setdebutAction = () => {
    let date = new Date();

    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      dateDebutAction: date,
      etatInterventions: "encours",
    });

    if (
      temp.dateDebutAction &&
      temp.dateDebutAction !== undefined &&
      temp.dateDebutAction !== null
    ) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
        });
    }
  };
  const setFinAction = () => {
    let date = new Date();
    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      dateFinAction: date,
      etatInterventions: "achieve",
    });
    if (
      temp.dateFinAction &&
      temp.dateFinAction !== undefined &&
      temp.dateFinAction !== null
    ) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
        });
    }
  };
  const setPanne = () => {
    var tp = [];
    tp.push(typePanne.mec.cheked && typePanne.mec.value);
    tp.push(typePanne.elc.cheked && typePanne.elc.value);
    tp.push(typePanne.pne.cheked && typePanne.pne.value);
    tp.push(typePanne.hyd.cheked && typePanne.hyd.value);
    tp = tp.filter(t => {
      return t !== false && t !== undefined;
    });
    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      TypeDePanne: tp,
    });
    if (temp.TypeDePanne.length === tp.length) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
        });
    }
  };
  const getSt = code => {
    axios.get(`/api/sousTraitence/${code}`).then(resposne => {
      setSt(resposne.data);
    });
  };
  const getTechnice = mat => {
    let result;
    techniciens.map(t => {
      if (t.matricule === mat) {
        result = `${t.nom} ${t.prenom}`;
      }
    });
    return result;
  };
  const getDate = date => {
    if (date !== null && date !== undefined) {
      let d = new Date(date);
      return dateFormat(d, " d/mm/yyyy ");
    }
  };

  const getTime = date => {
    if (date !== null && date !== undefined) {
      let d = new Date(date);
      return dateFormat(d, "  h:MM TT");
    }
  };
  const handelUpdate = () => {
    setTemp({
      ...temp,
      technicines: TID,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
    });

    if (temp !== undefined && temp.codeCuratif) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
          if (updateDebut) {
            setUpdateDebut();
          }
          if (updateFin) {
            setUpdateFin();
          }
        });
    }
  };
  const fetchData = () => {
    axios.get(`/api/InterventionCurative/${param.code}`).then(response => {
      let data = response.data;
      setIntevention(data);
      axios.get(`/api/machine/${data.machine}`).then(response => {
        let data = response.data;
        setMachine(data);
      });
      axios.get(`/api/techniciens`).then(response => {
        let data = response.data;
        setTechniciens(data);
      });
      axios.get(`/api/sousTraitences`).then(response => {
        let data = response.data;
        setSousTraitence(data);
      });
    });
    setLoading(false);
  };
  const handelTimeUpdate = e => {
    setTemp({...temp, [e.target.name]: e.target.value});
  };

  const updateDiagnostique = () => {
    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      diagnostique: diagnostique,
    });
    if (temp !== undefined && temp.codeCuratif) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
        });
    }
  };
  const setCloture = () => {
    let date = new Date();
    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      dateCloture: date,
      etatInterventions: "cloture",
    });
    if (temp !== undefined) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          axios.get(`/api/machine/${intervention.machine}`).then(response => {
            let m = response.data;
            let tmp = {
              code: m.code,
              brand: m.brand,
              model: m.model,
              anneeManifacture: m.anneeManifacture,
              currentState: etatMachine.etat,
              schudledTime: m.schudledTime,
              timeLosses: m.timeLosses,
              descriptions: m.descriptions,
              availibilty: m.availibilty,
              type: m.type,
              atelier: m.atelier,
            };

            axios
              .patch(`/api/machine/${intervention.machine}`, tmp)
              .then(response => {});
          });
          setIntevention(response.data);

          setTemp({});
          setLoading(false);
        });
    }
  };
  const setNonCloture = () => {
    setTemp({
      ...temp,
      machine: intervention.machine,
      codeCuratif: intervention.codeCuratif,
      dateRapport: intervention.dateRapport,
      dateFinAction: null,
      etatInterventions: "encours",
    });

    if (temp !== undefined) {
      setLoading(true);
      axios
        .patch(`/api/InterventionCurative/${param.code}`, temp)
        .then(response => {
          setIntevention(response.data);
          setTemp({});
          setLoading(false);
        });
    }
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && intervention && machine && techniciens && (
        <div
          style={{
            margin: "100px",
            display: "flex",
            justifyContent: "space-evenly",
          }}>
          <form>
            <div>
              <h3> code Intervention (1) : </h3>
              <div>{intervention.codeCuratif}</div>
            </div>
            <Grid
              container
              justifyContent="space-around"
              alignItems="center"
              sapcing={2}>
              <Grid item xs={4}>
                <div>
                  <h3> Date rapport (2) : </h3>
                  <div>
                    {getDate(intervention.dateRapport)}|
                    {getTime(intervention.dateRapport)}
                  </div>
                </div>
              </Grid>
              <Grid item xs={4}>
                <h3> Equipement (3): </h3>
                <div>
                  {machine.code} / {machine.model}
                </div>
              </Grid>
              <Grid item xs={4}>
                <div>
                  <h3>Sympthômes (4) :</h3>
                  <div>
                    {intervention.Sympthomes.map(sym => (
                      <div>{sym}</div>
                    ))}
                  </div>
                </div>
              </Grid>
              <Grid>
                <h3> Etat (5) : </h3>
                <div>{machine.currentState}</div>
              </Grid>
              <Grid item xs={4}>
                <div style={{margin: "20px"}}>
                  <h3>Date de Début intervention (6) :</h3>
                  <div>
                    {intervention.dateDebutAction === undefined ||
                    intervention.dateDebutAction === null ? (
                      <>
                        <div> Aucune action</div>
                        {user.profile === "tech" && (
                          <Button variant="contained" onClick={setdebutAction}>
                            {" "}
                            Début intervention{" "}
                          </Button>
                        )}
                      </>
                    ) : (
                      <>
                        <>
                          {updateDebut ? (
                            <>
                              <TextField
                                onChange={handelTimeUpdate}
                                id="dateDebutAction"
                                name="dateDebutAction"
                                type="datetime-local"
                                fullWidth
                                variant="outlined"
                                required
                              />
                              <IconButton
                                color="primary"
                                size="large"
                                onClick={handelUpdate}>
                                <SaveIcon />
                              </IconButton>
                            </>
                          ) : (
                            <>
                              <span style={{margin: "10px"}}>
                                {getDate(intervention.dateDebutAction)}
                                {getTime(intervention.dateDebutAction)}
                              </span>
                              {user.profile === "tech" && (
                                <IconButton
                                  color="primary"
                                  size="large"
                                  onClick={handelUpdateDebut}>
                                  <EditIcon />
                                </IconButton>
                              )}
                            </>
                          )}
                        </>
                      </>
                    )}
                  </div>
                </div>
              </Grid>
              {intervention.etatInterventions !== "ouvert" && (
                <>
                  <Grid item xs={4}>
                    <div>
                      <h3>Maintenance realiser par(7) :</h3>
                      <div>
                        {intervention.sousTraitence === null &&
                        intervention.technicines.length === 0 ? (
                          <>
                            Aucun personel/sous traitent effectue a cette
                            intervention
                            {user.profile === "tech" && (
                              <div style={{margin: "10px"}}>
                                <FormLabel component="legend">
                                  Realiser par :
                                </FormLabel>
                                <FormGroup>
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="sous Traintance"
                                        onChange={enableSousTraitence}
                                      />
                                    }
                                    label="sousTraitence"
                                  />
                                  <FormControlLabel
                                    control={
                                      <Checkbox
                                        name="Equipe interne "
                                        onChange={eanbelEquipe}
                                      />
                                    }
                                    label="Equipe interne"
                                  />
                                </FormGroup>
                              </div>
                            )}
                            {sousTraitence && sousT && (
                              <>
                                <label htmlFor="sousTraitence">
                                  SousTraitence
                                </label>
                                <Select
                                  onChange={handelChanges}
                                  name="sousTraitence"
                                  id="sousTraitence"
                                  defaultValue=""
                                  variant="outlined"
                                  fullWidth>
                                  {sousTraitence.map(sous => (
                                    <MenuItem value={sous.id} key={sous.id}>
                                      {sous.sousTraitence}
                                    </MenuItem>
                                  ))}
                                </Select>
                              </>
                            )}
                            {techniciens && equipeIntern && (
                              <>
                                <label htmlFor="technicine">Technicine</label>
                                <>
                                  <FormLabel component="legend">
                                    techniciens
                                  </FormLabel>
                                  <FormGroup required onChange={handelTechs}>
                                    {techniciens.map(T => (
                                      <FormControlLabel
                                        key={T.matricule}
                                        control={
                                          <Checkbox
                                            cheked
                                            value={T.matricule}
                                          />
                                        }
                                        label={T.nom}
                                      />
                                    ))}
                                  </FormGroup>
                                </>
                              </>
                            )}
                            {(equipeIntern || sousT) && (
                              <div style={{margin: "10px"}}>
                                <Button
                                  variant="contained"
                                  onClick={handelUpdate}>
                                  Affecter mise a jour{" "}
                                </Button>
                              </div>
                            )}
                          </>
                        ) : (
                          <>
                            <Grid container spacing={4}>
                              <Grid item>
                                <>
                                  <div>
                                    <h5> technicines : </h5>
                                    {intervention.technicines.length !== 0 && (
                                      <>
                                        {intervention.technicines.map(t => (
                                          <div>{getTechnice(t)}</div>
                                        ))}
                                      </>
                                    )}
                                  </div>
                                </>
                              </Grid>
                              <br />
                              <Grid item>
                                {intervention.sousTraitence !== null &&
                                  st === undefined &&
                                  getSt(intervention.sousTraitence)}
                                {st && (
                                  <>
                                    <div>
                                      <h5> nom sous traitent : </h5>{" "}
                                      {st.sousTraitence}
                                    </div>
                                    <div>
                                      <h5> Adress : </h5> {st.adress}
                                    </div>
                                    <div>
                                      <h5> Telephone : </h5> {st.telephone}
                                    </div>
                                  </>
                                )}
                              </Grid>
                            </Grid>
                          </>
                        )}
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div>
                      <h3>Diagnostique et rapport(8-9) :</h3>
                      <div>
                        {intervention.diagnostique === "" ? (
                          <>
                            {diagnostiqueUpdate ? (
                              <>
                                <TextField
                                  onChange={handelDiagnostique}
                                  id="diagnostique"
                                  name="diagnostique"
                                  label="Diagnostique et rapport"
                                  type="text"
                                  multiline
                                  rows={4}
                                  fullWidth
                                  variant="outlined"
                                  required
                                />
                                <Button
                                  onClick={updateDiagnostique}
                                  variant="contained">
                                  Ajouter
                                </Button>
                              </>
                            ) : (
                              <>
                                Aucun diagnostique
                                {user.profile === "tech" && (
                                  <>
                                    <Button
                                      onClick={setUpdate}
                                      variant="contained"
                                      startIcon={<EditIcon />}>
                                      Ajouter
                                    </Button>
                                  </>
                                )}
                              </>
                            )}
                          </>
                        ) : (
                          <>{intervention.diagnostique}</>
                        )}
                      </div>
                    </div>
                  </Grid>

                  <Grid item xs={4}>
                    <div style={{margin: "20px"}}>
                      <h3>Date de Fin d'intervention (10):</h3>
                      <div>
                        {intervention.dateFinAction === "" ||
                        intervention.dateFinAction === null ? (
                          <>
                            <div> Aucune action</div>
                            {user.profile === "tech" && (
                              <Button
                                variant="contained"
                                onClick={setFinAction}>
                                Fin intervention intervention{" "}
                              </Button>
                            )}
                          </>
                        ) : (
                          <>
                            {updateFin ? (
                              <>
                                {" "}
                                <TextField
                                  onChange={handelTimeUpdate}
                                  id="dateFinAction"
                                  name="dateFinAction"
                                  type="datetime-local"
                                  fullWidth
                                  variant="outlined"
                                  required
                                />
                                <IconButton
                                  color="primary"
                                  size="large"
                                  onClick={handelUpdate}>
                                  <SaveIcon />
                                </IconButton>
                              </>
                            ) : (
                              <>
                                <span style={{margin: "10px"}}>
                                  {getDate(intervention.dateFinAction)}{" "}
                                  {getTime(intervention.dateFinAction)}
                                </span>
                                <IconButton
                                  color="primary"
                                  size="large"
                                  onClick={handelUpdatefin}>
                                  <EditIcon />
                                </IconButton>
                              </>
                            )}{" "}
                          </>
                        )}
                      </div>
                    </div>
                  </Grid>
                  {user.profile === "tech" && (
                    <>
                      {technicien.isResponsableProduction && (
                        <Grid item xs={4}>
                          <div style={{margin: "20px"}}>
                            <h3>Date de clôture intervention(11) :</h3>
                            <div>
                              {intervention.dateCloture === "" ||
                              intervention.dateCloture === null ? (
                                <>
                                  <div>
                                    valider l'intervention et le clôturer
                                  </div>
                                  <div
                                    style={{
                                      display: "flex",
                                      padding: 1,
                                      alignItems: "center",
                                      justifyContent: "space-between",
                                    }}>
                                    <label htmlFor="etat"> Etat machine </label>
                                    <Select
                                      name="etat"
                                      variant="outlined"
                                      onChange={setMachineStatus}
                                      defaultValue="fonction">
                                      <MenuItem value="fonction">
                                        Bon fonctionnement
                                      </MenuItem>
                                      <MenuItem value="degradee">
                                        Dégradée
                                      </MenuItem>
                                    </Select>
                                    <Button
                                      color="success"
                                      sx={{
                                        margin: "10px",
                                      }}
                                      variant="contained"
                                      onClick={setCloture}>
                                      Validé
                                    </Button>

                                    <Button
                                      sx={{
                                        margin: "10px",
                                      }}
                                      color="error"
                                      variant="contained"
                                      onClick={setNonCloture}>
                                      Non Validé
                                    </Button>
                                  </div>
                                </>
                              ) : (
                                <>
                                  {getDate(intervention.dateCloture)}{" "}
                                  {getTime(intervention.dateCloture)}
                                </>
                              )}
                            </div>
                          </div>
                        </Grid>
                      )}
                      {!technicien.isResponsableProduction && (
                        <Grid item xs={4}>
                          <div style={{margin: "20px"}}>
                            <h3>Date de clôture intervention :</h3>
                            <div>
                              {intervention.dateCloture === "" ||
                              intervention.dateCloture === null ? (
                                <>
                                  <div> En attente la validation </div>
                                </>
                              ) : (
                                <>
                                  {" "}
                                  {getDate(intervention.dateCloture)}
                                  {getTime(intervention.dateCloture)}
                                </>
                              )}
                            </div>
                          </div>
                        </Grid>
                      )}
                    </>
                  )}
                </>
              )}
            </Grid>
            <div
              style={{
                margin: 100,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
              }}>
              <Grid container spacing={2}>
                <Grid item xs={4}>
                  <Couts type="cur" code={intervention.codeCuratif} />
                  <AddCouts
                    type="cur"
                    code={intervention.codeCuratif}
                    open={addCout}
                    handleClose={handelCloseCout}
                  />
                  <br />
                </Grid>
                <Grid item xs={4}>
                  <PieceDeRechange type="cur" code={intervention.codeCuratif} />
                  <AddPiece
                    type="cur"
                    code={intervention.codeCuratif}
                    open={Addpiece}
                    handleClose={handelClosePiece}
                  />
                  <br />
                </Grid>
              </Grid>
            </div>
            <Container>
              {intervention.etatInterventions === "cloture" && (
                <div
                  style={{
                    display: "flex",
                    justifyContent: "space-around",
                    alignItems: "center",
                  }}>
                  <Grid item xs={4}>
                    <h3>Temps d'arrêt :</h3>
                    <Typography variant="subtitle1">
                      {getDT()} minuts
                    </Typography>
                  </Grid>
                  <Grid item xs={4}>
                    <h3>Temps du reparations :</h3>
                    <Typography variant="subtitle1">
                      {getTTR()} minuts
                    </Typography>
                  </Grid>
                </div>
              )}
            </Container>
          </form>
          <Fab
            color="primary"
            onClick={handelAddPiece}
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: "60px",
              right: "60px",
              transform: "scale(1.3)",
            }}>
            <HandymanIcon />
          </Fab>
          <Fab
            color="primary"
            onClick={handelAddCout}
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: "150px",
              right: "60px",
              transform: "scale(1.3)",
            }}>
            <PaidIcon />
          </Fab>
        </div>
      )}
    </>
  );
}
