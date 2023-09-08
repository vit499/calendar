import { makeAutoObservable, runInAction } from "mobx";
import axios from "axios";
import imgs from "../images";
import colorStore from "./ColorStore";
import audioStore from "./AudioStore";

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
  "ВОСКРЕСЕНЬЕ",
  "ПОНЕДЕЛЬНИК",
  "ВТОРНИК",
  "СРЕДА",
  "ЧЕТВЕРГ",
  "ПЯТНИЦА",
  "СУББОТА",
];

class WeatherStore {
  constructor() {
    this._first_done = false;
    this._sec = 0;
    this._min = 0;
    this.hour = "00";
    this.minute = "00";
    this.month = 1;
    this.date = 1;
    this.day = "-";
    this.temper = "-";
    this.icon = "-";
    this._launch = false;
    this._timer = null;
    this._city = ""; // "Kaliningrad";
    this._apikey = "";
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
    audioStore.speakAudio();
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
      const dt = new Date();
      let h = dt.getHours();
      if (h < 10) h = "0" + h;
      this.hour = h;
      let m = dt.getMinutes();
      if (m < 10) m = "0" + m;
      this.minute = m;
      this.month = months[dt.getMonth()];
      this.date = dt.getDate();
      this.day = dayOfWeek[dt.getDay()];
    });
  }
  inc() {
    this._sec += 1;
    if (!this._first_done) {
      if (this._sec === 2) {
        this.updTime();
      } else if (this._sec === 4) {
        this.getWeather();
      } else if (this._sec === 6) {
        this._first_done = true;
        colorStore.setStyle();
      }
    }
    if (this._sec == 15) {
      if (this.minute == "00") colorStore.setStyle();
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
