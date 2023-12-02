import { useState } from "react";
import Scanner from "./Scanner";
import { Button } from "@mui/material";

export const Top = () => {
  const [camera, setCamera] = useState(true);
  const [result, setResult] = useState(null);

  let code;
  let count = 0;
  const onDetected = (result) => {
    if(code == result){
      count++;
    } else {
      count = 0;
      code = result;
    }

    if(count >= 20) {
      setResult(result);
    } else {
      setResult(null);
    }
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
