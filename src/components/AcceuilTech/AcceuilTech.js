import {Button, Card, CardContent, Typography} from "@mui/material";
import {Box} from "@mui/system";
import React from "react";
import {useNavigate} from "react-router-dom";

export default function AcceuilTech() {
  const navigate = useNavigate();

  const Curative = () => {
    navigate("../interventions");
  };
  const preventive = () => {
    navigate("../Preventif");
  };
  return (
    <div>
      <Box
        sx={{
          display: "flex",
          margin: "0 120px 0 120px",
        }}>
        <Card sx={{maxWidth: 300, paddingTop: "30px"}}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Inteverntion Curatives
            </Typography>
            <Button variant="contained" onClick={Curative}>
              plus de detail
            </Button>
          </CardContent>
        </Card>
        <Card sx={{maxWidth: 300, paddingTop: "30px"}}>
          <CardContent>
            <Typography gutterBottom variant="h4" component="div">
              Inteverntion Preventif
            </Typography>
            <Button variant="contained" onClick={preventive}>
              plus de detail
            </Button>
          </CardContent>
        </Card>
      </Box>
    </div>
  );
}
