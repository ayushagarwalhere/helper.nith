import gsap from "gsap";
import { ScrollTrigger } from "gsap/all";
import { useRef, useEffect } from "react";
import { TiLocationArrow } from "react-icons/ti";

import Button from "./Button";

gsap.registerPlugin(ScrollTrigger);


export default function Bg() {
  const videoRef = useRef(null);

  useEffect(() => {

    const videoElement = videoRef.current;
    if (!videoElement) return;
    

    const handleMouseMove = (e) => {
      const rect = videoElement.getBoundingClientRect();
      const x = ((e.clientX - rect.left) / rect.width - 0.5) * 10;
      const y = ((e.clientY - rect.top) / rect.height - 0.5) * 10;

      gsap.to(videoElement, {
        rotationY: x,
        rotationX: -y,
        scale: 0.9,
        borderRadius: "3% 3% 3% 3%",
        transformPerspective: 400,
        transformOrigin: "center center",
        ease: "power2.out",
        duration: 0.2,
      });
    };

    const resetTilt = () => {
      gsap.to(videoElement, {
        rotationX: 0,
        rotationY: 0,
        scale: 1,
        borderRadius: "0% 0% 0% 0%",
        duration: 0.2,
        ease: "elastic.inOut",
      });
    };

    videoElement.addEventListener("mousemove", handleMouseMove);
    videoElement.addEventListener("mouseleave", resetTilt);

    return () => {
      videoElement.removeEventListener("mousemove", handleMouseMove);
      videoElement.removeEventListener("mouseleave", resetTilt);
    };
   }, []);

  return (
    <div className="relative w-screen max-h-screen overflow-x-hidden bg-black/80 ">
    <div className="relative w-screen h-screen flex justify-center z-5 perspective-1000">
      <h1 className="text-white text-9xl font-zentry">NIT HAMIRPUR</h1>
      <video
        ref={videoRef}
        autoPlay
        loop
        muted
        id="video-frame"
        src="/videos/bg_video.mp4"
        className="absolute top-36 h-80 w-2/3 object-center object-cover"
        style={{ transformStyle: "preserve-3d" }}
      />
      <div className="absolute top-3/4 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-12">
      <h1 className="special-font flex gap-5  text-6xl text-white shadow-md shadow-blue-50">
        <b>YOUR</b>
        <b> ULTIMATE</b>
        <b> COLLEGE </b>
        <b> COMPANION</b>
      </h1>
      <br/>
      <div className="flex gap-5">
        <p className="heading mb-5 max-w-96 font-robert-regular text-pink-50 !text-sm !font-thin !font-robert-med">
          You enter not a college, <br />  but an empire of dreams waiting to be claimed.
        </p>

        <Button
          title="Enter the realm"
          leftIcon={<TiLocationArrow />}
          containerClass="bg-yellow-300 flex-center gap-1"
        />
      </div> 
      </div>
    </div>
    </div>
  );
}


