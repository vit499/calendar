import React from "react";
import { useEffect } from "react";
import Hour from "./components/Hour";
import Date from "./components/Date";
import Day from "./components/Day";
import Month from "./components/Month";
import Temper from "./components/Temper";
import weatherStore from "./store/WeatherStore";
import "./bootstrap.css";
import DateMonth from "./components/DateMonth";

function App() {
  useEffect(() => {
    console.log("app init");
    weatherStore.Init();
    weatherStore.StartTimer();
    return () => {
      weatherStore.StopTimer();
    };
  }, []);

  const a = {
    backgroundColor: "#2F4F4F",
    color: "#eeeeee",
    // fontFamily: "sans-serif",
    // height: "100vh",
    // fontSize: "1.25rem",
  };
  return (
    <div style={a}>
      <div className="container text-center ">
        <div className="nav">
          <div> </div>
        </div>
        <div className="main">
          {/* <div>
            <Month />
            <Date />
            <Day />
          </div> */}
          <div>
            <DateMonth />
          </div>
          <div>
            <Hour />
          </div>
        </div>
        <div className="footer">
          <div>
            <Temper />
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;
