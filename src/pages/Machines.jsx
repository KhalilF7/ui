import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, Data, cellSelected, Toolbar } from '@syncfusion/ej2-react-grids';
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
//import { ordersGrid } from '../data/dummy';
import { useStateContext } from '../contexts/ContextProvider';

import image from '../Assets/machine.jpg';
import { MdInfoOutline } from 'react-icons/md';

const Machines = () => {
  const { currentColor } = useStateContext();
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

  const hadelRedirect = (code) => {
    navigate(`${code}`);
  };

  const gridMachineImage = (props) => (
    <div>
      <img
        className="rounded-xl h-20 md:ml-3"
        //src={props.ProductImage}
        src={image}
        alt="machine-item"
      />
    </div>
  );

  const gridMachineStatus = (props) => (
    <button
      type="button"
      style={{ background: getColor(props.currentState), width: 100, height: 30 }}
      className="text-white py-1 px-2 capitalize rounded-2xl text-md"
      disabled
    >
      {props.currentState}
    </button>
  );

  const action = (props) => (
    <button
      type="button"
      onClick={async () => await hadelRedirect(props.code)}
    >
      <MdInfoOutline color={currentColor} size="30px" />
    </button>
  );

  const machinesGrid = [
    {
      headerText: 'Image',
      template: gridMachineImage,
      textAlign: 'Center',
      width: '120',
    },
    {
      field: 'code',
      headerText: 'Code',
      width: '150',
      editType: 'dropdownedit',
      textAlign: 'Center',
    },
    { field: 'brand',
      headerText: 'Marque',
      width: '150',
      textAlign: 'Center',
    },
    {
      field: 'model',
      headerText: 'Model',
      format: 'C2',
      textAlign: 'Center',
      editType: 'numericedit',
      width: '150',
    },
    {
      headerText: 'Statut',
      template: gridMachineStatus,
      field: 'currentState',
      textAlign: 'Center',
      width: '120',
    },
    {
      headerText: 'Action',
      template: action,
      textAlign: 'Center',
      width: '120',
    },
  ];
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
         allowPaging allowSorting toolbar={['Search']} >
        <ColumnsDirective>
          {machinesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport, Toolbar]} />
      </GridComponent>
    </div>
      )}
      {user.profile === "res" && (
        <Fab
          onClick={handleClickOpen}
          style={{ backgroundColor: currentColor }}
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
    </>
    
  );
}

export default Machines;