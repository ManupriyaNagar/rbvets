"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    { src: "/banner/11.png", alt: "Modern Medical Facility" },
    { src: "/banner/3.png", alt: "Professional Healthcare" },
    { src: "/banner/4.png", alt: "Professional Healthcare" },
    { src: "/banner/5.png", alt: "Professional Healthcare" },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);
    const [paused, setPaused] = useState(false);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prev) => (prev + 1) % images.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prev) => (prev - 1 + images.length) % images.length);
    };

    useEffect(() => {
        if (paused) return;
        const interval = setInterval(nextSlide, 3000);
        return () => clearInterval(interval);
    }, [nextSlide, paused]);

    return (
        <section
            className="
                relative w-full overflow-hidden bg-gray-100
                h-[60vh] sm:h-[65vh] md:h-[78vh]
            "
            onTouchStart={() => setPaused(true)}
            onTouchEnd={() => setPaused(false)}
        >
            {/* Slides */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
                        index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                    }`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                    />
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="
                    absolute left-3 sm:left-4 md:left-8
                    top-1/2 -translate-y-1/2 z-20
                    p-1.5 sm:p-2
                    rounded-full
                    bg-white/30 hover:bg-white/50
                    text-white backdrop-blur-sm transition-all
                "
                aria-label="Previous slide"
            >
                <ChevronLeft size={24} className="sm:hidden" />
                <ChevronLeft size={32} className="hidden sm:block" />
            </button>

            <button
                onClick={nextSlide}
                className="
                    absolute right-3 sm:right-4 md:right-8
                    top-1/2 -translate-y-1/2 z-20
                    p-1.5 sm:p-2
                    rounded-full
                    bg-white/30 hover:bg-white/50
                    text-white backdrop-blur-sm transition-all
                "
                aria-label="Next slide"
            >
                <ChevronRight size={24} className="sm:hidden" />
                <ChevronRight size={32} className="hidden sm:block" />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-4 sm:bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-2.5 h-2.5 sm:w-3 sm:h-3 rounded-full transition-all ${
                            index === currentIndex
                                ? "bg-white scale-125"
                                : "bg-white/50"
                        }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
