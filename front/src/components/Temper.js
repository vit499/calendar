import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Temper = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "8vh",
  };
  return (
    <div style={divStyle}>
      <div className="row">
        <div className="col">
          <p>{weatherStore.icon}</p>
        </div>
        <div className="col">
          <p>{weatherStore.temper}</p>
        </div>
      </div>
    </div>
  );
});

export default Temper;
