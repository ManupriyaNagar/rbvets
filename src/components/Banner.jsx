'use client'

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
        src: "/hero/33.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    },

];

export default function Banner() {
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
        <section className="w-full px-4 py-6 bg-white">
            {/* HERO BANNER */}
            <div className="container mx-auto relative h-[45vh] w-full overflow-hidden bg-gray-100">
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
                            className=""
                        />

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
                            className={`w-10 h-2 rounded-full transition-all ${index === currentIndex ? "bg-white scale-100" : "bg-white/50"
                                }`}
                            aria-label={`Go to slide ${index + 1}`}
                        />
                    ))}
                </div>
            </div>

            {/* BOTTOM PROMO STRIP */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg container mx-auto">

                {/* Sign In Card */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        🔄
                    </div>
                    <div>
                        <p className="font-semibold">Save 35% on first order</p>
                    </div>
                </div>

                {/* Autoship */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        🔄
                    </div>
                    <div>
                        <p className="font-semibold">Save 35% on first order</p>
                    </div>
                </div>

                {/* Pharmacy */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        🔄
                    </div>
                    <div>
                        <p className="font-semibold">Save 35% on first order</p>
                    </div>
                </div>

                {/* Pharmacy */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-blue-100 flex items-center justify-center">
                        🔄
                    </div>
                    <div>
                        <p className="font-semibold">Save 35% on first order</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
