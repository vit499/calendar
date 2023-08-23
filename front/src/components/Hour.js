import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Hour = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "12vh",
    marginTop: "8vh",
    // border: "2px solid",
  };
  return (
    <div style={divStyle}>
      <div>{`${weatherStore.hour}:${weatherStore.minute}`}</div>
    </div>
  );
});

export default Hour;
