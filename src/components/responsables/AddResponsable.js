import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogContentText from "@mui/material/DialogContentText";
import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import axios from "axios";
import DialogTitle from "@mui/material/DialogTitle";
import {Divider} from "@mui/material";

export default function AddResponsable(props) {
  const [form, setForm] = useState({
    matricule: "",
    nom: "",
    prenom: "",
    telephone: 0,
    username: "",
    password: "",
    branche: "",
  });
  const [branches, setBranches] = useState();
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/branches`).then(response => {
      const data = response.data.branches;
      setBranches(data);
      console.log(data);
    });
  }, []);
  const handelChanges = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const handelForm = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/responsables`, form)
      .then(response => {
        const res = response.data;
        if (res.message) {
          console.log(response.data);
        } else {
          console.log(response.data);
          props.handleClose();
        }
      });
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelForm}>
          <DialogTitle>Ajouter un responsable</DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="matricule"
                name="matricule"
                label="Matricule"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />

            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="nom"
                name="nom"
                label="Nom"
                type="text"
                fullWidth
                variant="outlined"
                required
                value={form.nom}
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="prenom"
                name="prenom"
                label="Prenom"
                type="text"
                fullWidth
                required
                variant="outlined"
              />
            </div>

            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="telephone"
                name="telephone"
                label="Telephone"
                type="number"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />

            <Divider />
            <div style={{margin: "20px"}}>
              <label htmlFor="etatCivile">Branches</label>
              {branches && (
                <Select
                  onChange={handelChanges}
                  defaultValue=""
                  name="branche"
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
              )}
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="login"
                name="login"
                label="Login"
                type="text"
                fullWidth
                variant="outlined"
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="motDePasse"
                name="motDePasse"
                label="Mot de passe"
                type="text"
                fullWidth
                variant="outlined"
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
    </div>
  );
}
