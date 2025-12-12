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
    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
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
  
  const images = [
    "/images/events-fests/nimbus/nimbus1.png",
    "/images/events-fests/nimbus/nimbus2.png",
    "/images/events-fests/nimbus/nimbus3.png",
    "/images/events-fests/nimbus/nimbus4.png",
    "/images/events-fests/nimbus/nimbus5.png",
  ];

  useEffect(() => {
    // Calculate scale needed to cover entire screen from center
    // Using diagonal distance ensures full coverage regardless of screen size
    const diagonal = Math.sqrt(
      window.innerWidth * window.innerWidth + window.innerHeight * window.innerHeight
    );
    const initialSize = 10; // Starting size in pixels
    const scaleValue = (diagonal / initialSize) * 1.2; // Add 20% buffer to ensure full coverage

    const tl = gsap.timeline({
      onComplete: () => {
        if (overlayRef.current) {
          overlayRef.current.style.display = "none";
        }
      }
    });

    // Start from center (scale: 0) and expand to cover entire screen
    tl.fromTo(
      overlayRef.current,
      { 
        scale: 0, 
        opacity: 1
      },
      { 
        scale: scaleValue, 
        duration: 2.5, 
        ease: "power3.out"
      }
    )
    // Fade out the overlay as content appears
    .to(
      overlayRef.current,
      { 
        opacity: 0, 
        duration: 1.4, 
        ease: "power1.out" 
      },
      "-=0.3"
    )
    // Fade in the page content
    .to(
      contentRef.current,
      { 
        opacity: 1, 
        duration: 1.6, 
        ease: "power3.out" 
      },
      "-=0.2"
    );
  }, []);

  // Scroll-based progressive image reveal
  useEffect(() => {
    if (!containerRef.current || !imageContainerRef.current) return;

    // Preload all images
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

      const scrollPosition = window.scrollY;
      const triggerHeight = window.innerHeight * images.length; // Scroll distance for all images
      const scrollProgress = Math.max(
        0,
        Math.min(scrollPosition / triggerHeight, 1)
      );

      // Calculate current image index and reveal progress
      const totalProgress = scrollProgress * images.length;
      const currentIndex = Math.floor(totalProgress);
      const revealProgress = totalProgress - currentIndex; // 0 to 1 for transition between images

      // Update current image index
      const newIndex = Math.min(currentIndex, images.length - 1);
      if (newIndex !== currentImageIndexRef.current) {
        currentImageIndexRef.current = newIndex;
        setCurrentImageIndex(newIndex);
      }

      // Apply clip-path reveal for progressive image display
      if (imageContainerRef.current) {
        const imageElements = imageContainerRef.current.children;
        images.forEach((_, index) => {
          const img = imageElements[index];
          if (!img) return;

          if (index === newIndex) {
            // Current image: starts fully visible, then clips out as we scroll
            // When revealProgress = 0, image is fully visible
            // When revealProgress = 1, image is fully clipped (next image takes over)
            const clipAmount = revealProgress * 100; // 0% to 100% clipped from right
            img.style.clipPath = `inset(0% ${clipAmount}% 0% 0%)`;
            img.style.opacity = '1';
            img.style.zIndex = '2';
          } else if (index === newIndex + 1 && newIndex < images.length - 1) {
            // Next image: starts hidden, reveals as current image clips out
            // Start revealing when revealProgress > 0.7
            const nextRevealProgress = Math.max(0, Math.min((revealProgress - 0.7) / 0.3, 1));
            const nextClipAmount = (1 - nextRevealProgress) * 100; // 100% to 0% clipped from right
            img.style.clipPath = `inset(0% ${nextClipAmount}% 0% 0%)`;
            img.style.opacity = Math.min(nextRevealProgress * 1.2, 1).toString();
            img.style.zIndex = '1';
          } else if (index < newIndex) {
            // Previous images: fully visible (already shown)
            img.style.clipPath = 'inset(0% 0% 0% 0%)';
            img.style.opacity = '1';
            img.style.zIndex = '0';
          } else {
            // Future images: fully hidden
            img.style.clipPath = 'inset(0% 100% 0% 0%)';
            img.style.opacity = '0';
            img.style.zIndex = '0';
          }
        });
      }
    };

    // Wait for images to load, then set up scroll listener
    Promise.all(imagePromises).then(() => {
      // Throttle scroll events for better performance
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
      
      // Initial check
      handleScroll();
    });

    // Cleanup function
    return () => {
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
    };
  }, [images]);

  return (
    <>
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
          position: "fixed",
          top: 0,
          left: 0,
          width: "100%",
          height: "100vh",
          overflow: "hidden"
        }}
      >
        {/* Events & Fests Page Content */}
        <div ref={containerRef} className="w-screen h-screen bg-black py-20 px-4 md:px-10 overflow-hidden">
          <h1 className="text-4xl text-white md:text-5xl font-bold font-zentry text-center mb-12">
            NIMBUS - The Annual Technical Festival of NIT Hamirpur
          </h1>
          <div className="h-full flex gap-10">
            <div className="relative left-16">
              <div 
                ref={imageContainerRef}
                className="relative" 
                style={{ 
                  width: "100%", 
                  height: "auto",
                  position: "relative"
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
                      width: "100%",
                      height: "auto",
                      display: "block",
                      clipPath: index === 0 ? "inset(0% 0% 0% 0%)" : "inset(0% 100% 0% 0%)",
                      opacity: index === 0 ? 1 : 0,
                      zIndex: index === 0 ? 2 : 0,
                      transition: "clip-path 0.1s ease-out, opacity 0.1s ease-out"
                    }}
                  />
                ))}
              </div>
            </div>

            <div className="relative left-20 text-white text-lg font-poppins md:text-xl max-w-3xl leading-relaxed">
              <p>
                NIMBUS is all about students from different branches coming together, forming departmental teams and societies, making technical projects and organising workshops and exhibitions. In other words, students working for Nimbus gain knowledge about all sorts of technologies around, couple it with hands on experience and spread it around the campus for all other students to learn.
              </p>
              <br></br>
              <p>
                It's a huge event showcasing innovation, engineering, and tech skills through competitions, workshops, exhibitions (like Robowars, Drone Zones, RC Racing), guest lectures, and research presentations (Abhigya) for students from all branches, fostering creativity, teamwork, and a vibrant tech culture.
              </p>
              <br></br>
              <p>
                Honest Review - There's not much for the students if they are not part of any departmental clubs or organising teams, and if you are in some departmental club, then you will surely regret your decision of joining it because of the hectic schedule and workload, but still it's worth it.
              </p>

            </div>
            
          </div>
        </div>
      </div>
    </>
  );
}