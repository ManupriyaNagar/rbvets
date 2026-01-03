"use client";
import React, { useState, useEffect } from "react";
import Image from "next/image";
import { CheckCircle2, ShieldCheck } from "lucide-react";

interface Slide {
    image: string;
    alt: string;
    title: string;
    paragraph: string;
    icon?: React.ReactNode;
}

const SlidingCard = ({ slides, bgColor }: { slides: Slide[], bgColor: string }) => {
    const [currentSlide, setCurrentSlide] = useState(0);

    useEffect(() => {
        const timer = setInterval(() => {
            setCurrentSlide((prev) => (prev + 1) % slides.length);
        }, 10000); // 10 seconds
        return () => clearInterval(timer);
    }, [slides.length]);

    return (
        <div className={`flex flex-col rounded-[2.5rem] ${bgColor} overflow-hidden shadow-sm transition-all hover:shadow-xl group min-h-[500px]`}>
            <div className="relative h-64 w-full overflow-hidden">
                {slides.map((slide: Slide, index: number) => (
                    <div
                        key={index}
                        className={`absolute inset-0 transition-opacity duration-1000 ${index === currentSlide ? "opacity-100" : "opacity-0"
                            }`}
                    >
                        <Image
                            src={slide.image}
                            alt={slide.alt}
                            fill
                            className="object-cover transition-transform duration-700 group-hover:scale-110"
                        />
                        {slide.icon && (
                            <div className="absolute top-6 left-6 w-16 h-16 bg-[#007084] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                                {slide.icon}
                            </div>
                        )}
                    </div>
                ))}
            </div>
            <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center relative overflow-hidden">
                {slides.map((slide: Slide, index: number) => (
                    <div
                        key={index}
                        className={`transition-all duration-1000 flex flex-col items-center ${index === currentSlide
                            ? "opacity-100 translate-x-0"
                            : "opacity-0 translate-x-full absolute"
                            }`}
                    >
                        <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">
                            {slide.title}
                        </h3>
                        <p className="text-gray-600 leading-relaxed italic">
                            {slide.paragraph}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default function RewardsPage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-8 bg-gray-50 overflow-hidden">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center text-center mx-auto px-4">
                        <div className="relative w-full mb-12 flex justify-center items-center">
                            <div className="relative w-full max-w-7xl h-64 md:h-[400px] z-10">
                                <Image
                                    src="/fl.png"
                                    alt="RBV Main Product"
                                    fill
                                    className="w-full rounded-[2rem] object-contain"
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            The RBV Difference
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed">
                            Tired of using multiple pest products? RBV provides triple protection in a single, monthly solution. It’s available from your vet and comes with a <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">100% satisfaction guarantee.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-12">
                        {/* Card 1 - Static */}
                        <div className="flex flex-col rounded-[2.5rem] bg-[#f0f9ff] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/hero-1.png"
                                    alt="Vet Prescribed"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-[#007084] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                                    <span className="text-2xl font-bold">#1</span>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white flex-grow flex flex-col items-center justify-center text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 leading-snug mb-4">
                                    The #1 Vet Prescribed Combo Preventative
                                </h3>
                                <p className="text-gray-600 leading-relaxed italic">
                                    Trusted by veterinarians worldwide for comprehensive parasite protection.
                                </p>
                            </div>
                        </div>

                        {/* Card 2 - Sliding */}
                        <SlidingCard
                            bgColor="bg-[#f0fdf4]"
                            slides={[
                                {
                                    image: "/hero-2.png",
                                    alt: "Ticks Protection",
                                    title: "Powerful Tick Defense",
                                    paragraph: "The only combo preventative formulated to kill 6 distinct types of ticks across all life stages.",
                                    icon: <ShieldCheck size={32} />
                                },
                                {
                                    image: "/2.jpg",
                                    alt: "Quality Care",
                                    title: "Global Quality Standards",
                                    paragraph: "Manufactured in USFDA-registered facilities using cutting-edge molecular research.",
                                    icon: <CheckCircle2 size={32} />
                                }
                            ]}
                        />

                        {/* Card 3 - Sliding */}
                        <SlidingCard
                            bgColor="bg-[#faf5ff]"
                            slides={[
                                {
                                    image: "/hero-3.png",
                                    alt: "Lyme Protection",
                                    title: "Lyme Disease Prevention",
                                    paragraph: "The first combo treatment clinically proven to block Lyme infections before they spread.",
                                    icon: <CheckCircle2 size={32} />
                                },
                                {
                                    image: "/3.jpg",
                                    alt: "Proven Trust",
                                    title: "A Decade of Trust",
                                    paragraph: "Over 10 years of clinical evidence and millions of doses protecting pets across Asia.",
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
