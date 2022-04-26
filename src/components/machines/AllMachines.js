import {useState, useEffect} from "react";
import AddIcon from "@mui/icons-material/Add";
import axios from "axios";
import Spinning from "../Spinning";
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
} from "@mui/material";
import AddMachines from "./AddMachines";
import {useNavigate} from "react-router-dom";
export default function AllMachines() {
  const [machines, setMachines] = useState();
  const [loading, setLoading] = useState(true);
  const [dialog, setDialog] = useState(false);
  const [catMachine, setCatMachine] = useState();
  const [selectedCat, setSelectedCat] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    fetchData();
  }, [dialog]);
  const handelListChange = e => {
    setSelectedCat(e.target.value);
  };
  const fetchData = () => {
    axios.get(`${process.env.REACT_APP_API_URL}/machines`).then(response => {
      setMachines(response.data);
      console.log(response.data);
      setLoading(false);
    });
    axios
      .get(`${process.env.REACT_APP_API_URL}/categoriMachines`)
      .then(response => {
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
        return "green";

      case "degradee":
        return "orange";

      default:
        return "red";
    }
  };

  const hadelRedirect = code => {
    navigate(`${code}`);
  };
  return (
    <>
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
            <Select
              labelId="demo-simple-select-label"
              id="demo-simple-select"
              defaultValue="all"
              value={selectedCat}
              onChange={handelListChange}
              label="categorie machine ">
              <MenuItem value="all"> Tout </MenuItem>
              {catMachine.map(cat => (
                <MenuItem value={cat.codeCategorie} key={cat.codeCategorie}>
                  {cat.nomCategrie}
                </MenuItem>
              ))}
            </Select>
          </Container>

          <TableContainer component={Container}>
            <Table sx={{minWidth: 650}} aria-label="tous les machines">
              <TableHead>
                <TableCell align="center">Code machine</TableCell>
                <TableCell align="center">Marque machine</TableCell>
                <TableCell align="center">Model machine</TableCell>
                <TableCell align="center">etat </TableCell>
              </TableHead>
              <TableBody>
                {machines
                  .filter(row => {
                    if (selectedCat === "all") {
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
                          backgroundColor: getColor(row.currentState),
                        }}>
                        <TableCell align="center">{row.code}</TableCell>
                        <TableCell align="center"> {row.brand} </TableCell>
                        <TableCell align="center"> {row.model} </TableCell>
                        <TableCell align="center">
                          {" "}
                          {row.currentState}{" "}
                        </TableCell>
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
      <AddMachines open={dialog} handleClose={handleClose} />
    </>
  );
}
