import {
  Container,
  Fab,
  IconButton,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
} from "@mui/material";
import axios from "axios";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from "@mui/icons-material/Edit";
import AddIcon from "@mui/icons-material/Add";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";
import AddSousTraitent from "./AddSousTraitent";
import Swal from "sweetalert2";
import withReactContent from "sweetalert2-react-content";

export default function AllSousTraitents() {
  const [sousTraitents, setSousTraitence] = useState();
  const [loading, setLoading] = useState(true);
  const [addSous, setAddSous] = useState(false);

  const Myswal = withReactContent(Swal);

  const handelAddOpen = () => {
    setAddSous(true);
  };
  const handelAddClose = () => {
    setAddSous(false);
  };

  const handelDelete = code => {
    Myswal.fire({
      title: <p>vous etes sur de supprimer ce sous traitence </p>,
      icon: "question",
      showConfirmButton: true,
      showCancelButton: true,
      cancelButtonText: "Annuler",
      confirmButtonText: "Supprimer",
      cancelButtonColor: "#F21800",
    }).then(result => {
      if (result.isConfirmed) {
        axios
          .delete(`${process.env.REACT_APP_API_URL}/sousTraitence/${code}`)
          .then(response => {
            if (response.data.message === "done") {
              Myswal.fire(
                "Supprimer!",
                "le responsable est supprimer avec succes",
                "success",
              );
            } else {
              Myswal.fire("Error", "un error detecter ", "error");
            }
          });
      }
    });
  };
  useEffect(() => {
    axios
      .get(`${process.env.REACT_APP_API_URL}/sousTraitences`)
      .then(response => {
        if (response.data) {
          setSousTraitence(response.data);
          setLoading(false);
        }
      });
  }, [addSous, Myswal]);
  return (
    <>
      {loading && <Spinning />}
      {!loading && sousTraitents && (
        <>
          <div>
            <TableContainer component={Container}>
              <Table
                component={Paper}
                sx={{minWidth: 650}}
                aria-label="tous les sous traitences">
                <TableHead sx={{backgroundColor: "hsl(210 79% 46%)"}}>
                  <TableCell align="center"> Sous traitent </TableCell>
                  <TableCell align="center">
                    {" "}
                    nom de responsable / representent{" "}
                  </TableCell>
                  <TableCell align="center"> Adresss </TableCell>
                  <TableCell align="center"> Telephone </TableCell>
                  <TableCell align="center"> Fax </TableCell>
                  <TableCell align="center"></TableCell>
                  <TableCell align="center"></TableCell>
                </TableHead>
                <TableBody>
                  {sousTraitents.map(row => (
                    <TableRow>
                      <TableCell align="center">{row.sousTraitence}</TableCell>
                      <TableCell align="center"> {row.nomRep} </TableCell>
                      <TableCell align="center"> {row.adress} </TableCell>
                      <TableCell align="center"> {row.telephone} </TableCell>
                      <TableCell align="center"> {row.fax} </TableCell>

                      <TableCell>
                        <IconButton
                          aria-label="delete"
                          onClick={() => {
                            handelDelete(row.id);
                          }}>
                          <DeleteIcon />
                        </IconButton>
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
            <Fab
              color="primary"
              aria-label="add"
              onClick={handelAddOpen}
              sx={{
                position: "fixed",
                bottom: "100px",
                right: "100px",
                transform: "scale(1.3)",
              }}>
              <AddIcon />
            </Fab>
            <AddSousTraitent open={addSous} handleClose={handelAddClose} />
          </div>
        </>
      )}
    </>
  );
}
