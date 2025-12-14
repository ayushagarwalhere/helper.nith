import React from "react";
import { useEffect, useRef } from "react";
import gsap from "gsap";

export default function clubs() {
  const overlayRef = useRef(null);
  const contentRef = useRef(null);
  const images = Array.from({ length: 10 }, (_, i) => `/images/clubs/${i + 1}.png`);

  useEffect(() => {
    const diagonal = Math.sqrt(
      window.innerWidth * window.innerWidth +
        window.innerHeight * window.innerHeight
    );
    const initialSize = 10; // Starting size in pixels
    const scaleValue = (diagonal / initialSize) * 1.2; // Add 20% buffer to ensure full coverage

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
      },
    });

    // Start from center (scale: 0) and expand to cover entire screen
    tl.fromTo(
      overlayRef.current,
      {
        scale: 0,
        opacity: 1,
      },
      {
        scale: scaleValue,
        duration: 3,
        ease: "power3.out",
      }
    )
      // Fade out the overlay as content appears
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1,
          ease: "power1.out",
        },
        "-=0.3"
      )
      // Fade in the page content
      .to(
        contentRef.current,
        {
          opacity: 1,
          duration: 1,
          ease: "power3.out",
        },
        "-=0.2"
      );
  }, []);

  return (
    <div>
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "15px",
          height: "15px",
          clipPath: "circle(50%)",
          backgroundColor: "#d7ff00",
          borderRadius: "0%",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
        }}
      ></div>
    <div className="relative w-full h-screen overflow-hidden text-center bg-[#2c3b41]
      [background-image:repeating-linear-gradient(to_right,transparent_0_150px,#fdfdfd_150px_151px),repeating-linear-gradient(to_bottom,transparent_0_150px,#fdfdfd_150px_151px)]">

      {/* background image overlay */}
      <div
        className="pointer-events-none absolute left-1/2 top-[25%] h-[90%] w-[min(1400px,90vw)] -translate-x-1/2 bg-[url('/images/logo.png')] bg-top bg-no-repeat bg-contain"
      />

      {/* Slider */}
      <div
        className="absolute left-1/2 top-[10%] z-20 h-[250px] w-[200px] -translate-x-1/2
        [transform-style:preserve-3d] animate-[spin_20s_linear_infinite]
        [transform:perspective(1000px)]
        md:h-[200px] md:w-[160px]
        sm:h-[150px] sm:w-[100px]"
        style={{ ['--quantity']: images.length }}
      >
        {images.map((src, index) => (
          <div
            key={index}
            className="absolute inset-0"
            style={{
              transform: `rotateY(${index * (360 / images.length)}deg) translateZ(550px)`
            }}
          >
            <img src={src} alt="CLUB" className="h-full w-full object-cover" />
          </div>
        ))}
      </div>

      {/* Content */}
      <div ref={contentRef} className="absolute bottom-0 left-1/2 z-10 flex w-full max-w-[1400px] -translate-x-1/2 flex-wrap items-center justify-between pb-[100px]" style={{ opacity: 0 }}>
        <h1 className="relative special-font font-bold text-[#25283B] text-[16em] leading-none md:w-full md:text-center md:text-[7em] sm:text-[5em]">
          <b>CLUBS & SOCIETIES</b>
          <span className="absolute special-font inset-0 text-transparent [-webkit-text-stroke:2px_#d2d2d2]">
            <b>CLUBS & SOCIETIES</b>
          </span>
        </h1>

        <div className="max-w-[200px] text-right font-general md:w-full md:max-w-none md:text-center md:text-blue-50 md:drop-shadow-lg">
          <h2 className="text-5xl">LUN DEV</h2>
          <br></br>
          <p className="font-bold">Connect, Commit & Conquer</p>
          <br></br>
          <p></p>
        </div>  

        {/* Model image */}
        <div className="absolute bottom-0 left-0 z-10 h-[75vh] w-full bg-[url('/images/model.png')] bg-top bg-no-repeat [background-size:auto_130%]" />
      </div>

      {/* Tailwind keyframes */}
      <style>{`
        @keyframes spin {
          from {
            transform: perspective(1000px) rotateX(-16deg) rotateY(0deg);
          }
          to {
            transform: perspective(1000px) rotateX(-16deg) rotateY(360deg);
          }
        }

        @media (max-width: 1023px) {
          div[style*='rotateY'] { transform: translateZ(300px); }
        }
        @media (max-width: 767px) {
          div[style*='rotateY'] { transform: translateZ(180px); }
        }
      `}</style>
    </div>
    </div>
  );
}

