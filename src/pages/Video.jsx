import React, { useEffect, useRef } from "react";
import DPlayer from "dplayer";
import Hls from "hls.js";

const Video = ({ videoUrls, photo }) => {
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      const dp = new DPlayer({
        container: playerRef.current,
        video: {
          defaultQuality: 4,
          quality: videoUrls.map(({ url, quality }) => ({
            name: quality,
            url: url,
            type: "hls",
          })),
          customType: {
            hls: function (video, player) {
              const hls = new Hls();
              hls.loadSource(video.src);
              hls.attachMedia(video);
            },
          },
          pic: photo,
          // autoplay: true,
          // autoplay: true,
          // muted: true,
        },
      });

      return () => {
        dp.destroy();
      };
    }
  }, [videoUrls]);

  return (
    <div ref={playerRef} className="dplayer-container w-full h-full"></div>
  );
};

export default Video;
