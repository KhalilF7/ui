import { GridComponent, ColumnsDirective, Page, Inject, ColumnDirective, Search, Toolbar } from '@syncfusion/ej2-react-grids';
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
import { Header } from "../components";
import { techniciensGrid } from '../data/dummy';
import { MdInfoOutline } from 'react-icons/md';
import avatar from '../data/avatar.jpg'
import { useStateContext } from '../contexts/ContextProvider';

const Techniciens = () => {
  const { currentColor } = useStateContext();
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

    const gridEmployeeProfile = (props) => (
      <div className="flex items-center gap-2">
        <img
          className="rounded-full w-10 h-10"
          src={avatar}
          alt="employee"
        />
        <p>{props.nom}</p>
      </div>
    );

    const action = (props) => (
      <button
        type="button"
        onClick={async () => await hadelRedirect(props.matricule)}
      >
        <MdInfoOutline color={currentColor} size="30px" />
      </button>
    );

    const techniciensGrid = [
      { headerText: 'Technicien',
        width: '80',
        template: gridEmployeeProfile,
        textAlign: 'Center' },
      { field: 'matricule',
        headerText: 'Matricule',
        width: '170',
        textAlign: 'Center',
      },
    
      { field: 'nom',
        headerText: 'Nom',
        width: '135',
        format: 'yMd',
        textAlign: 'Center' },
    
      { field: 'prenom',
        headerText: 'Prénom',
        width: '120',
        textAlign: 'Center' },
      { field: 'telephone',
        headerText: 'Téléphone',
        width: '125',
        textAlign: 'Center' },
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
        {!loading && techniciens && Object.keys(techniciens) !== 0 && (
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="Page" title="Techniciens" />
          <GridComponent dataSource={techniciens.filter((row, i) => {
              return techniciens[i];
          }
        )}
         allowPaging allowSorting toolbar={['Search']} width="auto" >
        <ColumnsDirective>
          {techniciensGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
      </GridComponent>
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