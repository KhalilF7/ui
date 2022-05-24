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

export default function AddPiece(props) {
  const [piece, setPiece] = useState();
  const handelSubmit = e => {
    e.preventDefault(e);
    let quan = parseFloat(piece.quantite);
    let prixu = parseFloat(piece.PrixUnitaire);
    setPiece({...piece, quantite: quan, PrixUnitaire: prixu});
    if (props.type === "cur") {
      setPiece({
        ...piece,
        Curative: props.code,
        Prevetive: null,
      });
      if (piece.Curative === props.code) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/pieceDeRechange`, piece)
          .then(resposne => {
            if (resposne.data) {
              props.handleClose();
            }
          });
      }
    }
    if (props.type === "prev") {
      setPiece({
        ...piece,
        Curative: null,
        Preventive: props.code,
      });
      if (piece.Preventive === props.code) {
        axios
          .post(`${process.env.REACT_APP_API_URL}/pieceDeRechange`, piece)
          .then(resposne => {
            if (resposne.data) {
              props.handleClose();
            }
          });
      }
    }
  };
  const handelChanges = e => {
    setPiece({...piece, [e.target.name]: e.target.value});
  };
  return (
    <>
      <Dialog open={props.open} onClose={props.handelClose}>
        <form onSubmit={handelSubmit}>
          <DialogTitle>
            <Typography variant="h4">
              {" "}
              Ajouter une piece de rechange{" "}
            </Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                id="nomPiece"
                name="nomPiece"
                label="Nom de piece"
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
                id="quantite"
                name="quantite"
                label="Quantitée"
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
                id="PrixUnitaire"
                name="PrixUnitaire"
                label="Prix Unitaire"
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
