import React from "react";
import { observer } from "mobx-react-lite";
import colorStore from "../store/ColorStore";
import Month from "./Month";
import Date from "./Date";
import Day from "./Day";

const DateMonth = observer(() => {
  return (
    <div style={colorStore.getStyle()}>
      <Month />
      <Date />
      <Day />
    </div>
  );
});

export default DateMonth;
