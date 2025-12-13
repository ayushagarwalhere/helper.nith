import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";

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

const academicCards = [
  {
    id: 1,
    title: "ACADEMIC CALENDAR",
    path: "/academic-guide/calendar",
  },
  {
    id: 2,
    title: "DEPARTMENTS & FACULTIES",
    path: "/academic-guide/departments-faculties",
  },
  {
    id: 3,
    title: "PROGRAMS & COURSES",
    path: "/academic-guide/programs-courses",
  },
  {
    id: 4,
    title: "EVALUATION & GRADUATION",
    path: "/academic-guide/evaluation-graduation",
  },
  {
    id: 5,
    title: "RULES & REGULATIONS",
    path: "/academic-guide/rules-regulations",
  },
];

const Academic_guide = () => {
  const [cards] = useState([...academicCards, ...academicCards]);
  const containerRef = useRef(null);
  const navigate = useNavigate();

  return (
    <div
      id="academic_guide"
      className="w-screen min-h-screen bg-blue-50 overflow-hidden py-20"
    >
      <h2 className="text-4xl font-bold font-general text-center mb-12">
        Academic Guide
      </h2>

      <div className="relative w-full overflow-hidden">
        <div
          ref={containerRef}
          className="flex gap-8 items-center py-8 animate-scroll whitespace-nowrap"
          style={{
            animation: "scroll 40s linear infinite",
          }}
        >
          {cards.map((card, index) => (
            <BentoTilt key={`${card.id}-${index}`}>
              <div
                onClick={() => navigate(card.path)}
                className="h-[450px] w-80 bg-blue-900 rounded-xl text-white flex-shrink-0 mx-4 overflow-hidden cursor-pointer transition-all duration-300 hover:scale-105 hover:shadow-2xl hover:shadow-blue-900/30"
              >
                <div className="h-full w-full flex items-center justify-center p-6 text-center">
                  <h3 className="text-4xl font-extralight font-zentry">
                    {card.title}
                  </h3>
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
            transform: translateX(calc(-300px * ${academicCards.length}));
          }
        }
      `}</style>
    </div>
  );
};

export default Academic_guide;
