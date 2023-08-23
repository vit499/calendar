import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Temper = observer(() => {
  const divStyle = {
    // height: "50px",
    fontSize: "8vh",
    // border: "2px solid",
  };
  const imgStyle = {
    width: "15vh",
    height: "15vh",
  };
  return (
    <div style={divStyle}>
      <div className="row">
        <div className="col">
          <img src={weatherStore.img} style={imgStyle} />
        </div>
        <div className="col mt-2">{weatherStore.temper}</div>
      </div>
    </div>
  );
});

export default Temper;
