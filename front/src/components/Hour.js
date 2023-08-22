import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Hour = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "12vh",
    marginTop: "4vh",
  };
  return (
    <div style={divStyle}>
      <div>
        <p>{`${weatherStore.hour}:${weatherStore.minute}`}</p>
      </div>
    </div>
  );
});

export default Hour;
