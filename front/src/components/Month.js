import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Month = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "5vh",
    marginTop: "4vh",
  };
  return (
    <div style={divStyle}>
      <div>
        <p>{weatherStore.month}</p>
      </div>
    </div>
  );
});

export default Month;
