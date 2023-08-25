import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Date = observer(() => {
  const divStyle = {
    // height: "50px",
    // fontSize: "8rem",
    fontSize: "24vh",
    // border: "2px solid",
    fontWeight: "500",
    // fontWeight: "bold",
    // marginTop: "2vh",
  };
  return (
    // <div style={divStyle}>
    <div style={divStyle}>
      <div>{weatherStore.date}</div>
    </div>
  );
});

export default Date;
