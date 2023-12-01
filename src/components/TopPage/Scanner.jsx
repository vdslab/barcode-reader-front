import { useEffect } from "react";
import config from "./config.json";
import Quagga from "quagga";

const Scanner = (props) => {
  // eslint-disable-next-line react/prop-types
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
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const detected = result => {
    onDetected(result.codeResult.code);
  };

  return (
    <div id="interactive" className="viewport" />
  );
};

export default Scanner;
