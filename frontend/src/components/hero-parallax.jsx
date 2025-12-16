"use client";
import React from "react";
import { motion, useScroll, useTransform, useSpring } from "motion/react";
import { BentoCard, BentoTilt } from "./Features";



export const HeroParallax = ({
  products
}) => {
  const gridProducts = products.slice(0, 4);
  const ref = React.useRef(null);
  const { scrollYProgress } = useScroll({
    target: ref,
    offset: ["start start", "end start"],
  });

  const springConfig = { stiffness: 300, damping: 30, bounce: 100 };

  const rotateX = useSpring(useTransform(scrollYProgress, [0, 0.2], [10, 0]), springConfig);
  const opacity = useSpring(useTransform(scrollYProgress, [0, 0.2], [0.2, 1]), springConfig);
  const rotateZ = useSpring(useTransform(scrollYProgress, [0, 0.2], [12, 0]), springConfig);
  const translateY = useSpring(useTransform(scrollYProgress, [0, 0.2], [-500, 150]), springConfig);
  return (
    <div
      ref={ref}
      className="py-40 overflow-hidden antialiased relative flex flex-col self-auto [perspective:1000px] [transform-style:preserve-3d]">
      <Header />
      <motion.div
        style={{
          rotateX,
          rotateZ,
          translateY,
          opacity,
        }}
        className="max-w-7xl mx-auto px-4 w-full">
        <div className="grid grid-cols-2 gap-7 mt-2">
          {gridProducts.map((product) => (
            <ProductCard product={product} key={product.title} />
          ))}
        </div>
      </motion.div>
    </div>
  );
};

export const Header = () => {
  return (
    <div
      className="max-w-7xl relative mx-auto py-8 px-4 w-full left-0 top-0">
      <h1 className="text-2xl md:text-7xl font-zentry dark:text-white">
        Into The <br /> Metagame Layer
      </h1>
      <p className="max-w-2xl text-base md:text-xl mt-8 dark:text-neutral-200">
        Immerse yourself in a dynamic and ever-evolving campus world where academics, activities 
        and experiences converge into an interconnected journey shaping your college life.
      </p>
    </div>
  );
};

export const ProductCard = ({
  product
}) => {
  return (
    <div className="h-96 w-full">
      <BentoTilt className="border-hsla relative h-96 w-full overflow-hidden rounded-md">
        <BentoCard
          src={product.src}
          className={product.className}
          imgClass={product.imgClass}
          title={product.title}
          description={product.description}
          isComingSoon={product.isComingSoon}
          link={product.link}
        />
      </BentoTilt>
    </div>
  );
};
