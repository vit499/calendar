import React from "react";
import { observer } from "mobx-react-lite";
import audioStore from "../store/AudioStore";

const Video = observer(() => {
  return (
    <div>
      {audioStore.vis && (
        <video
          src={audioStore.video}
          type="video/mp4"
          width="5"
          height="5"
          id="video"
          loop
          muted
          // autoPlay
          // controls
        ></video>
      )}
    </div>
  );
});

export default Video;
