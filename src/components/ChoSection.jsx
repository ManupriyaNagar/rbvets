'use client';

import Image from "next/image";
import { useState } from "react";

export default function ChoSection() {
    const [isActive, setIsActive] = useState(false);

    return (
        <section className="relative w-full py-12 sm:py-16 lg:py-24 overflow-hidden">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-8 sm:gap-12 lg:gap-20">

                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 text-slate-800">

                        <header>
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-3 sm:mb-4 leading-tight">
                                <span className="text-[#9444A1]"> Duke Rawal</span> <br />
                                <span className="text-lg sm:text-2xl md:text-4xl font-semibold">
                                    Chief Happiness Officer (CHO)
                                </span>
                            </h2>

                            <p className="text-sm sm:text-base md:text-lg mb-4 font-medium text-[#9444A1] border-l-4 border-[#9444A1] pl-3 py-1 bg-white/60 rounded-r-md">
                                “A wagging welcome to RBVetcare.”
                            </p>
                        </header>

                        <div className="space-y-4 sm:space-y-6 text-sm sm:text-base md:text-lg leading-relaxed text-slate-600">
                            <p>
                                Hi, I’m Duke your Chief Happiness Officer. At RBVetcare,
                                everything we do is inspired by pets and their wellbeing.
                            </p>
                            <p>
                                As a pet-driven company, we proudly create global-standard
                                veterinary medicines and care products trusted worldwide.
                            </p>
                            <p>
                                Take a look around and discover how we’re helping pets live
                                healthier, happier lives.
                            </p>
                        </div>

                        {/* ACCENT */}
                        <div className="mt-8 sm:mt-10 flex items-center gap-3 sm:gap-4">
                            <div className="h-px bg-gradient-to-r from-purple-300 to-blue-300 flex-grow" />
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2 h-2 sm:w-2.5 sm:h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>

                    {/* IMAGE */}
                    <div
                        className="relative w-full lg:w-2/5 aspect-[4/5] sm:aspect-[3/4] lg:h-full overflow-hidden rounded-xl sm:rounded-2xl group cursor-pointer"
                        onClick={() => setIsActive(!isActive)}
                    >
                        {/* FIRST IMAGE */}
                        <Image
                            src="/duke1.png"
                            alt="CHO"
                            fill
                            priority
                            className={`object-cover transition-opacity duration-500 ${isActive ? "opacity-0" : "opacity-100"
                                } lg:group-hover:opacity-0`}
                        />

                        {/* SECOND IMAGE */}
                        <Image
                            src="/duke1.png"
                            alt="Duke"
                            fill
                            className={`object-cover transition-opacity duration-500
                                lg:group-hover:opacity-100`}
                        />
                    </div>
                </div>
            </div>
        </section>
    );
}