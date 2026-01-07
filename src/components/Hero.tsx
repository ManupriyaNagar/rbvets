"use client";

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        src: "/hero/11.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    },
    {
        src: "/hero/22.png",
        alt: "Professional Healthcare",
        title: "Expert Medical Care",
        description: "Our team of specialists is here to provide personalized care for your needs.",
    },
    {
        src: "/hero/3.png",
        alt: "Medical Technology",
        title: "Precision Medicine",
        description: "Using the latest diagnostic tools to ensure accurate and effective treatments.",
    },
];

export default function Hero() {
    const [currentIndex, setCurrentIndex] = useState(0);

    const nextSlide = useCallback(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
    }, []);

    const prevSlide = () => {
        setCurrentIndex((prevIndex) => (prevIndex - 1 + images.length) % images.length);
    };

    useEffect(() => {
        const interval = setInterval(nextSlide, 10000);
        return () => clearInterval(interval);
    }, [nextSlide]);

    return (
        <section className="relative h-[78vh] w-full overflow-hidden bg-gray-100">
            {/* Slides */}
            {images.map((image, index) => (
                <div
                    key={index}
                    className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                        }`}
                >
                    <Image
                        src={image.src}
                        alt={image.alt}
                        fill
                        priority={index === 0}
                        className="object-cover"
                    />
                    {/* Overlay Content */}
                    {/* <div className="absolute inset-0 bg-black/30 flex flex-col items-center justify-center text-center p-4">
                        <h1 className="text-4xl md:text-6xl font-bold text-white mb-4 max-w-4xl animate-fade-in-up">
                            {image.title}
                        </h1>
                        <p className="text-xl text-white/90 max-w-2xl mb-8 animate-fade-in-up delay-200">
                            {image.description}
                        </p>
                    </div> */}
                </div>
            ))}

            {/* Navigation Buttons */}
            <button
                onClick={prevSlide}
                className="absolute left-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all md:left-8"
                aria-label="Previous slide"
            >
                <ChevronLeft size={32} />
            </button>
            <button
                onClick={nextSlide}
                className="absolute right-4 top-1/2 -translate-y-1/2 z-20 p-2 rounded-full bg-white/20 hover:bg-white/40 text-white backdrop-blur-sm transition-all md:right-8"
                aria-label="Next slide"
            >
                <ChevronRight size={32} />
            </button>

            {/* Indicators */}
            <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                {images.map((_, index) => (
                    <button
                        key={index}
                        onClick={() => setCurrentIndex(index)}
                        className={`w-3 h-3 rounded-full transition-all ${index === currentIndex ? "bg-white scale-125" : "bg-white/50"
                            }`}
                        aria-label={`Go to slide ${index + 1}`}
                    />
                ))}
            </div>
        </section>
    );
}
