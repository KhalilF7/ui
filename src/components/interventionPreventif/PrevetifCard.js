import {
  Card,
  CardContent,
  CardHeader,
  CardMedia,
  Typography,
} from "@mui/material";
import React, {useState} from "react";
import dateFormat from "dateformat";

export default function PrevetifCard(props) {
  const [preventif, setPrevetif] = useState(props.preventif);
  const [machine, setMachine] = useState(props.machine);
  const [technicines, setTechnicines] = useState(props.technicines);
  const getTitle = () => {
    return `Action Preventif sur : ${machine.model}`;
  };
  const getDate = () => {
    let date = new Date(preventif.date);
    if (date !== null && date !== undefined) {
      let d = new Date(date);
      return dateFormat(d, " d/mm/yyyy h:MM TT");
    }
  };
  const getTechnicien = mat => {
    let tech;
    technicines.filter(t => {
      if (t.matricule === mat) {
        tech = t;
      }
    });
    return `${tech.nom} ${tech.prenom}`;
  };
  return (
    <>
      <Card sx={{maxWidth: 300}}>
        <CardHeader title={getTitle()} subheader={"le :" + getDate()} />
        <CardMedia
          component="img"
          height="194"
          image={`${process.env.REACT_APP_API_URL}${machine.image}`}
          alt="machine"
        />
        <CardContent>
          <Typography variant="body4" color="text.secondary">
            Description de l'action : {preventif.Description}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Realiser par :
            {preventif.technicines.length === 0 && (
              <> Aucune donner disponible </>
            )}
            {preventif.technicines.length !== 0 && (
              <>
                {preventif.technicines.map(t => (
                  <> {getTechnicien(t)} </>
                ))}
              </>
            )}
          </Typography>
        </CardContent>
      </Card>
    </>
  );
}
