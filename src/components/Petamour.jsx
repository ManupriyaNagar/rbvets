'use client';

import React from 'react';
import Image from 'next/image';

export default function Petamour() {
    return (
        <section
            id="petamour"
            className="w-full bg-white py-10 md:py-16 flex justify-center"
        >
            <div className="
                container mx-auto
                bg-gray-100
                px-6 py-8 sm:px-8 sm:py-10 md:p-10
                rounded-[2.5rem]
                w-full
                grid grid-cols-1 md:grid-cols-3
                gap-8 md:gap-12
                text-[#0f172a]
            ">

                {/* IMAGE */}
                <div className="col-span-1 md:col-span-2 relative w-full h-[220px] sm:h-[300px] md:h-[500px]">
                    <Image
                        src="/about-main.png"
                        alt="Pet owner with dog"
                        fill
                        className="object-cover rounded-[2.5rem]"
                        priority
                    />
                </div>

                {/* CONTENT */}
                <div className="
                    col-span-1
                    flex flex-col
                    justify-center
                    items-start md:items-start
                    gap-5
                    text-left md:text-left
                ">
                    <h2 className="text-2xl sm:text-3xl md:text-4xl font-bold text-[#953490] leading-tight">
                        CarePlus pet insurance <br />
                        has your pet’s back. <br />
                        And yours.
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">
                        We get it—we’re pet parents, too. Whether you have a tiny pup or kitten or a full-grown adult,
                        you want the best protection for your pet and your budget. That’s why we designed plans that
                        cover everything you both need.
                    </p>

                    <button className="
                        bg-[#953490]
                        hover:bg-[#953490]
                        text-white
                        font-semibold
                        py-2.5 sm:py-3
                        px-6 sm:px-8
                        rounded-full
                        transition-colors
                        text-base sm:text-lg
                    ">
                        Get a quote
                    </button>
                </div>

            </div>
        </section>
    );
}
