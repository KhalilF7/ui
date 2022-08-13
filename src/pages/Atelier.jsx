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
import Spinning from "../components/Spinning";
import AddAtelier from "../components/atelier/AddAtelier";

const Atelier = () => {
    const [atelier, setAtelier] = useState();
    const [loading, setLoading] = useState(true);
    const [dialog, setDialog] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`/api/ateliers`).then(response => {
        let data = response.data;
        setAtelier(data);
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
        {!loading && atelier && Object.keys(atelier) !== 0 && (
          <div>
            <TableContainer component={Container}>
              <Table
                component={Paper}
                sx={{minWidth: 650}}
                aria-label="tous les atelier">
                <TableHead sx={{backgroundColor: "hsl(210 79% 46%)"}}>
                  <TableRow>
                    <TableCell sx={{fontWeight: "bold"}} align="center">
                      nom de l'atelier{" "}
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {atelier.map(row => (
                    <Tooltip title="detail" placement="top">
                      <TableRow
                        onClick={() => {
                          hadelRedirect(row.idAtelier);
                        }}
                        key={row.matricule}
                        sx={{
                          ":hover": {
                            backgroundColor: "#8aa8ff",
                          },
                          cursor: "pointer",
                        }}>
                        <TableCell align="center">{row.nomAtelier}</TableCell>
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
        <AddAtelier open={dialog} handleClose={handleClose} />
      </>
    );
  }
  
export default Atelier;