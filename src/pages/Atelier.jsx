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
import { ColumnDirective, ColumnsDirective, GridComponent, Inject, Page, Search, Toolbar } from "@syncfusion/ej2-react-grids";
import { Header } from "../components";
import { MdInfoOutline } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";

const Atelier = () => {
  const { currentColor } = useStateContext();
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

    const action = (props) => (
      <button
        type="button"
        onClick={async () => await hadelRedirect(props.idAtelier)}
      >
        <MdInfoOutline color={currentColor} size="30px" />
      </button>
    );

    const atelierGrid = [
      { field: 'nomAtelier',
        headerText: "Nom de l"+"'"+"atelier",
        width: '170',
        textAlign: 'Center',
      },
        {field: 'idAtelier',
          headerText: 'Action',
          template: action,
          textAlign: 'Center',
          width: '120',
        },
    ];
    return (
      <>
        {loading && <Spinning />}
        {!loading && atelier && Object.keys(atelier) !== 0 && (
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
          <Header category="Page" title="Ateliers" />
          <GridComponent dataSource={atelier.filter((row, i) => {
              return atelier[i];
          }
        )}
         allowPaging allowSorting toolbar={['Search']} width="auto" >
        <ColumnsDirective>
          {atelierGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Page, Search, Toolbar]} />
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
        <AddAtelier open={dialog} handleClose={handleClose} />
      </>
    );
  }
  
export default Atelier;