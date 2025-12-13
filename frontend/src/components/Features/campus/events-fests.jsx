import { useEffect, useRef, useState } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

// Scroll spacer component
function ScrollSpacer({ images }) {
  const [height, setHeight] = useState(0);

  useEffect(() => {
    setHeight(window.innerHeight * images.length);
    const handleResize = () => {
      setHeight(window.innerHeight * images.length);
    };
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, [images.length]);

  return <div style={{ height: `${height}px` }}></div>;
}

export default function EventsFests() {
  const overlayRef = useRef();
  const contentRef = useRef();
  const imageContainerRef = useRef();
  const containerRef = useRef();
  const currentImageIndexRef = useRef(0);
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  const [isPinned, setIsPinned] = useState(true);

  const images = [
    "/images/events-fests/nimbus/nimbus1.png",
    "/images/events-fests/nimbus/nimbus2.png",
    "/images/events-fests/nimbus/nimbus3.png",
    "/images/events-fests/nimbus/nimbus4.png",
    "/images/events-fests/nimbus/nimbus5.png",
  ];
// for loading the page with reveal animation
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
        duration: 2.5,
        ease: "power3.out",
      }
    )
      // Fade out the overlay as content appears
      .to(
        overlayRef.current,
        {
          opacity: 0,
          duration: 1.4,
          ease: "power1.out",
        },
        "-=0.3"
      )
      // Fade in the page content
      .to(
        contentRef.current,
        {
          opacity: 1,
          duration: 1.6,
          ease: "power3.out",
        },
        "-=0.2"
      );
  }, []);

  //for scrolling images 
  useEffect(() => {
  if (!containerRef.current || !imageContainerRef.current) return;


  const imagePromises = images.map((src) => {
    return new Promise((resolve) => {
      const img = new Image();
      img.onload = resolve;
      img.onerror = resolve;
      img.src = src;
    });
  });

  let scrollHandler = null;

  const handleScroll = () => {
    if (!imageContainerRef.current) return;

    const scrollY = window.scrollY;
    const windowHeight = window.innerHeight;
    const maxScroll = windowHeight * (images.length - 1);


    const clampedScroll = Math.max(0, Math.min(scrollY, maxScroll));


    const currentIndex = Math.floor(clampedScroll / windowHeight);
    const revealProgress =
      (clampedScroll % windowHeight) / windowHeight; 


    if (currentIndex !== currentImageIndexRef.current) {
      currentImageIndexRef.current = currentIndex;
      setCurrentImageIndex(currentIndex);
    }

    const imageElements = imageContainerRef.current.children;

    images.forEach((_, index) => {
  const img = imageElements[index];
  if (!img) return;

  if (index === currentIndex) {
    const clipAmount = revealProgress * 100;
    img.style.clipPath = `inset(0% 0% ${clipAmount}% 0%)`;
    img.style.opacity = "1";
    img.style.zIndex = "2";
  } 
  else if (index === currentIndex + 1) {
    const clipAmount = (1 - revealProgress) * 100;
    img.style.clipPath = `inset(${clipAmount}% 0% 0% 0%)`;
    img.style.opacity = "1";
    img.style.zIndex = "1";
  } 
  else if (index < currentIndex) {
    img.style.clipPath = "inset(0% 0% 0% 0%)";
    img.style.opacity = "1";
    img.style.zIndex = "0";
  } 
  else {
    img.style.clipPath = "inset(100% 0% 0% 0%)";
    img.style.opacity = "0";
    img.style.zIndex = "0";
  }
});

  };

  Promise.all(imagePromises).then(() => {
    let ticking = false;

    scrollHandler = () => {
      if (!ticking) {
        window.requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", scrollHandler, { passive: true });
    handleScroll(); // initial sync
  });

  return () => {
    if (scrollHandler) {
      window.removeEventListener("scroll", scrollHandler);
    }
  };
}, [images]);

  return (
    <div>
      {/* Fullscreen reveal animation - starts from center */}
      <div
        ref={overlayRef}
        style={{
          position: "fixed",
          top: "50%",
          left: "50%",
          width: "15px",
          height: "15px",
          clipPath: "polygon(50% 0%, 100% 50%, 50% 100%, 0% 50%)",
          backgroundColor: "#d7ff00",
          borderRadius: "0%",
          zIndex: 9999,
          pointerEvents: "none",
          transform: "translate(-50%, -50%)",
          transformOrigin: "center center",
        }}
      ></div>

      {/* Scroll spacer to enable scrolling */}
      <ScrollSpacer images={images} />

      {/* Actual page content (fixed position) */}
      <div
        ref={contentRef}
        style={{
          opacity: 0,
          position: isPinned ? "fixed" : "relative",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden",
          zIndex: 10,
        }}
      >
        {/* Events & Fests Page Content */}
        <div
          ref={containerRef}
          className="w-screen h-screen bg-black py-20 px-4 md:px-10 overflow-hidden"
        >
          <h1 className="text-4xl text-white md:text-5xl font-bold font-zentry text-center mb-12">
            NIMBUS - The Annual Technical Festival of NIT Hamirpur
          </h1>
          <div className="h-full flex gap-10">
            <div className="relative left-16 flex-1">
              <div
                ref={imageContainerRef}
                className="relative"
                style={{
                  width: "100%",
                  height: "100%",
                  position: "relative",
                  backgroundColor: "#000",
                }}
              >
                {images.map((src, index) => (
                  <img
                    key={index}
                    src={src}
                    alt={`Nimbus Festival ${index + 1}`}
                    style={{
                      position: "absolute",
                      top: 0,
                      left: 0,
                      bottom: 8,
                      width: "100%",
                      height: "90%",
                      objectFit: "contain",
                      display: "block",
                      clipPath:
                        index === 0
                          ? "inset(0% 0% 0% 0%)"
                          : "inset(100% 0% 0% 0%)",
                      opacity: index === 0 ? 1 : 0,
                      zIndex: index === 0 ? 2 : 0,
                      transition:
                        "clip-path 0.1s ease-out, opacity 0.1s ease-out",
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative text-white text-lg font-poppins md:text-xl max-w-3xl leading-relaxed flex-1 overflow-y-auto pr-4">
              <p>
                NIMBUS is all about students from different branches coming
                together, forming departmental teams and societies, making
                technical projects and organising workshops and exhibitions. In
                other words, students working for Nimbus gain knowledge about
                all sorts of technologies around, couple it with hands on
                experience and spread it around the campus for all other
                students to learn.
              </p>
              <br></br>
              <p>
                It's a huge event showcasing innovation, engineering, and tech
                skills through competitions, workshops, exhibitions (like
                Robowars, Drone Zones, RC Racing), guest lectures, and research
                presentations (Abhigya) for students from all branches,
                fostering creativity, teamwork, and a vibrant tech culture.
              </p>
              <br></br>
              <p>
                Honest Review - There's not much for the students if they are
                not part of any departmental clubs or organising teams, and if
                you are in some departmental club, then you will surely regret
                your decision of joining it because of the hectic schedule and
                workload, but still it's worth it.
              </p>
            </div>
          </div>
        </div>
      </div>

      <div>
        <div>
          <div>
            <h1 className="text-white text-9xl">uefevjvjvhhvijhvigerihvoierjvihrjbgiud </h1>
          </div>
        </div>
      </div>
    </div>
  );
}
