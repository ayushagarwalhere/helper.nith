import React, { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { GlareCard } from "../glare-card";

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
export function GlareCardDemo() {
  return (
    <GlareCard className="flex flex-col items-center justify-center">
      <svg
        width="66"
        height="65"
        viewBox="0 0 66 65"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        className="h-7 w-7 text-white"
      >
        <path
          d="M8 8.05571C8 8.05571 54.9009 18.1782 57.8687 30.062C60.8365 41.9458 9.05432 57.4696 9.05432 57.4696"
          stroke="currentColor"
          strokeWidth="15"
          strokeMiterlimit="3.86874"
          strokeLinecap="round"
        />
      </svg>
      <p className="text-white font-bold text-xl mt-4">Aceternity</p>
    </GlareCard>
  );
}

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
            <div key={`${card.id}-${index}`} className="flex-shrink-0" onClick={() => navigate(card.path)}>
              <GlareCard className="cursor-pointer" colorScheme="default" bgColor="rgba(230, 245, 250, 0.9)" >
                <div className="h-full w-full flex items-center justify-center p-6 text-center">
                  <h3 className="text-2xl font-extralight font-zentry text-white">
                    {card.title}
                  </h3>
                </div>
              </GlareCard>
            </div>
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
