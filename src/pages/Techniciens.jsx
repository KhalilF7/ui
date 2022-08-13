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
  import React, {useState, useEffect} from "react";
  import {useNavigate} from "react-router-dom";
  import Spinning from "../components/Spinning";
  import AddIcon from "@mui/icons-material/Add";
  
  import AddTechniciens from "../components/techniciens/AddTechniciens";

const Techniciens = () => {
    const [techniciens, setTechniciens] = useState();
    const [loading, setLoading] = useState(true);
    const [dialog, setDialog] = useState(false);
    const navigate = useNavigate();
    useEffect(() => {
      axios.get(`/api/techniciens`).then(response => {
        let data = response.data;
        setTechniciens(data);
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
        {!loading && techniciens && Object.keys(techniciens) !== 0 && (
          <div>
            <TableContainer component={Container}>
              <Table
                component={Paper}
                sx={{minWidth: 650}}
                aria-label="tous les Techniciens">
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
                  </TableRow>
                </TableHead>
                <TableBody>
                  {techniciens.map(row => (
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
        <AddTechniciens open={dialog} handleClose={handleClose} />
      </>
    );
  }  

export default Techniciens;