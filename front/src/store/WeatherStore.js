import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import imgs from "../images";

const months = [
  "ЯНВАРЬ",
  "ФЕВРАЛЬ",
  "МАРТ",
  "АПРЕЛЬ",
  "МАЙ",
  "ИЮНЬ",
  "ИЮЛЬ",
  "АВГУСТ",
  "СЕНТЯБРЬ",
  "ОКТЯБРЬ",
  "НОЯБРЬ",
  "ДЕКАБРЬ",
];
const dayOfWeek = [
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
  "ВОСКРЕСЕНЬЕ",
];

class WeatherStore {
  constructor() {
    this._first_done = false;
    this._sec = 0;
    this._min = 0;
    this.hour = 0;
    this.minute = 0;
    this.month = 1;
    this.date = 1;
    this.day = "-";
    this.temper = "-";
    this.icon = "-";
    this._date = new Date();
    this._launch = false;
    this._timer = null;
    this._city = ""; // "Kaliningrad";
    this._apikey = "";
    this._wakeLock = null;
    this.img = imgs[imgs.length - 2].i;
    makeAutoObservable(this, {});
  }

  Init() {
    this._city = process.env.REACT_APP_CITY;
    this._apikey = process.env.REACT_APP_API_KEY;
    console.log(`city:${this._city}`);
    // console.log(`apikey:${this._apikey}`);
    this._sec = 0;
    this._min = 0;
    this._first_done = false;
  }

  wlock() {
    if ("wakeLock" in navigator) {
      //console.log("Screen Wake Lock API supported!");
      try {
        this._wakeLock = navigator.wakeLock.request("screen").then(() => {
          //console.log("Screen Wake Lock ");
        });
        // this._wakeLock.addEventListener("release", () => {
        //   console.log("Screen Wake Lock released:");
        // });
        // this._wakeLock.release();
      } catch (err) {
        //console.error(`${err.name}, ${err.message}`);
      }
    }
  }

  getIndIcon(icon) {
    for (let i = 0; i < imgs.length; i++) {
      if (imgs[i].d === icon) {
        return i;
      }
    }
    return imgs.length - 1;
  }

  parseWeather(w) {
    try {
      let itemp = Math.round(w.main.temp);
      let strTemp = itemp.toString() + "\u00B0C";
      if (itemp > 0) strTemp = "+" + strTemp;
      let sIcon = w.weather[0].icon;
      const ind = this.getIndIcon(sIcon);
      runInAction(() => {
        // console.log(`strTemp:${strTemp}`);
        // console.log(`sIcon:${sIcon}`);
        // console.log(`urlIcon:${urlIcon}`);
        this.temper = strTemp;
        // this.icon = urlIcon;
        this.img = imgs[ind].i;
      });
    } catch (err) {
      runInAction(() => {
        this.temper = "-";
        this.icon = "-";
      });
    }
  }
  getWeather() {
    if (!this._city || this._city === "") return;
    const url = `https://api.openweathermap.org/data/2.5/weather?q=${this._city}&units=metric&APPID=${this._apikey}`;
    axios
      .get(url)
      .then((resp) => {
        const arr = resp.data;
        //console.log(JSON.stringify(arr, null, 2));
        this.parseWeather(arr);
      })
      .catch((err) => {
        runInAction(() => {
          this.temper = "-";
          this.icon = "-";
        });
      });
  }

  updTime() {
    runInAction(() => {
      //console.log("upd time");
      this._date = new Date();
      this.hour = this._date.getHours();
      this.minute = this._date.getMinutes();
      this.month = months[this._date.getMonth()];
      this.date = this._date.getDate();
      this.day = dayOfWeek[this._date.getDay()];
    });
  }
  inc() {
    this._sec += 1;
    if (!this._first_done) {
      if (this._sec === 2) {
        this.updTime();
      } else if (this._sec === 4) {
        this._first_done = true;
        this.getWeather();
        this.wlock();
      }
    }
    if (this._sec > 59) {
      this._sec = 0;
      this._min += 1;
      if (this._min > 14) {
        this._min = 0;
        this.getWeather();
      }
      this.updTime();
    }
  }

  StopTimer() {
    console.log("stop timer");
    this._launch = false;
    if (this.timer !== null) {
      clearInterval(this.timer);
    }
  }
  StartTimer() {
    if (this._launch) return;
    console.log("start timer");
    this._launch = true;
    this.timer = setInterval(() => {
      this.inc();
    }, 1000);
  }
}

const weatherStore = new WeatherStore();

export default weatherStore;
