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
import FormControl from "@mui/material/FormControl";
import DialogTitle from "@mui/material/DialogTitle";
import {Divider} from "@mui/material";

export default function AddResponsable(props) {
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
  const handelChanges = (e, column) => {
    setForm({...form, [column]: e.target.value});
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
          <DialogTitle>Subscribe</DialogTitle>
          <DialogContent>
            <DialogContentText>
              Ajouter un responsable du branche
            </DialogContentText>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={e => {
                  handelChanges(e, "matricule");
                }}
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
                onChange={e => {
                  handelChanges(e, "cin");
                }}
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
                onChange={e => {
                  handelChanges(e, "nom");
                }}
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
                onChange={e => {
                  handelChanges(e, "prenom");
                }}
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
                onChange={e => {
                  handelChanges(e, "dateNaissance");
                }}
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={e => {
                  handelChanges(e, "email");
                }}
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
                onChange={e => {
                  handelChanges(e, "telephone");
                }}
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
                  handelChanges(e, "etatCivile");
                }}
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
              <label htmlFor="etatCivile">Branches</label>
              {branches && (
                <Select
                  onChange={e => {
                    handelChanges(e, "branche");
                  }}
                  defaultValue=""
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
                onChange={e => {
                  handelChanges(e, "username");
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
                  handelChanges(e, "password");
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
