import React, { useEffect, useRef } from "react";
import DPlayer from "dplayer";
import Hls from "hls.js";

const Video = ({ videoUrls, photo, play }) => {
  const dpRef = useRef(null);
  const playerRef = useRef(null);

  useEffect(() => {
    if (playerRef.current) {
      // Create a new DPlayer instance only if it doesn't exist or if the play prop changes.
      if (!dpRef.current || dpRef.current.video.paused !== play) {
        if (dpRef.current) {
          dpRef.current.destroy();
        }

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
          },
        });

        dpRef.current = dp;
      }
    }
    // if (dpRef.current) {
    //   if (play) {
    //     dpRef.current.play();
    //   } else {
    //     dpRef.current.pause();
    //   }
    // }
  }, [videoUrls, play]);

  return (
    <div ref={playerRef} className="dplayer-container w-full h-full"></div>
  );
};

export default Video;
