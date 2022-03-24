import React from "react";
import {useParams} from "react-router-dom";

export default function Branche() {
  const param = useParams();
  return <div>Branche details {param.code} </div>;
}
