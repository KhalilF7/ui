import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, Data, cellSelected } from '@syncfusion/ej2-react-grids';
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
import { ordersGrid } from '../data/dummy';

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

  const hadelRedirect = (props) => {
    navigate(`${props.code}`);
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
              return machines[i];
            }
          }
        )} 
         allowPaging allowSorting >
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

export default Machines;