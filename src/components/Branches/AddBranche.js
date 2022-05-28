import {
  Button,
  Dialog,
  DialogActions,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";
import {useSelector} from "react-redux";

export default function AddBranche(props) {
  const [branche, setBranche] = useState();
  const user = useSelector(state => state.userReducer.data);
  const handelChanges = e => {
    setBranche({...branche, [e.target.name]: e.target.value});
  };
  const handelSubmit = e => {
    e.preventDefault();
    setBranche({...branche, pdg: user.userID});
    if (branche.pdg === user.userID) {
      axios.post("/branches", branche).then(response => {
        if (response.data) {
          props.handleClose();
        }
      });
    }
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h3"> Ajouter un branche</Typography>
          </DialogTitle>
          <DialogTitle>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="code"
                name="code"
                label="Code branche"
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
                autoFocus
                id="nom"
                name="nom"
                label="Nom branche"
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
                autoFocus
                id="adress"
                name="adress"
                label="Adress"
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
                autoFocus
                id="pays"
                name="pays"
                label="pays"
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
                autoFocus
                id="email"
                name="email"
                label="email"
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
                autoFocus
                id="telephone"
                name="telephone"
                label="telephone"
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
                autoFocus
                id="fax"
                name="fax"
                label="fax"
                type="number"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
          </DialogTitle>{" "}
          <DialogActions>
            <Button onClick={props.handleClose}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
