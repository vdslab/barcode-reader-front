import { useState } from "react";
import Scanner from "./Scanner";
import { Button } from "@mui/material";

export const Top = () => {
  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);

  const onDetected = result => {
    setResult(result);
  };


  return (
    <div className="App">
      <p>{result ? result : "Scanning..."}</p>
      <Button variant="contained" onClick={() => setCamera(!camera)}>
        {camera ? "Stop" : "Start"}
      </Button>
      <div className="container">
        {camera && <Scanner onDetected={onDetected} />}
      </div>
    </div>
  );
};
