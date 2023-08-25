import { makeAutoObservable, runInAction, toJS } from "mobx";

const styleRed = {
  color: "#ee0000",
};
const styleWhite = {
  color: "#eeeeee",
};
const stylePink = {
  color: "#FA8072",
};
const styleGray = {
  color: "#eeeeee",
};

class ColorStore {
  constructor() {
    this.style = styleGray;
    makeAutoObservable(this, {});
  }

  getStyle() {
    return toJS(this.style);
  }
  setStyle() {
    const c = this.checkColor();
    runInAction(() => {
      if (this.style != c) this.style = c;
    });
  }

  checkColor() {
    let c = this.checkColorCelebr();
    if (c !== styleGray) return c;
    c = this.checkColorDay();
    return c;
  }
  checkColorCelebr() {
    const dt = new Date();
    const month = dt.getMonth() + 1;
    const date = dt.getDate();
    let c = styleGray;

    if (month == 1) {
      // january
      if (date < 3) {
        c = styleRed; // Colors.red.shade400;
      } else if (date < 9) {
        c = styleRed; //Colors.red.shade400;
      }
    } else if (month == 2) {
      // february
      if (date == 22) {
        c = styleRed; //Colors.limeAccent;
      } else if (date == 23) {
        c = styleRed; //Colors.red.shade400;
      }
    } else if (month == 3) {
      // march
      if (date == 7) {
        c = styleRed; //Colors.limeAccent;
      } else if (date == 8) {
        c = styleRed; //Colors.red.shade400;
      } else if (date == 27) {
        c = styleRed; //Colors.limeAccent;
      }
    } else if (month == 4) {
      //
    } else if (month == 5) {
      if (date < 3) {
        c = styleRed; //Colors.red.shade400;
      } else if (date == 8) {
        c = styleRed; //Colors.limeAccent;
      } else if (date == 9) {
        c = styleRed; //Colors.red.shade400;
      }
    } else if (month == 6) {
      //
    } else if (month == 7) {
      //
    } else if (month == 8) {
      //
    } else if (month == 9) {
      //
    } else if (month == 10) {
      //
    } else if (month == 11) {
      //
    } else if (month == 11) {
      if (date == 30) {
        c = styleRed; //Colors.limeAccent;
      } else if (date == 31) {
        c = styleRed; //Colors.deepOrange.shade400;
      }
    }
    return c;
  }
  checkColorDay() {
    const dt = new Date();
    const hour = dt.getHours();
    const day = dt.getDay();

    let c = styleGray;
    if (day == 5) {
      // friday
      if (hour < 12) {
        c = styleRed; // Colors.orange.shade100;
      } else if (hour < 17) {
        c = styleRed; //Colors.orange.shade200;
      } else {
        c = styleRed; //Colors.limeAccent;
      }
    } else if (day == 6) {
      // saturday
      if (hour < 14) {
        c = styleRed; //Colors.red.shade400;
      } else if (hour < 17) {
        c = styleRed; //Colors.red.shade400;
      } else {
        c = styleRed; //Colors.deepOrange.shade400;
      }
    } else if (day == 0) {
      // sunday
      if (hour < 12) {
        c = styleRed; //Colors.red.shade400;
      } else if (hour < 20) {
        c = styleRed; //Colors.red.shade400;
      } else {
        c = styleRed; //Colors.grey.shade400;
      }
    }
    return c;
  }
}

const colorStore = new ColorStore();

export default colorStore;
