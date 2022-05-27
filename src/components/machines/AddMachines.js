import axios from "axios";
import React, {useEffect, useState} from "react";
import Dialog from "@mui/material/Dialog";
import TextField from "@mui/material/TextField";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import {Button, Divider, MenuItem, Select, Typography} from "@mui/material";
export default function AddMachines(props) {
  const [form, setForm] = useState({
    code: "",
    type: "",
    brand: "",
    model: "",
    currentState: "enArret",
    schudledTime: 0,
    timeLosses: 0,
    availibilty: 100,
    descriptions: "",
    atelier: "",
  });
  const [ateliers, setAteliers] = useState();
  const [catMachine, setCatMachine] = useState();
  const fetchData = () => {
    axios.get(`/categoriMachines`).then(response => {
      setCatMachine(response.data);
    });

    axios.get(`/ateliers`).then(response => {
      setAteliers(response.data);
    });
  };
  const handelDate = e => {
    setForm({...form, anneeManifacture: e.target.value});
  };
  const handelFile = e => {
    setForm({...form, image: e.target.files[0]});
  };
  const handelChanges = e => {
    setForm({...form, [e.target.name]: e.target.value});
  };
  const handelForm = e => {
    e.preventDefault(e);
    let formData = new FormData();
    formData.append("code", form["code"]);
    formData.append("type", form["type"]);
    formData.append("brand", form["brand"]);
    formData.append("model", form["model"]);
    formData.append("currentState", form["currentState"]);
    formData.append("schudledTime", form["schudledTime"]);
    formData.append("timeLosses", form["timeLosses"]);
    formData.append("availibilty", form["availibilty"]);
    formData.append("descriptions", form["descriptions"]);
    formData.append("atelier", form["atelier"]);
    formData.append("image", form["image"]);
    formData.append("anneeManifacture", form["anneeManifacture"]);

    axios
      .post(`/machines`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then(res => {
        if (res.message) {
          console.log(res.data);
        } else {
          console.log(res.data);
          props.handleClose();
        }
      });
  };
  useEffect(() => {
    fetchData();
  }, []);
  return (
    <div>
      <Dialog fullWidth open={props.open} onClose={props.handleClose}>
        <form onSubmit={handelForm}>
          <DialogTitle>
            <Typography variant="h4"> Ajouter une machine</Typography>
          </DialogTitle>
          <DialogContent>
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="code"
                name="code"
                label="Code"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              {catMachine && (
                <>
                  <label htmlFor="type">Type de machine</label>
                  <Select
                    onChange={handelChanges}
                    defaultValue=""
                    name="type"
                    id="type"
                    variant="outlined"
                    fullWidth
                    label="Type de machine">
                    {catMachine.map(cat => (
                      <MenuItem
                        value={cat.codeCategorie}
                        key={cat.codeCategorie}>
                        {cat.nomCategrie}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="brand"
                name="brand"
                label="Brand"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelChanges}
                autoFocus
                id="model"
                name="model"
                label="Model"
                type="text"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <TextField
                onChange={handelDate}
                autoFocus
                id="anneeManifacture"
                name="anneeManifacture"
                label="Date de fabriation"
                type="date"
                fullWidth
                variant="outlined"
                required
              />
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              {ateliers && (
                <>
                  <label htmlFor="type">Atelier</label>
                  <Select
                    onChange={handelChanges}
                    defaultValue=""
                    name="atelier"
                    id="atelier"
                    variant="outlined"
                    fullWidth>
                    {ateliers.map(atelie => (
                      <MenuItem value={atelie.idAtelier} key={atelie.idAtelier}>
                        {atelie.nomAtelier}
                      </MenuItem>
                    ))}
                  </Select>
                </>
              )}
            </div>
            <Divider />
            <div style={{margin: "20px"}}>
              <label htmlFor="image">image du machine</label>
              <TextField
                onChange={handelFile}
                autoFocus
                id="image"
                name="image"
                type="file"
                fullWidth
                variant="outlined"
              />
            </div>
            <Divider />
          </DialogContent>
          <DialogActions>
            <Button onClick={props.handleClose}>Annuler</Button>
            <Button type="submit">Ajouter</Button>
          </DialogActions>
        </form>
      </Dialog>
    </div>
  );
}
