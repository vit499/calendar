import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Day = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "5vh",
    marginTop: "10px",
    // border: "2px solid",
  };
  return (
    <div style={divStyle}>
      <div>{weatherStore.day}</div>
    </div>
  );
});

export default Day;
