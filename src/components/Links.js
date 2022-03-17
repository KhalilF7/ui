import React from "react";
import {Link} from "react-router-dom";

export default function Links(props) {
  const link = props.link;
  return (
    <div>
      <Link to={link}>{link}</Link>
    </div>
  );
}
