import axios from "axios";
import React, {useEffect, useState} from "react";
import Button from "@mui/material/Button";
import TextField from "@mui/material/TextField";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";

import MenuItem from "@mui/material/MenuItem";
import Select from "@mui/material/Select";
import DialogTitle from "@mui/material/DialogTitle";
import {Divider, Typography} from "@mui/material";
import {useSelector} from "react-redux";

export default function AddTechniciens(props) {
  const user = useSelector(state => state.userReducer.data);
  const [form, setForm] = useState({
    cin: "",
    matricule: "",
    nom: "",
    prenom: "",
    dateNaissance: new Date(),
    email: "",
    telephone: 0,
    etatCivile: "",
    isDeleted: false,
    username: "",
    password: "",
    branche: user["branche"],
    isResponsableMaintenance: false,
    isResponsableProduction: false,
    suppheurePrice: "",
  });

  const handelChanges = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const handelForm = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/techniciens`, form)
      .then(response => {
        console.log(response.data);
      });
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelForm}>
          <DialogTitle>
            <Typography variant="h3"> Ajouter un technicien</Typography>
          </DialogTitle>
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
                id="cin"
                name="cin"
                label="CIN"
                type="number"
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
              <label htmlFor="dateNaissane"> Date de naissance : </label>
              <TextField
                required
                id="dateNaissance"
                name="dateNaissance"
                type="date"
                fullWidth
                onChange={handelChanges}
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="email"
                name="email"
                label="Email"
                type="email"
                fullWidth
                variant="outlined"
                required
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
            <div style={{margin: "20px"}}>
              <label htmlFor="etatCivile">Etat civile</label>
              <Select
                onChange={e => {
                  handelChanges(e);
                }}
                name="etatCivile"
                defaultValue=""
                labelId="etatCivile"
                id="etatCivile"
                variant="outlined"
                fullWidth
                label="etat civile">
                <MenuItem value={"celebataire"}>Celebataire</MenuItem>
                <MenuItem value={"mariee"}>Mariée</MenuItem>
                <MenuItem value={"divorser"}>Divorsé</MenuItem>
              </Select>
            </div>

            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={e => {
                  handelChanges(e);
                }}
                id="username"
                name="username"
                label="Login"
                type="text"
                fullWidth
                variant="outlined"
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={e => {
                  handelChanges(e);
                }}
                id="password"
                name="password"
                label="Mot de passe"
                type="text"
                fullWidth
                variant="outlined"
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={e => {
                  handelChanges(e);
                }}
                required
                id="suppheurePrice"
                name="suppheurePrice"
                label="Prix d'heure supplementaire"
                type="number"
                fullWidth
                variant="outlined"
              />
            </div>
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
