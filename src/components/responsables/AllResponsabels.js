import AddIcon from "@mui/icons-material/Add";
import {
  TableContainer,
  Paper,
  Table,
  TableHead,
  TableRow,
  TableCell,
  Container,
  TableBody,
  Fab,
  Tooltip,
} from "@mui/material";
import axios from "axios";
import React, {useEffect, useState} from "react";
import {useNavigate} from "react-router-dom";
import Spinning from "../Spinning";
import AddResponsable from "./AddResponsable";

export default function AllResponsabels() {
  const [responsabels, setResponsables] = useState();
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const navigate = useNavigate();
  useEffect(() => {
    axios.get(`/api/responsables`).then(response => {
      let data = response.data;
      setResponsables(data);

      setLoading(false);
    });
  }, []);
  const hadelRedirect = code => {
    navigate(`${code}`);
  };
  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleClose = () => {
    setDialog(false);
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && responsabels && Object.keys(responsabels) !== 0 && (
        <div>
          <TableContainer component={Container}>
            <Table
              component={Paper}
              sx={{minWidth: 650}}
              aria-label="tous les responsables">
              <TableHead sx={{backgroundColor: "hsl(210 79% 46%)"}}>
                <TableRow>
                  <TableCell sx={{fontWeight: "bold"}} align="center">
                    Matricule
                  </TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="center">
                    Nom
                  </TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="center">
                    Prenom
                  </TableCell>
                  <TableCell sx={{fontWeight: "bold"}} align="center">
                    Branche
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {responsabels.map(row => (
                  <Tooltip title="detail" placement="top">
                    <TableRow
                      onClick={() => {
                        hadelRedirect(row.matricule);
                      }}
                      key={row.matricule}
                      sx={{
                        ":hover": {
                          backgroundColor: "#8aa8ff",
                        },
                        cursor: "pointer",
                      }}>
                      <TableCell align="center">{row.matricule}</TableCell>
                      <TableCell align="center">{row.nom}</TableCell>
                      <TableCell align="center">{row.prenom}</TableCell>
                      <TableCell align="center">{row.branche}</TableCell>
                    </TableRow>
                  </Tooltip>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      <Fab
        onClick={handleClickOpen}
        color="primary"
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "100px",
          transform: "scale(1.3)",
        }}>
        <AddIcon />
      </Fab>
      <AddResponsable open={dialog} handleClose={handleClose} />
    </>
  );
}
