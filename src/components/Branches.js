import axios from "axios";
import React, {useEffect, useState} from "react";
import Spinning from "./Spinning";

export default function Branches() {
  const [branches, setBranches] = useState();
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    axios.get(`${process.env.REACT_APP_API_URL}/branches`).then(response => {
      const data = response.data.branches;
      setBranches(data);
      setLoading(false);
    });
  }, []);
  return (
    <>
      {loading && <Spinning />}
      {!loading && branches && Object.keys(branches) !== 0 && (
        <div>
          <h2>all data</h2>
          <div>{branches.map(row => row.nom)}</div>
        </div>
      )}
    </>
  );
}
