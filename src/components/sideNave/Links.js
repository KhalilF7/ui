import {ListItem, Typography} from "@mui/material";
import React from "react";
import {Link} from "react-router-dom";

export default function Links(props) {
  const link = props.link;
  return (
    <ListItem>
      <Link to={link}>
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
      </Link>
    </ListItem>
  );
}
