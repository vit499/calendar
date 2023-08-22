import React from "react";
import { observer } from "mobx-react-lite";
import weatherStore from "../store/WeatherStore";

const Date = observer(() => {
  const divStyle = {
    // height: "50px",
    // fontSize: "4rem",
    fontSize: "24vh",
    // marginTop: "2vh",
  };
  return (
    <div style={divStyle}>
      <div>
        <p>{weatherStore.date}</p>
      </div>
    </div>
  );
});

export default Date;
