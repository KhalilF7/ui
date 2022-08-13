import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective } from '@syncfusion/ej2-react-grids';
import { Header } from '../components';
import React, { useState, useEffect } from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Spinning from "../components/Spinning";
import {
  TableContainer,
  Container,
  Table,
  TableHead,
  TableCell,
  TableBody,
  Tooltip,
  TableRow,
  Fab,
  InputLabel,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import AddMachines from "../components/machines/AddMachines";
import {useLocation, useNavigate} from "react-router-dom";
import {useSelector} from "react-redux";
import { ordersGrid, ordersData } from '../data/dummy';

const Machines = () => {
    const [machines, setMachines] = useState();
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [catMachine, setCatMachine] = useState();
  const [selectedCat, setSelectedCat] = useState("");
  const navigate = useNavigate();
  const {state} = useLocation();
  const {categorie} = state !== null && state;
  const user = useSelector(state => state.userReducer.data);
  useEffect(() => {
    fetchData();
    if (categorie) {
      setSelectedCat(categorie);
    }
  }, [dialog]);
  const handelListChange = e => {
    setSelectedCat(e.target.value);
  };
  const fetchData = async() => {
    await axios.get(`/api/machines`).then(response => {
      setMachines(response.data);
      //console.log(response.data);
      setLoading(false);
    });
    axios.get(`/api/categoriMachines`).then(response => {
      setCatMachine(response.data);
    });
  };
  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleClose = () => {
    setDialog(false);
  };
  const getColor = etat => {
    switch (etat) {
      case "fonction":
        return "#5CDB95";

      case "degradee":
        return "#E7A302";

      default:
        return "#FC4445";
    }
  };

  const hadelRedirect = code => {
    navigate(`${code}`);
  };
  const getStatus = etat => {
    switch (etat) {
      case "fonction":
        return "Bon fonctionnement ";

      case "degradee":
        return "Fonctionnement degrade";

      default:
        return "Arrêt";
    }
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && machines && catMachine && Object.keys(machines) !== 0 && (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Équipements" />
      <FormControl>
        <Select
          autoWidth
          displayEmpty
          value={selectedCat}
          onChange={handelListChange}
          label="categorie machine ">
          <MenuItem value={""}> Tout </MenuItem>
          {catMachine.map(cat => (
            <MenuItem value={cat.codeCategorie} key={cat.codeCategorie}>
              {cat.nomCategrie}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
      
      <GridComponent id='gridcomp' dataSource={machines.filter((row, i) => {
            if (selectedCat === "") {
              //console.log(machines[i]);
              return machines[i];
            } else if (row.type === selectedCat) {
              //console.log(row[i]);
              return machines[0];
            }
          }
        )} allowPaging allowSorting>
        <ColumnsDirective>
          {ordersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
    </div>
      )}
    </>
    
  );
}
{/*<>
      {loading && <Spinning />}
      {!loading && machines && catMachine && Object.keys(machines) !== 0 && (
        <div>
          <Container
            sx={{
              width: "300px",
              display: "flex",
              alignItems: "center",
              justifyContent: "space-around",
              alignSelf: "center",
              padding: "20px",
            }}>
            <InputLabel id="demo-simple-select-label">Categorie</InputLabel>
            <FormControl>
              <Select
                autoWidth
                displayEmpty
                value={selectedCat}
                onChange={handelListChange}
                label="categorie machine ">
                <MenuItem value={""}> Tout </MenuItem>
                {catMachine.map(cat => (
                  <MenuItem value={cat.codeCategorie} key={cat.codeCategorie}>
                    {cat.nomCategrie}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>
          </Container>

          <TableContainer component={Container}>
            <Table sx={{minWidth: 650}} aria-label="tous les machines">
              <TableHead sx={{backgroundColor: "hsl(210 79% 46%)"}}>
                <TableCell sx={{fontWeight: "bold"}} align="center">
                  Code
                </TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="center">
                  Marque
                </TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="center">
                  Model
                </TableCell>
                <TableCell sx={{fontWeight: "bold"}} align="center">
                  etat
                </TableCell>
                <TableCell></TableCell>
              </TableHead>
              <TableBody>
                {machines
                  .filter(row => {
                    if (selectedCat === "") {
                      return row;
                    } else if (row.type === selectedCat) {
                      return row;
                    }
                  })
                  .map(row => (
                    <Tooltip title="detail" key={row.code} placement="top">
                      <TableRow
                        key={row.code}
                        onClick={() => {
                          hadelRedirect(row.code);
                        }}
                        sx={{
                          ":hover": {
                            backgroundColor: "#8aa8ff",
                          },
                          cursor: "pointer",
                        }}>
                        <TableCell align="center">{row.code}</TableCell>
                        <TableCell align="center"> {row.brand} </TableCell>
                        <TableCell align="center"> {row.model} </TableCell>
                        <TableCell align="center">
                          {getStatus(row.currentState)}
                        </TableCell>
                        <TableCell
                          align="center"
                          sx={{backgroundColor: getColor(row.currentState)}}>
                          {" "}
                        </TableCell>
                      </TableRow>
                    </Tooltip>
                  ))}
              </TableBody>
            </Table>
          </TableContainer>
        </div>
      )}
      {user.profile === "res" && (
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
      )}
      <AddMachines open={dialog} handleClose={handleClose} />
        </>*/}
export default Machines;