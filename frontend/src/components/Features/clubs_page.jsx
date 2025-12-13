import React, { useState, useRef } from "react";

export const BentoTilt = ({ children, className = "" }) => {
  const [transformStyle, setTransformStyle] = useState("");
  const itemRef = useRef(null);

  const handleMouseMove = (event) => {
    if (!itemRef.current) return;

    const { left, top, width, height } =
      itemRef.current.getBoundingClientRect();

    const relativeX = (event.clientX - left) / width;
    const relativeY = (event.clientY - top) / height;

    const tiltX = (relativeY - 0.5) * 5;
    const tiltY = (relativeX - 0.5) * -5;

    const newTransform = `perspective(700px) rotateX(${tiltX}deg) rotateY(${tiltY}deg) scale3d(.95, .95, .95)`;
    setTransformStyle(newTransform);
  };

  const handleMouseLeave = () => {
    setTransformStyle("");
  };

  return (
    <div
      ref={itemRef}
      className={className}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      style={{ transform: transformStyle }}
    >
      {children}
    </div>
  );
};

const clubsData = [
  {
    id: 1,
    name: "Technical Clubs",
    description: "Explore coding, web development, and tech innovations",
  },
  {
    id: 2,
    name: "Cultural Clubs",
    description: "Celebrate arts, music, dance, and cultural diversity",
  },
  {
    id: 3,
    name: "Sports Clubs",
    description: "Join teams and unleash your athletic potential",
  },
  {
    id: 4,
    name: "Academic Clubs",
    description: "Deepen knowledge in specialized subjects",
  },
  {
    id: 5,
    name: "Social Clubs",
    description: "Make friends and contribute to the community",
  },
];

const clubs_page = () => {
  const [clubs] = useState([...clubsData, ...clubsData]);
  const containerRef = useRef(null);

  return (
    <div className="w-screen min-h-screen bg-gradient-to-b from-purple-50 to-white overflow-hidden py-20">
      <h2 className="text-4xl font-bold font-general text-center mb-12">
        Clubs & Societies at NITH
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-8 items-center py-8 animate-scroll whitespace-nowrap"
          style={{
            animation: "scroll 40s linear infinite",
          }}
        >
          {clubs.map((club, index) => (
            <BentoTilt key={`${club.id}-${index}`}>
              <div className="h-[450px] w-80 bg-gradient-to-br from-purple-600 to-purple-900 rounded-xl text-white flex-shrink-0 mx-4 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-purple-600/30 flex flex-col justify-center p-6">
                <div className="text-center">
                  <h3 className="text-3xl font-bold mb-4 font-zentry">
                    {club.name}
                  </h3>
                  <p className="text-lg font-light">{club.description}</p>
                </div>
              </div>
            </BentoTilt>
          ))}
        </div>
      </div>

      <style jsx global>{`
        @keyframes scroll {
          0% {
            transform: translateX(0);
          }
          100% {
            transform: translateX(calc(-300px * ${clubsData.length}));
          }
        }
      `}</style>
    </div>
  );
};

export default clubs_page;
