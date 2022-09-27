import {
  Card,
  CardContent,
  CardHeader,
  Grid,
  Typography,
  Fab,
  CardActions,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import {AnimatePresence, motion} from "framer-motion";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";
import AddBranche from "./AddBranche";
import { useStateContext } from "../../contexts/ContextProvider";

export default function AllBranches() {
  const { currentColor } = useStateContext();
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState(true);

  const [dialog, setDialog] = useState(false);
  const handleClickOpen = () => {
    setDialog(true);
  };
  const handleClose = () => {
    setDialog(false);
  };
  useEffect(() => {
    axios.get(`/api/branches`).then(response => {
      let data = response.data.branches;
      setBranches(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <Spinning />}
      {!loading && branches && Object.keys(branches) !== 0 && (
        <div>
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}>
            <Typography variant="h2" component="div">
              les branches
            </Typography>
          </div>
          <Grid container sx={{margin: "10px"}} spacing={2}>
            <AnimatePresence>
              {branches.map(row => (
                <Grid
                  sx={{
                    margin: "80px",
                  }}
                  key={row.code}
                  item>
                  <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}>
                    <Card sx={{minWidth: 275}} variant="outlined">
                      <CardHeader
                        title={row.nom}
                        subheader={row.adress}></CardHeader>
                      <CardContent>
                        numero telephonique : {row.telephone} <br />
                        fax : {row.fax} <br />
                        email : {row.email}
                      </CardContent>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
        </div>
      )}
      <Fab
        onClick={handleClickOpen}
        style={{ backgroundColor: currentColor}} 
        aria-label="add"
        sx={{
          position: "fixed",
          bottom: "100px",
          right: "100px",
          transform: "scale(1.3)",
        }}>
        <AddIcon />
      </Fab>
      <AddBranche open={dialog} handelClose={handleClose} />
    </>
  );
}
