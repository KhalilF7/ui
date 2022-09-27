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
import { ColumnDirective, ColumnsDirective, Filter, GridComponent, Inject, Page, Resize, Sort, Toolbar } from "@syncfusion/ej2-react-grids";
import axios from "axios";
import React, {useEffect, useState} from "react";
import { MdInfoOutline } from "react-icons/md";
import {useNavigate} from "react-router-dom";
import { Header } from "../components";
import AddResponsable from "../components/responsables/AddResponsable";
import Spinning from "../components/Spinning";
import { useStateContext } from "../contexts/ContextProvider";

const Responsables = () => {
    const { currentColor } = useStateContext();
  const [responsables, setResponsables] = useState();
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

  const action = (props) => (
    <button
      type="button"
      onClick={async () => await hadelRedirect(props.matricule)}
    >
      <MdInfoOutline color={currentColor} size="30px" />
    </button>
  );

  const responsablesGrid = [
    { 
      field: 'matricule',
      headerText: 'Matricule',
      width: '150',
      textAlign: 'Center' },
    { 
      field: 'nom',
      headerText: 'Nom',
      width: '220',
      format: 'yMd',
      textAlign: 'Center'},
    {
      field: 'prenom',
      headerText: 'Prenom',
      width: '200',
      format: 'C2',
      textAlign: 'Center' },
    { 
      field: 'branche',
      headerText: 'Branche',
      width: '100',
      textAlign: 'Center' },
    {
      headerText: 'Action',
      template: action,
      textAlign: 'Center',
      width: '80',
    },
  
  ];

  return (
    <>
      {loading && <Spinning />}
      {!loading && responsables && Object.keys(responsables) !== 0 && (
        <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
        <Header category="Page" title="Responsables" />
        <GridComponent id='gridcomp' dataSource={responsables.filter((row, i) => {
                return responsables[i];
            }
          )} 
           allowPaging 
           allowSorting toolbar={['Search']}
           width="auto" >
          <ColumnsDirective>
            {responsablesGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
          </ColumnsDirective>
          <Inject services={[Page, Sort, Filter, Resize, Toolbar]} />
        </GridComponent>
        </div>
      )}
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
      <AddResponsable open={dialog} handleClose={handleClose} />
    </>
  );
}

export default Responsables;