import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Month = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "6vh",
    marginTop: "8vh",
    // border: "2px solid",
  };
  return (
    <div style={divStyle}>
      <div>{weatherStore.month}</div>
    </div>
  );
});

export default Month;
