import React from "react";
import CircularProgress from "@mui/material/CircularProgress";

export default function Spinning() {
  return (
    <div
      style={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        marginTop: "300px",
      }}>
      <CircularProgress color="secondary" />
    </div>
  );
}
