import {
  Button,
  Card,
  CardActionArea,
  CardActions,
  CardContent,
  CardHeader,
  Grid,
  Typography,
} from "@mui/material";
import {AnimatePresence, motion} from "framer-motion";

import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "../Spinning";
import {Outlet, useNavigate} from "react-router-dom";

export default function AllBranches() {
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();
  const handelRedirect = code => {
    navigate(`${code}`);
  };
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/branches`).then(response => {
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
          <Grid container sx={{margin: "10px"}} spacing={4}>
            <AnimatePresence>
              {branches.map(row => (
                <Grid key={row.code} item xs={4}>
                  <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}>
                    <Card sx={{minWidth: 275}} variant="outlined">
                      <CardActionArea
                        onClick={() => {
                          handelRedirect(row.code);
                        }}>
                        <CardHeader
                          title={row.nom}
                          subheader={row.adress}></CardHeader>
                        <CardContent>
                          numero telephonique : {row.telephone} <br />
                          fax : {row.fax}
                        </CardContent>
                      </CardActionArea>
                    </Card>
                  </motion.div>
                </Grid>
              ))}
            </AnimatePresence>
          </Grid>
          <Outlet />
        </div>
      )}
    </>
  );
}
