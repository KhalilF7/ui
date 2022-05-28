import {Typography} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";

export default function PieceDeRechange(props) {
  const [pieces, setPieces] = useState();
  const [loading, setloading] = useState(true);
  const [empty, setEmpty] = useState(false);
  useEffect(() => {
    axios.get(`/pieceDeRechange`).then(resposne => {
      if (resposne.data) {
        setPieces(resposne.data);
        setloading(false);
      } else {
        setEmpty(true);
        setloading(true);
      }
    });
  }, [props.Curative]);
  return (
    <>
      {loading && <Spinning />}
      {!loading && empty && <>Aucune piece de rechange utliser</>}
      {!loading && pieces && (
        <>
          <div>
            <Typography variant="h5"> Pieces de rechange : </Typography>
            {pieces
              .filter(p => {
                if (props.type === "cur") {
                  if (p.Curative === props.code) {
                    return p;
                  }
                } else {
                  if (p.Prevetive === props.code) {
                    return p;
                  }
                }
              })
              .map(p => (
                <div>
                  <div>piece : {p.nomPiece}</div>
                  <div> Quantitee : {p.quantite} </div>
                  <div> Prix Unitaire : {p.PrixUnitaire} </div>
                  <br />
                </div>
              ))}
          </div>
        </>
      )}
    </>
  );
}
