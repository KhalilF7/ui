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
  import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, Data, cellSelected, Search, Toolbar, Selection } from '@syncfusion/ej2-react-grids';
  import { customerData, customersGrid } from '../data/dummy';
import { Header } from "../components";


const SousTraitants = () => {
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
    useEffect(() => {
      axios.get(`/api/sousTraitences`).then(response => {
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
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="Page" title="Sous Traitants" />
          <GridComponent id='gridcomp' dataSource={sousTraitents.filter((row, i) => {
                  return sousTraitents[i];
              }
            )} 
             allowPaging 
             allowSorting 
             toolbar={['Delete']} 
             editSettings={{ allowDeleting: true, allowEditing: true }}
             width="auto" >
            <ColumnsDirective>
              {customersGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
            </ColumnsDirective>
            <Inject services={[Page, Toolbar, Selection, Edit, Sort, Filter]} />
          </GridComponent>
          </div>
        )}
      </>
    );
  }

export default SousTraitants;