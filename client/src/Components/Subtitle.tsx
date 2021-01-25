import React, { useEffect } from "react";
import { useDencrypt } from "use-dencrypt-effect";

const subtitle = "where code is debated.";

export default function Subtitle() {
  
  const { result, dencrypt } = useDencrypt();

  useEffect(() => {
    // let i = 0;

    const action = setInterval(() => {
      dencrypt(subtitle);
    }, 700);

    return () => {
      clearInterval(action);
    };
  }, [dencrypt]);
  return <div className="subtitle">{result}</div>;
}
