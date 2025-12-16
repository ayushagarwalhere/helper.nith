import React, { useRef, useEffect } from "react";
import gsap from "gsap";


const AcademicCalendar = () => {
  const oddSemesterRef = useRef(null);
  const evenSemesterRef = useRef(null);

  useEffect(() => {
    const applyHoverAnimation = (ref) => {
      const element = ref.current;
      if (!element) return;

      const handleMouseEnter = () => {
        gsap.to(element, {
          scale: 1.05,
          z: 50, // Translate along the Z-axis
          duration: 0.3,
          ease: "power2.out",
        });
      };

      const handleMouseLeave = () => {
        gsap.to(element, {
          scale: 1,
          z: 0,
          duration: 0.3,
          ease: "power2.out",
        });
      };

      element.addEventListener("mouseenter", handleMouseEnter);
      element.addEventListener("mouseleave", handleMouseLeave);

      return () => {
        element.removeEventListener("mouseenter", handleMouseEnter);
        element.removeEventListener("mouseleave", handleMouseLeave);
      };
    };

    const cleanupOdd = applyHoverAnimation(oddSemesterRef);
    const cleanupEven = applyHoverAnimation(evenSemesterRef);

    return () => {
      cleanupOdd();
      cleanupEven();
    };
  }, []);

  return (
    <div className="min-h-screen bg-white p-8 pt-20">
      <h1 className="text-4xl font-zentry mb-6 p-8 m-8 text-center text-gray-800">
        Academic Calendar
      </h1>
      <div className="flex flex-col md:flex-row gap-8 justify-center items-center">
        {/* Odd Semester */}
        <div
          ref={oddSemesterRef}
          className="flex-1 bg-blue-100 p-6 rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out"
          style={{ perspective: "1000px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-blue-800">Odd Semester</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Registration: August 1st week</li>
            <li>Classes Begin: August 2nd week</li>
            <li>Mid-Semester Exams: October 1st week</li>
            <li>Classes End: November 1st week</li>
            <li>End-Semester Exams: November 3rd week - 4th week</li>
            <li>Semester Break: December 1st week - January 1st week</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors block mx-auto">
            <a href="#" className="block text-center">
              Download Calendar
            </a>
          </button>
        </div>

        {/* Even Semester */}
        <div
          ref={evenSemesterRef}
          className="flex-1 bg-green-100 p-6 rounded-lg shadow-md transform-gpu transition-transform duration-300 ease-in-out"
          style={{ perspective: "1000px" }}
        >
          <h2 className="text-2xl font-semibold mb-4 text-green-800">Even Semester</h2>
          <ul className="list-disc list-inside space-y-2 text-gray-700">
            <li>Registration: January 1st week</li>
            <li>Classes Begin: January 1st week</li>
            <li>Mid-Semester Exams: February last week</li>
            <li>Classes End: April 3rd week</li>
            <li>End-Semester Exams: April 4th week - May 1st week</li>
            <li>Summer Vacation: June - July</li>
          </ul>
          <button className="mt-4 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 transition-colors block mx-auto">
            <a href="#" className="block text-center">
              Download Calendar
            </a>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AcademicCalendar;
