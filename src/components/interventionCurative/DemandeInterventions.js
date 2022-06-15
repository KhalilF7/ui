import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";

export default function DemandeInterventions(props) {
  const [intervention, setintervention] = useState({
    codeCuratif: "",
    Sympthomes: [],
    diagnostique: "",
    TypeDePanne: [],
    etatInterventions: "ouvert",
    dateFinAction: null,
    dateCloture: null,
    technicine: null,
    machine: "",
    sousTraitence: null,
  });
  const [sousTraitence, setsousTraitence] = useState();
  const [technicien, setTechnicien] = useState();
  const [interventions, setIntervention] = useState(props.interventions);
  const sympthomesChoices = [
    "Bruit",
    "Fuite d'eau",
    "Fuite d'huile",
    "Chaleur",
    "Produit non conforme",
    "Demarage anormale",
    "Arret",
  ];

  const machines = props.machines;
  const [textEnabel, setTextEnabel] = useState(true);
  const [sympthomes, setSympthomes] = useState({
    bruit: {value: "Bruit", cheked: false},
    fuitEau: {value: "Fuite d'eau", cheked: false},
    fuiteHuile: {value: "Fuite d'huile", cheked: false},
    chaleur: {value: "Chaleur", cheked: false},
    produitNonConforme: {value: "Produit non conforme", cheked: false},
    demarageAnormale: {value: "Demarage anormale", cheked: false},
    arret: {value: "Arret", cheked: false},
    autre: {value: "autre", checked: false},
  });
  const [detailSympthomes, setdetailsSympthomes] = useState();
  const enableText = () => {
    setTextEnabel(!textEnabel);
  };
  const HandelSympthome = e => {
    switch (e.target.name) {
      case "Bruit":
        setSympthomes({
          ...sympthomes,
          bruit: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Fuite d'eau":
        setSympthomes({
          ...sympthomes,
          fuitEau: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Fuite d'huile":
        setSympthomes({
          ...sympthomes,
          fuiteHuile: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Chaleur":
        setSympthomes({
          ...sympthomes,
          chaleur: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Produit non conforme":
        setSympthomes({
          ...sympthomes,
          produitNonConforme: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "Demarage anormale":
        setSympthomes({
          ...sympthomes,
          demarageAnormale: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      case "autre":
        setSympthomes({
          ...sympthomes,
          autre: {value: e.target.name, cheked: e.target.checked},
        });
        break;
      default:
        setSympthomes({
          ...sympthomes,
          arret: {value: e.target.name, cheked: e.target.checked},
        });
        break;
    }
  };

  const handelChanges = e => {
    setintervention({...intervention, [e.target.name]: e.target.value});
  };
  const handelDetails = e => {
    setdetailsSympthomes(e.target.value);
  };
  const fetchData = () => {
    axios.get(`/api/sousTraitences`).then(response => {
      setsousTraitence(response.data);
    });
    axios.get(`/api/techniciens`).then(response => {
      setTechnicien(response.data);
    });
  };
  useEffect(() => {
    fetchData();
  }, []);
  const getSelected = e => {
    HandelSympthome(e);
  };

  const handelSubmit = e => {
    e.preventDefault(e);
    var sym = [];
    sym.push(sympthomes.bruit.cheked && sympthomes.bruit.value);
    sym.push(sympthomes.fuitEau.cheked && sympthomes.fuitEau.value);
    sym.push(sympthomes.fuiteHuile.cheked && sympthomes.fuiteHuile.value);
    sym.push(sympthomes.chaleur.cheked && sympthomes.chaleur.value);
    sym.push(
      sympthomes.produitNonConforme.cheked &&
        sympthomes.produitNonConforme.value,
    );
    sym.push(
      sympthomes.demarageAnormale.cheked && sympthomes.demarageAnormale.value,
    );
    sym.push(sympthomes.arret.cheked && sympthomes.arret.value);
    sym.push(sympthomes.autre.cheked && detailSympthomes);
    sym = sym.filter(s => {
      return s !== false && s !== undefined;
    });
    let nb = 0;
    let today = new Date();
    interventions.filter(row => {
      let date = new Date(row.dateRapport);
      if (date.getFullYear() === today.getFullYear()) {
        nb++;
      }
    });

    let code = `${nb + 1}_${today.getFullYear()}`;
    setintervention({
      ...intervention,
      codeCuratif: code,
      Sympthomes: sym,
      technicines: [],
      etatInterventions: "ouvert",
    });
    if (intervention.Sympthomes.length === sym.length) {
      axios.post(`/api/InteventionCuratives`, intervention).then(response => {
        if (response.data) {
          props.handelClose();
        }
      });
    }
  };
  return (
    <>
      <Dialog open={props.open} onClose={props.handelClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h4">Demande d'intervention</Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <label htmlFor="dateRapport"> Date de Rapport </label>
              <TextField
                onChange={handelChanges}
                id="dateRapport"
                name="dateRapport"
                label=""
                type="datetime-local"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />

            {machines && (
              <>
                <label htmlFor="machine">Machine</label>
                <Select
                  onChange={handelChanges}
                  defaultValue=""
                  name="machine"
                  id="machine"
                  variant="outlined"
                  fullWidth>
                  {machines.map(machine => (
                    <MenuItem value={machine.code} key={machine.code}>
                      {machine.model}
                    </MenuItem>
                  ))}
                </Select>
              </>
            )}
            <Divider />
            <div style={{margin: "20px"}}>
              <FormLabel component="legend"> Symphtome </FormLabel>
              <FormGroup required onChange={getSelected}>
                {sympthomesChoices.map(symp => (
                  <FormControlLabel
                    key={sympthomesChoices.indexOf(symp)}
                    control={<Checkbox cheked name={symp} />}
                    label={symp}
                  />
                ))}
                <FormControlLabel
                  control={
                    <Checkbox
                      cheked={textEnabel}
                      name="autre"
                      onChange={enableText}
                    />
                  }
                  label="Autre"
                />
              </FormGroup>
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelDetails}
                autoFocus
                id="description"
                name="description"
                label="Autre sympthomes"
                type="text"
                multiline
                rows={4}
                disabled={textEnabel}
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </>
  );
}
