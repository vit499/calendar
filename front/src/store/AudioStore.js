import { makeAutoObservable } from "mobx";
import m0 from "./0.mp3";

const audioMp3 = false;

class AudioStore {
  constructor() {
    this.enable = false;
    this.audio = null;
    this.folder = 0;
    makeAutoObservable(this, {});
  }

  speakAudio() {
    this.audio = new Audio(m0);
    this.audio.volume = 0;
    this.audio.loop = true;
    this.audio.play();
  }
}

const audioStore = new AudioStore();

export default audioStore;
