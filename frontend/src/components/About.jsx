import gsap from "gsap";
import { useGSAP } from "@gsap/react";
import { ScrollTrigger } from "gsap/all";

import AnimatedTitle from "./AnimatedTitle";

gsap.registerPlugin(ScrollTrigger);

const About = () => {
  useGSAP(() => {
    const clipAnimation = gsap.timeline({
      scrollTrigger: {
        trigger: "#clip",
        start: "top top",
        end: "+=450 center",
        scrub: 0.6,
        pin: true,
        pinSpacing: true,
      },
    });

    clipAnimation.to(
      ".mask-clip-path",
      {
        width: "100vw",
        height: "100vh",
        borderRadius: "0",
        ease: "none",
      },
      0
    );
  });

  return (
    <div id="about" className="min-h-screen w-screen bg-pink-150">
      <div className="relative mb-8 mt-4 flex flex-col items-center gap-5">
        <p className="font-general !text-2xl uppercase md:text-[10px]">
          Welcome to NITH
        </p>

        <AnimatedTitle
          title="Cl<b>a</b>im your cro<b>w</b>n <br /> the games <b>a</b>re on"
          containerClass="mt-5 !text-black text-center"
        />

        <div className="absolute bottom-[-90vh]  text-lg right-64">
          <p>The Game of Games begins—your life, now an epic odyssey</p>
          <p className="text-gray-500">
            NITH unites new students to flourish, build meaningful connections,
            and embrace every opportunity their journey at NITH unfolds !!
            <br></br>
            We know the transition from school to college can feel exciting,
            confusing, and sometimes overwhelming. <br></br>
            That's why we built this platform — to be your guide, buddy, and
            go-to resource throughout your journey.
          </p>
        </div>
      </div>

      <div className="h-screen w-screen flex " id="clip">
        <div className=" relative top-24 left-[25dvh] font-general text-lg">
          <p>
            Here, you'll find : <br></br>
            ✲Academic Support<br></br>
            ✲Peer Community<br></br>
            ✲NITH Campus Life
          </p>
        </div>

        <div className="mask-clip-path about-image">
          <img
            src="images/about.png"
            alt="Background"
            className="relative left-0 top-0 w-max h-cover object-cover"
          />
        </div>

        <div className="absolute right-52 top-1/3">
          <p className="font-bold italic font-zentry">
            <AnimatedTitle
              title={"CRAFTED WITH ❤️"}
              containerClass="!text-black italic !text-3xl relative left-36"
            />
          </p>
        </div>
      </div>
    </div>
  );
};

export default About;
