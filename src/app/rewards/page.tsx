"use client";
import React, { useState } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

interface Slide {
    image: string;
    hoverImage?: string;
    alt: string;
    title: string;
    tagline1: string;
    paragraph: string;
    icon?: React.ReactNode;
}

const SlidingCard = ({ slides, bgColor }: { slides: Slide[], bgColor: string }) => {
    const [currentSlide, setCurrentSlide] = useState(0);
    const [direction, setDirection] = useState(1); // 1 for next

    const nextSlide = () => {
        setDirection(1);
        setCurrentSlide((prev) => (prev + 1) % slides.length);
    };

    const variants = {
        enter: (direction: number) => ({
            x: direction > 0 ? 300 : -300,
            opacity: 0
        }),
        center: {
            zIndex: 1,
            x: 0,
            opacity: 1
        },
        exit: (direction: number) => ({
            zIndex: 0,
            x: direction < 0 ? 300 : -300,
            opacity: 0
        })
    };

    return (
        <div className={`flex flex-col rounded-[2.5rem] ${bgColor} overflow-hidden shadow-sm transition-all hover:shadow-xl group min-h-[600px] relative`}>
            {/* Image Container with Hover Effect - Restricted to this container */}
            <div className="relative h-72 w-full overflow-hidden group/img">
                <AnimatePresence initial={false} custom={direction}>
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="absolute inset-0"
                    >
                        {/* Primary Image */}
                        <Image
                            src={slides[currentSlide].image}
                            alt={slides[currentSlide].alt}
                            fill
                            className="object-cover transition-all duration-700 group-hover/img:opacity-0"
                        />
                        {/* Hover Image */}
                        {slides[currentSlide].hoverImage && (
                            <Image
                                src={slides[currentSlide].hoverImage}
                                alt={`${slides[currentSlide].alt} Back`}
                                fill
                                className="object-cover transition-all duration-700 opacity-0 group-hover/img:opacity-100 scale-110 group-hover/img:scale-100"
                            />
                        )}

                        {slides[currentSlide].icon && (
                            <div className="absolute top-6 left-6 w-14 h-14 bg-[#9444A1] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg z-20">
                                {slides[currentSlide].icon}
                            </div>
                        )}
                    </motion.div>
                </AnimatePresence>
            </div>

            {/* Content Container with Sliding Transition */}
            <div className="p-8 md:p-10 bg-white hover:bg-[#faf5ff] flex-grow flex flex-col items-center justify-center text-center relative overflow-hidden ">
                <AnimatePresence initial={false} custom={direction} mode="wait">
                    <motion.div
                        key={currentSlide}
                        custom={direction}
                        variants={variants}
                        initial="enter"
                        animate="center"
                        exit="exit"
                        transition={{
                            x: { type: "spring", stiffness: 300, damping: 30 },
                            opacity: { duration: 0.2 }
                        }}
                        className="flex flex-col items-center "
                    >

                        {/* Next Button - Only show if more than 1 slide */}
                        {slides.length > 1 && (
                            <button
                                onClick={nextSlide}
                                className=" mb-8 group/btn flex items-center gap-2 bg-[#9444A1] text-white px-6 py-2 rounded-full font-bold hover:bg-[#4A1952] transition-all transform hover:scale-105 active:scale-95 shadow-md"
                            >
                                {slides[currentSlide].tagline1}
                                <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                            </button>
                        )}

                        <h3 className="text-xl md:text-2xl font-bold text-[#4A1952] leading-snug mb-4">
                            {slides[currentSlide].title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed italic mb-8">
                            {slides[currentSlide].paragraph}
                        </p>
                    </motion.div>
                </AnimatePresence>

            </div>
        </div>
    );
};

export default function RewardsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
      <section className="py-6 md:py-8 bg-gray-50 overflow-hidden font-sans">
    <div className="container mx-auto px-4">
        <div className="flex flex-col items-center text-center mx-auto">

            {/* IMAGE */}
            <div className="relative w-full mb-8 md:mb-12 flex justify-center items-center">
                <div className="relative w-full h-[180px] sm:h-[220px] md:h-[300px] 2xl:h-[400px] z-10">
                    <Image
                        src="/bgfipro.png"
                        alt="RBV Main Product"
                        fill
                        priority
                        className="object-contain md:object-cover 2xl:object-contain"
                    />
                </div>
            </div>

            {/* HEADING */}
            <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold text-gray-900 mb-4 md:mb-6 leading-tight">
                FiproMed Duo{" "}
                <span className="block sm:inline text-lg sm:text-2xl font-medium">
                    (Spot-on Solutions)
                </span>
            </h1>

            {/* DESCRIPTION */}
            <p className="text-base sm:text-lg md:text-xl text-gray-600 leading-relaxed max-w-4xl mb-3">
                To be used against infestation with fleas, alone or in association with ticks and/or biting lice.
            </p>

            {/* CATEGORY TAG */}
            <p className="font-bold text-base sm:text-lg md:text-xl text-[#9444A1] border-b-2 border-[#9444A1]/30">
                Dewormers and Parasite Control
            </p>

        </div>
    </div>
</section>


            {/* Feature Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-12">

                        {/* Card 3 */}
                        <SlidingCard
                            bgColor="bg-[#faf5ff] hover:bg-[#faf5ff]"
                            slides={[
                                {
                                    image: "/rewards/13.jpg",
                                    hoverImage: "/rewards/16.jpg",
                                    alt: "Lyme Protection",
                                    title: "For Dogs/Cats Upto 10kg",
                                    tagline1: "0.67ml X 6 pipettes",
                                    paragraph: "Powerful Flea and Tick Defense, Loved by Pet Owners.",
                                    icon: <ShieldCheck size={32} />
                                },
                                {
                                    image: "/rewards/14.jpg",
                                    hoverImage: "/rewards/16.jpg",
                                    alt: "Proven Trust",
                                    title: "For Dogs/Cats Upto 10kg",
                                    tagline1: "0.67ml X 3 pipettes",
                                    paragraph: "Powerful Flea and Tick Defense, Loved by Pet Owners.",
                                    icon: <ShieldCheck size={32} />
                                }
                            ]}
                        />

                        {/* Card 2 */}
                        <SlidingCard
                            bgColor="bg-[#f0fdf4] hover:bg-[#faf5ff]"
                            slides={[
                                {
                                    image: "/rewards/11.jpg",
                                    hoverImage: "/rewards/16.jpg",
                                    alt: "Ticks Protection",
                                    title: "For Dogs Upto 10-20kg",
                                    tagline1: "1.36ml X 6 pipettes",
                                    paragraph: "Powerful Flea and Tick Defense, Loved by Pet Owners.",
                                    icon: <ShieldCheck size={32} />
                                },
                                {
                                    image: "/rewards/12.jpg",
                                    hoverImage: "/rewards/16.jpg",
                                    alt: "Quality Care",
                                    title: "For Dogs Upto 10-20kg",
                                    tagline1: "1.34ml X 3 pipettes",
                                    paragraph: "Powerful Flea and Tick Defense, Loved by Pet Owners.",
                                    icon: <ShieldCheck size={32} />
                                }
                            ]}
                        />



                        <SlidingCard
                            bgColor="bg-[#f0f9ff] hover:bg-[#faf5ff]"
                            slides={[
                                {
                                    image: "/rewards/15.jpg",
                                    hoverImage: "/rewards/16.jpg",
                                    alt: "Vet Prescribed",
                                    title: "For Dogs Upto 20-40kg",
                                    tagline1: "2.68ml X 3 pipettes",
                                    paragraph: "Powerful Flea and Tick Defense, Loved by Pet Owners.",
                                    icon: <ShieldCheck size={32} />
                                }
                            ]}
                        />
                    </div>
                </div>
            </section>
        </main>
    );
}
