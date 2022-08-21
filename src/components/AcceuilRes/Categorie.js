import {
  Card,
  CardActions,
  CardContent,
  CardMedia,
  Typography,
} from "@mui/material";
import {useNavigate} from "react-router-dom";
import React, {useEffect} from "react";
import moule from "../../Assets/moule.jpg";
import machine from "../../Assets/machine.jpg";
import press from "../../Assets/press.jpg";
import robot from "../../Assets/robot.jpg";
import Button from "../Button";
import { useStateContext } from "../../contexts/ContextProvider";
export default function Categorie(props) {
  const { currentColor } = useStateContext();
  const machines = props.machines;
  const categorie = props.detail;
  const navigate = useNavigate();
  const getMachineNumber = () => {
    var machineNumber = 0;
    machines.map(machine => {
      machine.type === categorie.codeCategorie && machineNumber++;
    });
    return machineNumber;
  };
  const getMachineArret = () => {
    var machineNumber = 0;
    machines.map(machine => {
      machine.type === categorie.codeCategorie &&
        machine.currentState === "enArret" &&
        machineNumber++;
    });
    return machineNumber;
  };
  const getMachinefonction = () => {
    var machineNumber = 0;
    machines.map(machine => {
      machine.type === categorie.codeCategorie &&
        machine.currentState === "fonction" &&
        machineNumber++;
    });
    return machineNumber;
  };
  const getImage = cat => {
    switch (cat) {
      case "press":
        return press;

      case "moule":
        return moule;

      case "machine":
        return machine;

      default:
        return robot;
    }
  };
  const getMachinedegrade = () => {
    var machineNumber = 0;
    machines.map(machine => {
      machine.type === categorie.codeCategorie &&
        machine.currentState === "degradee" &&
        machineNumber++;
    });
    return machineNumber;
  };
  const clicked = () => {
    navigate("../machines", {state: {categorie: categorie.codeCategorie}});
  };
  useEffect(() => {
    getMachineNumber();
  }, []);

  return (
    <Card sx={{maxWidth: 200, paddingTop: "30px"}}>
      <CardMedia
        component="img"
        height="100"
        image={getImage(categorie.nomCategrie)}
        alt="Categorie image"
      />
      <CardContent>
        <Typography gutterBottom variant="h3" component="div">
          {categorie.nomCategrie}
        </Typography>

        <Typography gutterBottom variant="body4" component="div">
          nomber Total : {getMachineNumber()}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          <div>en Arret : {getMachineArret()}</div>
          <div>fonctionne : {getMachinefonction()}</div>
          <div> dégrade : {getMachinedegrade()}</div>
        </Typography>
      </CardContent>
      <CardActions>
        <Button color="white" bgColor={currentColor} text="Plus de détails" onClick={clicked} borderRadius="10px" />
      </CardActions>
    </Card>
  );
}
