import {
  Button,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  MenuItem,
  Select,
  TextField,
  Typography,
} from "@mui/material";
import axios from "axios";
import React, {useState} from "react";

export default function AddCouts(props) {
  const [cout, setCout] = useState();
  const handelChanges = e => {
    setCout({...cout, [e.target.name]: e.target.value});
  };
  const handelSubmit = e => {
    e.preventDefault(e);
    let number = parseFloat(cout.Cout);
    setCout({...cout, Cout: number});
    if (props.type === "cur") {
      setCout({
        ...cout,
        Curative: props.code,
        Prevetive: null,
      });
      if (cout.Curative === props.code) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/couts`, cout)
          .then(resposne => {
            if (resposne.data) {
              props.handleClose();
            }
          });
      }
    }
    if (props.type === "prev") {
      setCout({
        ...cout,
        Curative: null,
        Preventive: props.code,
      });
      if (cout.Preventive === props.code) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/couts`, cout)
          .then(resposne => {
            if (resposne.data) {
              props.handleClose();
            }
          });
      }
    }
  };
  return (
    <>
      <Dialog open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h4"> Ajouter un cout </Typography>
          </DialogTitle>
          <DialogContent>
            <label htmlFor="type"> Type </label>
            <Select
              onChange={handelChanges}
              defaultValue=""
              name="typeDeCout"
              fullWidth
              variant="outlined">
              <MenuItem value="facture"> Facture</MenuItem>
              <MenuItem value="heureSupp"> Heure Supplementaire </MenuItem>
            </Select>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="cout"
                name="Cout"
                label="Cout"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
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
