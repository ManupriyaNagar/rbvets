'use client'

import { useState, useEffect, useCallback } from "react";
import Image from "next/image";
import { ChevronLeft, ChevronRight } from "lucide-react";

const images = [
    {
        src: "/secondbanner/1.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    },
    {
        src: "/secondbanner/2.png",
        alt: "Professional Healthcare",
        title: "Expert Medical Care",
        description: "Our team of specialists is here to provide personalized care for your needs.",
    },
    {
        src: "/secondbanner/3.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    },
    {
        src: "/secondbanner/4.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    },
    {
        src: "/secondbanner/5.png",
        alt: "Modern Medical Facility",
        title: "Advanced Healthcare Solutions",
        description: "Dedicated to your health and well-being with state-of-the-art technology.",
    }

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
        <section className="w-full px-3 sm:px-4 py-4 sm:py-6 bg-white">
            {/* HERO BANNER */}
            <div className="container mx-auto relative group">
                <div className="relative h-[14vh] sm:h-[45vh] w-full overflow-hidden bg-gray-100 rounded-2xl sm:rounded-[2rem] shadow-sm">

                    {/* Slides */}
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className={`absolute inset-0 transition-opacity duration-700 ${index === currentIndex ? "opacity-100 z-10" : "opacity-0 z-0"
                                }`}
                        >
                            <Image
                                src={image.src}
                                alt={image.alt}
                                fill
                                priority={index === 0}
                                className="md:object-cover"
                            />
                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="absolute bottom-4 left-1/2 -translate-x-1/2 z-20 flex gap-1.5">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`h-1 rounded-full transition-all ${index === currentIndex
                                    ? "w-6 bg-white"
                                    : "w-3 bg-white/50"
                                    }`}
                            />
                        ))}
                    </div>

                    {/* Navigation Buttons (INSIDE for mobile) */}
                    <button
                        onClick={prevSlide}
                        className="hidden md:block absolute left-2 sm:-left-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white shadow text-[#9444A1]"
                    >
                        <ChevronLeft size={20} className="sm:w-6 sm:h-6" />
                    </button>

                    <button
                        onClick={nextSlide}
                        className="hidden md:block absolute right-2 sm:-right-5 top-1/2 -translate-y-1/2 z-30 p-2 sm:p-3 rounded-full bg-white shadow text-[#9444A1]"
                    >
                        <ChevronRight size={20} className="sm:w-6 sm:h-6" />
                    </button>
                </div>
            </div>

            {/* BOTTOM PROMO STRIP */}
            <div className="mt-4 sm:mt-6 grid grid-cols-2 md:grid-cols-4 gap-3 sm:gap-4 bg-gray-100 p-3 sm:p-4 rounded-lg container mx-auto">

                {[
                    { img: "/rbv/1.png", text: "Cruelty Free" },
                    { img: "/rbv/2.png", text: "Pet Friendly Products" },
                    { img: "/rbv/3.png", text: "No Harmful Additives" },
                    { img: "/rbv/4.png", text: "Responsibly made" },
                ].map((item, i) => (
                    <div
                        key={i}
                        className="flex items-center gap-3 bg-white rounded-xl px-3 py-3 sm:px-6 sm:py-5 shadow-sm"
                    >
                        <div className="w-9 h-9 sm:w-12 sm:h-12 rounded-full bg-[#9444A1] flex items-center justify-center p-1">
                            <img src={item.img} alt="" />
                        </div>
                        <p className="text-xs sm:text-sm font-semibold text-[#9444A1] leading-tight">
                            {item.text}
                        </p>
                    </div>
                ))}
            </div>
        </section>
    );
}
