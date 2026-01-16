'use client';

import React from 'react';
import Image from 'next/image';

export default function Petamour() {
    return (
        <section id="petamour" className="w-full bg-white py-16  flex justify-center">
            <div className="container mx-auto bg-gray-100 p-10 rounded-[2.5rem] w-full grid grid-cols-1 md:grid-cols-3 gap-12 text-[#0f172a]">

                {/* Left Side - Image */}
                <div className="grid col-span-2 relative w-full h-[400px] md:h-[500px]">
                    <Image
                        src="/about-main.png"
                        alt="Pet owner with dog"
                        fill
                        className="object-cover rounded-[2.5rem]"
                    />
                </div>

                {/* Right Side - Content */}
                <div className="grid col-span-1 flex flex-col justify-center items-start gap-6">
                    <h2 className="text-4xl md:text-4xl font-bold text-[#953490] leading-[1.1]">
                        CarePlus pet insurance <br />
                        has your pet’s back. <br />
                        And yours.
                    </h2>
                    <p className="text-gray-600 text-lg leading-relaxed max-w-lg">
                        We get it—we’re pet parents, too. Whether you have a tiny pup or kitten or a full-grown adult,
                        you want the best protection for your pet and your budget. That’s why we designed plans that
                        cover everything you both need.
                    </p>
                    <button className="bg-[#953490] hover:bg-[#953490] text-white font-semibold py-3 px-8 rounded-full transition-colors text-lg">
                        Get a quote
                    </button>
                </div>

            </div>
        </section>
    );
}