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
  
  import AddIcon from "@mui/icons-material/Add";
  import React, {useEffect, useState} from "react";
  import Spinning from "../components/Spinning";
  import AddSousTraitent from "../components/Sous-Traitent/AddSousTraitent";
  import Swal from "sweetalert2";
  import withReactContent from "sweetalert2-react-content";
  import { GridComponent, ColumnsDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, Data, cellSelected, Search, Toolbar, Selection } from '@syncfusion/ej2-react-grids';
  import avatar from '../data/avatar.jpg';
import { Header } from "../components";
import { MdInfoOutline, MdOutlineDeleteForever } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";


const SousTraitants = () => {
  const { currentColor } = useStateContext();
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
        title: <p>Vous êtes sûr de supprimer ce sous traitance ?</p>,
        icon: "question",
        showConfirmButton: true,
        showCancelButton: true,
        cancelButtonText: "Annuler",
        confirmButtonText: "Supprimer",
        cancelButtonColor: "#F21800",
      }).then(result => {
        if (result.isConfirmed) {
          axios.delete(`/api/sousTraitence/${code}`).then(response => {
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
    const fetchData = () => {
      axios.get(`/api/sousTraitences`).then(response => {
          setSousTraitence(response.data);
          setLoading(false);
      });
    }
    useEffect(() => {
      fetchData();
    }, [addSous, Myswal]);

    const action = (props) => (
      <button
        type="button"
        onClick={() => handelDelete(props.id)}
      >
        <MdOutlineDeleteForever color={currentColor} size="25px" />
      </button>
    );

    const sousTraitantsGrid = [
      { field: 'sousTraitence',
        headerText: 'Sous Traitant',
        width: '150',
        textAlign: 'Center' },
      { field: 'nomRep',
        headerText: 'Nom de Responsable/Représentant',
        width: '220',
        format: 'yMd',
        textAlign: 'Center'},
      {
        field: 'adress',
        headerText: 'Adresse',
        width: '200',
        format: 'C2',
        textAlign: 'Center' },
      { field: 'telephone',
        headerText: 'Téléphone',
        width: '100',
        textAlign: 'Center' },
    
      { field: 'fax',
        headerText: 'Fax',
        width: '100',
        textAlign: 'Center',
      },
      {field: 'id',
        headerText: 'Action',
        template: action,
        textAlign: 'Center',
        width: '80',
      },
    
    ];
    return (
      <>
        {loading && <Spinning />}
        {!loading && sousTraitents && (
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="Page" title="Sous Traitants" />
          <GridComponent id='gridcomp' dataSource={sousTraitents.filter((row, i) => {
                  return sousTraitents[i];
              }
            )} 
             allowPaging 
             allowSorting 
             width="auto" >
            <ColumnsDirective>
              {sousTraitantsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Sort, Filter, Resize]} />
          </GridComponent>
          </div>
        )}
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
      </>
    );
  }

export default SousTraitants;