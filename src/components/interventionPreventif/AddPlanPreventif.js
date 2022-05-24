import {
  Button,
  Checkbox,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  FormControlLabel,
  FormGroup,
  FormLabel,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";

export default function AddPlanPreventif(props) {
  const [preventif, setPrevetif] = useState();
  var techs = [];
  const [techniciens, setTechniciens] = useState(props.techniciens);
  const [machines, setMachines] = useState(props.machines);
  const handelTechs = e => {
    if (e.target.checked === true) {
      techs.push(e.target.value);
    } else {
      techs.pop(e.target.value);
    }
    console.log(techs);
  };
  const handelSubmit = e => {
    e.preventDefault(e);
    setPrevetif({...preventif, technicines: techs});
    if (preventif.technicines && preventif.technicines.length > 0) {
      axios
        .post(`${process.env.REACT_APP_API_URL}/preventives`, preventif)
        .then(response => {
          console.log(response);
        });
    }
  };
  const handelChanges = e => {
    setPrevetif({...preventif, [e.target.name]: e.target.value});
  };
  return (
    <>
      <Dialog open={props.open} onClose={props.handelClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h4">
              {" "}
              Ajouter un intervention preventif{" "}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="codePreventif"
                name="codePreventif"
                label="Code "
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <div style={{margin: "20px"}}>
              <label htmlFor="dateRapport"> Date d'action </label>
              <TextField
                onChange={handelChanges}
                id="date"
                name="dateRapport"
                label=""
                type="datetime-local"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="Description"
                name="Description"
                label="Description"
                type="text"
                multiline
                rows={4}
                fullWidth
                variant="outlined"
                required
              />
            </div>
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
            {techniciens && (
              <>
                <FormLabel component="legend"> Techniciens </FormLabel>
                <FormGroup required onChange={handelTechs}>
                  {techniciens.map(T => (
                    <FormControlLabel
                      key={T.matricule}
                      control={<Checkbox cheked value={T.matricule} />}
                      label={T.nom}
                    />
                  ))}
                </FormGroup>
              </>
            )}
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
