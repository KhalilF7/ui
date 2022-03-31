import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";

export default function AddAtelier(props) {
  const [atelier, setAtelier] = useState();
  const handelForm = () => {
    axios
      .post(`${process.env.REACT_APP_API_URL}/ateliers`, atelier)
      .then(response => {
        console.log(response.data);
      });
  };
  const handelChanges = e => {
    setAtelier({...atelier, [e.target.name]: e.target.value});
  };
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelForm}>
          <DialogTitle>
            <Typography variant="h3"> Ajouter un atelier</Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="nomAtelier"
                name="nomAtelier"
                label="nom de l'atelier"
                type="text"
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
    </div>
  );
}
