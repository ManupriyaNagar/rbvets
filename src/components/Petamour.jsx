'use client';

import Image from 'next/image';
import Link from 'next/link';

export default function Petamour() {
    return (
        <section
            id="petamour"
            className="w-full bg-white py-10 sm:py-14 md:py-16 flex justify-center"
        >
            <div
                className="
          container mx-auto
          bg-gray-100
          px-4 sm:px-6 md:p-10
          py-5 sm:py-6 md:py-10
          rounded-2xl sm:rounded-[2.5rem]
          w-full
          grid grid-cols-1 md:grid-cols-3
          gap-5 sm:gap-6 md:gap-12
          text-[#0f172a]
          overflow-hidden
        "
            >

                {/* IMAGE */}
                <div className="col-span-1 md:col-span-2 relative w-full h-[200px] sm:h-[260px] md:h-[500px]">
                    <Image
                        src="/petamour-banner.png"
                        alt="Pet owner with dog"
                        fill
                        className="object-cover rounded-xl sm:rounded-2xl md:rounded-[2.5rem]"
                        priority
                    />
                </div>

                {/* CONTENT */}
                <div
                    className="
            col-span-1
            flex flex-col
            justify-center
            items-center md:items-start
            text-center md:text-left
            gap-4 sm:gap-5
          "
                >
                    <h2 className="text-xl sm:text-2xl md:text-4xl font-bold text-[#953490] leading-tight">
                        Your Pet. <br /> Our Passion. <br /> One Loving Brand.
                    </h2>

                    <p className="text-gray-600 text-sm sm:text-base md:text-lg leading-relaxed max-w-md">
                        At Pet Amour, we believe pets are family. That’s why we create
                        thoughtfully formulated wellness solutions that enhance every wag,
                        purr, and cuddle.
                    </p>

                    <Link
                        href="/contact"
                        className="
              bg-[#953490]
              hover:bg-[#a1409c]
              text-white
              font-semibold
              py-2.5 sm:py-3
              px-5 sm:px-7
              rounded-full
              transition-all
              text-sm sm:text-base
              inline-block
              shadow-md hover:shadow-lg
              active:scale-95
            "
                    >
                        Distributorship Across the Globe
                    </Link>
                </div>

            </div>
        </section>
    );
}