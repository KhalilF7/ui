import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";

export default function AddSousTraitent(props) {
  const [sousT, setSousT] = useState();
  const handelChanges = e => {
    setSousT({...sousT, [e.target.name]: e.target.value});
  };
  const handelSubmit = e => {
    e.preventDefault(e);
    let p = Number(sousT.telephone);
    let f = Number(sousT.fax);
    setSousT({...sousT, telephone: p, fax: f});
    console.log(sousT);
    axios
      .post(`${process.env.REACT_APP_API_URL}/sousTraitences`, sousT)
      .then(response => {
        props.handleClose();
      });
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handelClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h3"> Ajouter un sous-traitent </Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="sousTraitence"
                name="sousTraitence"
                label="Sous Traitent"
                type="text"
                fullwidht
              />
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="nomRep"
                name="nomRep"
                label="Nom du responsable / representent"
                type="text"
                fullwidht
              />
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="adress"
                name="adress"
                label="Adresse"
                type="text"
                fullwidht
              />
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="telephone"
                name="telephone"
                label="Telephone"
                type="number"
                fullwidht
              />
            </div>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="fax"
                name="fax"
                label="Fax"
                type="number"
                fullwidht
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
