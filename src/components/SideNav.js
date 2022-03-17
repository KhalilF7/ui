import {Box, Drawer} from "@mui/material";
import React, {useEffect, useState} from "react";
import {useSelector} from "react-redux";
import Links from "./Links";
import Spinning from "./Spinning";

export default function SideNav() {
  const [linkes, setLinkes] = useState([]);
  const [loading, setLoading] = useState(true);
  const user = useSelector(state => state.userReducer.data);
  useEffect(() => {
    switch (user.profile) {
      case "pdg":
        setLinkes(["branches", "responsables", "machines", "compte"]);

        break;
      case "res":
        setLinkes([
          "interventions",
          "techniciens",
          "machines",
          "compte",
          "admin",
        ]);
        break;
      default:
        setLinkes(["interventions", "machines", "compte"]);
    }
    setLoading(false);
  }, []);
  return (
    <>
      <Box sx={{display: "flex"}}>
        <Drawer
          sx={{
            width: 250,
            flexShrink: 0,
            "& .MuiDrawer-paper": {
              width: 250,
              boxSizing: "border-box",
            },
          }}
          variant="permanent"
          anchor="left">
          {loading && (
            <h1>
              {" "}
              <Spinning />{" "}
            </h1>
          )}
          {!loading && linkes && (
            <div>
              <h1>{user.userID}</h1>
              {linkes.map(row => (
                <Links key={row} link={row} />
              ))}
            </div>
          )}
        </Drawer>
      </Box>
    </>
  );
}
