import React, {useEffect, useState} from "react";
import AddIcon from "@mui/icons-material/Add";
import AddPlanPreventif from "./AddPlanPreventif";
import Spinning from "../Spinning";
import axios from "axios";
import {Container, Fab, Grid} from "@mui/material";
import {Box} from "@mui/system";
import PrevetifCard from "./PrevetifCard";

export default function AllPreventif() {
  const [plan, setPlan] = useState(false);
  const [preventives, setPreventives] = useState();
  const [machines, setMachines] = useState();
  const [technicens, setTechniciens] = useState();
  const [loading, setLoadding] = useState(true);
  useEffect(() => {
    fetchData();
  }, [plan]);
  const fetchData = () => {
    axios.get(`/preventives`).then(response => {
      setPreventives(response.data);
    });
    axios.get(`/machines`).then(response => {
      setMachines(response.data);
    });
    axios.get(`/techniciens`).then(response => {
      setTechniciens(response.data);
    });
    setLoadding(false);
  };
  const handelPlan = () => {
    setPlan(true);
  };
  const handelClosePlan = () => {
    setPlan(false);
  };
  const getMachine = code => {
    let m;
    machines.filter(machine => {
      if (machine.code === code) {
        m = machine;
      }
    });
    return m;
  };
  return (
    <>
      {loading && <Spinning />}
      {!loading && preventives && technicens && machines && (
        <>
          <Container>
            <Grid container spacing={2}>
              {preventives.map(preventif => (
                <Grid item xs={4}>
                  <PrevetifCard
                    preventif={preventif}
                    machine={getMachine(preventif.machine)}
                    technicines={technicens}
                  />
                </Grid>
              ))}
            </Grid>
          </Container>
          <Fab
            color="primary"
            onClick={handelPlan}
            aria-label="add"
            sx={{
              position: "fixed",
              bottom: "60px",
              right: "60px",
              transform: "scale(1.3)",
            }}>
            <AddIcon />
          </Fab>
          <AddPlanPreventif
            open={plan}
            handelClose={handelClosePlan}
            machines={machines}
            techniciens={technicens}
          />
        </>
      )}
    </>
  );
}
