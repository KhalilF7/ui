import {
    Button,
    Container,
    Fab,
    FormControl,
    InputLabel,
    MenuItem,
    Select,
    Table,
    TableBody,
    TableCell,
    TableContainer,
    TableHead,
    TableRow,
    TextField,
  } from "@mui/material";
  import { GridComponent, ColumnsDirective, CoumnDirective, Resize, Sort, ContextMenu, Filter, Page, ExcelExport, PdfExport, Edit, Inject, ColumnDirective, Data, cellSelected } from '@syncfusion/ej2-react-grids';
  import { Header } from '../components';
  import AddIcon from "@mui/icons-material/Add";
  import axios from "axios";
  import React, { useEffect, useState } from "react";
  import { useSelector } from "react-redux";
  import Spinning from "../components/Spinning";
  import OldIntervention from "../components/interventionCurative/OldIntervention";
  import DemandeInterventions from "../components/interventionCurative/DemandeInterventions";
  import { useNavigate } from "react-router-dom";
import { MdInfo, MdInfoOutline } from "react-icons/md";
import { useStateContext } from "../contexts/ContextProvider";
//import { interventionsGrid } from "../data/dummy";

const Interventions = () => {
  const { currentColor } = useStateContext();
  const user = useSelector(state => state.userReducer.data);
    const [tech, setTech] = useState();
    const [interventions, setInterventions] = useState();
    const [oldInter, setOldInter] = useState(false);
    const [demand, setDemande] = useState(false);
    const [loading, setLoading] = useState(true);
    const [machines, setMachines] = useState();
    const [selectedEtat, setselectedEtat] = useState("");
    const [selectedMachine, setSelectedMachine] = useState("");
  
    const navigate = useNavigate();
    const etat = ["ouvert", "encours", "achieve", "cloture"];
    const fetchData = () => {
      if (user.profile === "tech") {
        axios.get(`/api/technicien/${user.userID}`).then(response => {
          setTech(response.data);
        });
      } else {
        axios.get(`/api/responsable/${user.userID}`).then(response => {
          setTech(response.data);
        });
      }
      axios.get(`/api/InteventionCuratives`).then(response => {
        setInterventions(response.data);
      });
      axios.get(`/api/machines`).then(response => {
        setMachines(response.data);
      });
      setLoading(false);
    };
    useEffect(() => {
      fetchData();
    }, [oldInter, demand]);
    const hadelRedirect = code => {
      navigate(`${code}`);
    };
    const handelCloseOld = () => {
      setOldInter(false);
    };
    const handelCloseDemande = () => {
      setDemande(false);
    };
    const ancientIntervention = () => {
      setOldInter(true);
    };
    const handleDemande = () => {
      setDemande(true);
    };
    const getMachineName = code => {
      var m = [];
      if (machines) {
        m = machines.filter(row => {
          if (row.code === code) {
            return row;
          }
        });
      }
      return m[0].brand;
    };
    const getStatus = etat => {
      switch (etat) {
        case "ouvert":
          return "Ouvert  ";
        case "encours":
          return "En cours";
        case "achieve":
          return "Achever";
        default:
          return "Clotûre";
      }
    };
    const handelEtatChange = e => {
      setselectedEtat(e.target.value);
    };
    const handleMachineChange = e => {
      setSelectedMachine(e.target.value);
      console.log(e.target.value);
    };

    const getColorIntervention = (etat) => {
      switch (etat) {
        case "ouvert":
          return "#FC4445";
        case "encours":
          return "#E7A302";
        case "achieve":
          return "#5431F0";
        default:
          return "#5CDB95";
      }
    };

    const gridInterventionStatus = (props) => (
      <button
        type="button"
        style={{ background: getColorIntervention(props.etatInterventions), width: 100, height: 30 }}
        className="text-white py-1 px-2 capitalize rounded-2xl text-md"
        disabled
      >
        {props.etatInterventions}
      </button>
    );

    const gridInterventionMachine = (props) => (
      <button
        type="button"
        className="py-1 px-2 capitalize rounded-2xl text-md"
        //onClick={async () => await hadelRedirect(props.codeCuratif)}
      >
        {getMachineName(props.machine)}
      </button>
    );

    const action = (props) => (
      <button
        type="button"
        onClick={async () => await hadelRedirect(props.codeCuratif)}
      >
        <MdInfoOutline color={currentColor} size="30px" />
      </button>
    );

    const interventionsGrid = [
      {
        field: 'codeCuratif',
        headerText: 'Code',
        width: '150',
        editType: 'dropdownedit',
        textAlign: 'Center',
      },
      { headerText: 'Machine',
        template: gridInterventionMachine,
        field: 'machine',
        width: '150',
        textAlign: 'Center',
      },
      {
        headerText: 'Statut',
        template: gridInterventionStatus,
        field: 'etatInterventions',
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
        {!loading && interventions && tech && machines && (
          <>
          <div className='m-2 md:m-10 p-2 md:p-10 bg-white rounded-3xl'>
      <Header category="Page" title="Équipements" />
            <Container
              sx={{
                width: "300px",
                display: "flex",
                alignItems: "center",
                justifyContent: "space-around",
                alignSelf: "center",
                padding: "20px",
              }}>
              {tech.isResponsableMaintenance && (
                <>
                  {/** todo : feuille complet d'intevention encient  */}
                  <Button variant="contained" onClick={ancientIntervention}>
                    Ajouter une ancient intervention
                  </Button>
                </>
              )}
            </Container>
            <div style={{display: "flex", justifyContent: "space-around"}}>
              <div>
                <InputLabel> État de l'intervention </InputLabel>
                <FormControl>
                  <Select
                    autoWidth
                    onChange={handelEtatChange}
                    displayEmpty
                    name="etat"
                    defaultValue=""
                    value={selectedEtat}
                    label="etat intervention">
                    <MenuItem value={""}> Tout </MenuItem>
                    {etat.map(e => (
                      <MenuItem value={e}>{getStatus(e)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
              <div>
                <InputLabel> Machine </InputLabel>
                <FormControl>
                  <Select
                    autoWidth
                    onChange={handleMachineChange}
                    displayEmpty
                    defaultValue=""
                    name="machine"
                    value={selectedMachine}
                    label="etat intervention">
                    <MenuItem value={""}> Tout </MenuItem>
                    {machines.map(e => (
                      <MenuItem value={e.code}>{getMachineName(e.code)}</MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </div>
            </div>

            <GridComponent id='gridcomp' 
            //onClick={async (e) => await console.log(e.target.value)}
            dataSource={interventions.filter((row, i) => {
            if (selectedEtat === "" && selectedMachine === "") {
              return interventions[i];
            } else if (
              row.etatInterventions === selectedEtat &&
              selectedMachine === ""
            ) {
              return interventions[i];
            } else if (
              row.machine === selectedMachine &&
              selectedEtat === ""
            ) {
              return interventions[i];
            } else if (
              row.etatInterventions === selectedEtat &&
              row.machine === selectedMachine
            ) {
              return interventions[i];
            }
          }
        )} 
         allowPaging allowSorting >
        <ColumnsDirective>
          {interventionsGrid.map((item, index) => <ColumnDirective key={index} {...item} />)}
        </ColumnsDirective>
        <Inject services={[Resize, Sort, ContextMenu, Filter, Page, ExcelExport, Edit, PdfExport]} />
      </GridComponent>
            {tech.isResponsableProduction && user.profile === "tech" && (
              <>
                <Fab
                  color="primary"
                  onClick={handleDemande}
                  aria-label="add"
                  sx={{
                    position: "fixed",
                    bottom: "60px",
                    right: "60px",
                    transform: "scale(1.3)",
                  }}>
                  <AddIcon />
                </Fab>
              </>
            )}
            <OldIntervention
              machines={machines}
              open={oldInter}
              handelClose={handelCloseOld}
            />
            <DemandeInterventions
              interventions={interventions}
              machines={machines}
              open={demand}
              handelClose={handelCloseDemande}
            />
            </div>
      
          </>
        )}
      </>
    );
  }  

export default Interventions;