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
        <section className="w-full px-4 py-6 bg-white">
            {/* HERO BANNER */}
            <div className="container mx-auto relative group">
                {/* Image Container with overflow hidden */}
                <div className="relative h-[45vh] w-full overflow-hidden bg-gray-100 rounded-[2rem] shadow-sm">
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

                        </div>
                    ))}

                    {/* Indicators */}
                    <div className="absolute bottom-6 left-1/2 -translate-x-1/2 z-20 flex gap-2">
                        {images.map((_, index) => (
                            <button
                                key={index}
                                onClick={() => setCurrentIndex(index)}
                                className={`w-10 h-1.5 rounded-full transition-all ${index === currentIndex ? "bg-white scale-110 shadow-md" : "bg-white/40 hover:bg-white/60"
                                    }`}
                                aria-label={`Go to slide ${index + 1}`}
                            />
                        ))}
                    </div>
                </div>

                {/* Navigation Buttons - Positioned outside the image container */}
                <button
                    onClick={prevSlide}
                    className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-30 p-3 rounded-full bg-white shadow-lg text-[#9444A1] hover:bg-[#9444A1] hover:text-white transition-all duration-300 transform md:hover:scale-110 active:scale-95"
                    aria-label="Previous slide"
                >
                    <ChevronLeft size={28} />
                </button>
                <button
                    onClick={nextSlide}
                    className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-30 p-3 rounded-full bg-white shadow-lg text-[#9444A1] hover:bg-[#9444A1] hover:text-white transition-all duration-300 transform md:hover:scale-110 active:scale-95"
                    aria-label="Next slide"
                >
                    <ChevronRight size={28} />
                </button>
            </div>

            {/* BOTTOM PROMO STRIP */}
            <div className="mt-6 grid grid-cols-1 md:grid-cols-4 gap-4 bg-gray-100 p-4 rounded-lg container mx-auto">

                {/* Sign In Card */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#9444A1] flex items-center justify-center p-1">
                        <img src="/rbv/1.png" alt="" />
                    </div>
                    <div>
                        <p className="font-semibold text-[#9444A1]">Cruelty Free</p>
                    </div>
                </div>

                {/* Autoship */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#9444A1] flex items-center justify-center p-1">
                        <img src="/rbv/2.png" alt="" />
                    </div>
                    <div>
                        <p className="font-semibold text-[#9444A1]">Pet Friendly Products</p>
                    </div>
                </div>

                {/* Pharmacy */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#9444A1] flex items-center justify-center p-1">
                        <img src="/rbv/3.png" alt="" />
                    </div>
                    <div>
                        <p className="font-semibold text-[#9444A1]">No Harmful Additives</p>
                    </div>
                </div>

                {/* Pharmacy */}
                <div className="flex items-center gap-4 bg-white rounded-2xl px-6 py-5 shadow-sm">
                    <div className="w-12 h-12 rounded-full bg-[#9444A1] flex items-center justify-center p-1">
                        <img src="/rbv/4.png" alt="" />
                    </div>
                    <div>
                        <p className="font-semibold text-[#9444A1]">Responsibly made for pets</p>
                    </div>
                </div>
            </div>
        </section>
    )
}
