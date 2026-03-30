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
                        src="/petamour-banner.png"
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
                        Your Pet. <br /> Our Passion. <br /> One Loving Brand.
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-lg">


                        At Pet Amour, we believe pets are family. That’s why we’re dedicated to creating thoughtfully formulated pet wellness solutions that enhance every wag, purr, and cuddle. With roots in veterinary science and love in every product, we combine nature, nutrition, and care to promote a healthier, happier life for pets of all kinds.
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
                        Distributorship Across the Globe
                    </button>
                </div>

            </div>
        </section>
    );
}
