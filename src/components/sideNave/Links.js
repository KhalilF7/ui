import {ListItem, Typography} from "@mui/material";
import React from "react";
import {NavLink} from "react-router-dom";

export default function Links(props) {
  const link = props.link;
  const navLinkSTyle = ({isActive}) => {
    return {
      fontWeigh: isActive ? "bold" : "normal",
      backgroundColor: isActive ? "#7F9DFA" : "white",
    };
  };
  return (
    <ListItem>
      <NavLink style={navLinkSTyle} to={link}>
        <Typography
          sx={{
            ":hover": {
              backgroundColor: "#7F9DFA",
            },
            cursor: "pointer",
            padding: "10px",
            height: "100%",
            borderRadius: "4px",
          }}
          component="h2">
          {link}
        </Typography>
      </NavLink>
    </ListItem>
  );
}
