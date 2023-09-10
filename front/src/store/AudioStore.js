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
    if (this.enable) return;
    // this.enable = true;
    console.log("speakAudio");
    this.audio = new Audio(m0);
    //this.audio.volume = 0;
    this.audio.muted = true;
    this.audio.loop = true;
    let promise = this.audio.play();
    if (promise !== undefined) {
      promise
        .then((_) => {
          // Autoplay started!
          console.log("Autoplay started!");
          this.enable = true;
        })
        .catch((error) => {
          console.log("Autoplay NOT supported: ", error);
          // Autoplay was prevented.
          // Show a "Play" button so that user can start playback.
        });
    }
  }
}

const audioStore = new AudioStore();

export default audioStore;
