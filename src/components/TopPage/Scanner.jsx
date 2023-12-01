import { useEffect } from "react";
import config from "./config.json";
import Quagga from "quagga";

const Scanner = (props) => {
  const { onDetected } = props;

  useEffect(() => {
    Quagga.init(config, err => {
      if (err) {
        console.log(err, "error msg");
      }
      Quagga.start();
      return () => {
        Quagga.stop()
      }
    });

    Quagga.onDetected(detected);
  }, []);

  const detected = result => {
    onDetected(result.codeResult.code);
  };

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
