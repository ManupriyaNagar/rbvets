'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';

const DealsSection = ({
    deals = [
        { id: 1, image: '/RBVWEbsite/1/Lifestyle.jpg', hoverimg: "/fop/1.png", title: "No-Tick Spray", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=No-tick+Spray" },
        { id: 2, image: '/RBVWEbsite/2/Lifestyle.jpg', hoverimg: "/fop/2.png", title: "Entrovet Sachets", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Entrovet+Sachets" },
        { id: 3, image: '/RBVWEbsite/3/Lifestyle.jpg', hoverimg: "/fop/3.png", title: "RehydraPet Sachets", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=RehydraPet+Sachets" },
        { id: 4, image: '/RBVWEbsite/4/Lifestyle.jpg', hoverimg: "/fop/4.png", title: "Liver Med", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Liver+Med" },
        { id: 5, image: '/RBVWEbsite/5/Lifestyle.jpg', hoverimg: "/fop/5.png", title: "Bone & Joint Syrup", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Bone+%26+Joint+Syrup" },
        { id: 6, image: '/RBVWEbsite/6/Lifestyle.jpg', hoverimg: "/fop/6.png", title: "Skin & Coat Syrup", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Skin+%26+Coat+Syrup" },
    ]
}) => {

    const scrollRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);
    const [activeId, setActiveId] = useState(null);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            setShowLeftButton(scrollRef.current.scrollLeft > 0);
        }
    };

    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        el.addEventListener('scroll', checkScrollPosition);
        checkScrollPosition();

        return () => el.removeEventListener('scroll', checkScrollPosition);
    }, []);

    const scrollRight = () => {
        scrollRef.current?.scrollBy({ left: 380, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -380, behavior: 'smooth' });
    };

    // Close mobile hover image when scrolling
    useEffect(() => {
        const el = scrollRef.current;
        if (!el) return;

        const closeActive = () => setActiveId(null);
        el.addEventListener('scroll', closeActive);

        return () => el.removeEventListener('scroll', closeActive);
    }, []);

    return (
        <section className="py-8 md:py-10 mb-10">
            <div className="container mx-auto bg-[#953490]/10 p-4 sm:p-6 relative">

                {/* CAROUSEL */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-6 snap-x snap-mandatory"
                >
                    {deals.map((deal) => (
                        <div
                            key={deal.id}
                            onClick={() =>
                                setActiveId(activeId === deal.id ? null : deal.id)
                            }
                            className="
                                group
                                w-[280px] sm:w-[320px] md:w-[360px]
                                flex-shrink-0
                                flex flex-col
                                bg-white
                                rounded-2xl
                                overflow-hidden
                                transition-transform
                                md:hover:-translate-y-1
                                cursor-pointer
                                snap-center
                            "
                        >
                            <div className="relative w-full aspect-square p-2 md:p-3">
                                <div className="relative w-full h-full rounded-xl overflow-hidden">

                                    {/* BASE IMAGE */}
                                    <Image
                                        src={deal.image}
                                        alt={deal.title}
                                        fill
                                        className="object-cover rounded-xl"
                                    />

                                    {/* HOVER / TAP IMAGE */}
                                    {/* HOVER / TAP IMAGE */}
                                    <Image
                                        src={deal.hoverimg}
                                        alt={deal.title}
                                        fill
                                        className={`
        object-cover rounded-xl
        transition-opacity duration-300

        /* Mobile tap */
        ${activeId === deal.id ? "opacity-100" : "opacity-0"}

        /* Desktop hover */
        md:opacity-0 md:group-hover:opacity-100
    `}
                                    />

                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-3 md:p-4 flex flex-col gap-1 md:gap-2">
                                <h3 className="text-gray-900 font-bold text-sm sm:text-lg">
                                    {deal.title}
                                </h3>

                                <p className="text-[#0f172a] text-xs sm:text-base line-clamp-2">
                                    {deal.paragraph}
                                </p>

                                <Link
                                    href={deal.link}
                                    className="
                                        mt-1 md:mt-2
                                        w-fit
                                        flex items-center gap-1 md:gap-2
                                        bg-[#9444A1]
                                        text-white
                                        px-4 py-2 md:px-5 md:py-2.5
                                        rounded-full
                                        font-semibold
                                        text-xs sm:text-base
                                    "
                                    onClick={(e) => e.stopPropagation()}
                                >
                                    Explore
                                    <ArrowRight size={16} />
                                </Link>

                                {/* MOBILE TAP HINT */}
                                {/* <span className="md:hidden text-xs text-gray-400 mt-1">
                                    Tap image to view product
                                </span> */}
                            </div>
                        </div>
                    ))}
                </div>

                {/* SCROLL BUTTONS */}
                {showLeftButton && (
                    <button
                        onClick={scrollLeft}
                        className="
                            flex
                            absolute left-2 md:left-0 top-1/2 -translate-y-1/2 md:-translate-x-1/2
                            z-20
                            bg-[#953490]
                            text-white p-1.5 md:p-2 rounded-full shadow-lg
                        "
                    >
                        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
                    </button>
                )}

                <button
                    onClick={scrollRight}
                    className="
                        flex
                        absolute right-2 md:right-0 top-1/2 -translate-y-1/2 md:translate-x-1/2
                        z-20
                        bg-[#953490]
                        text-white p-1.5 md:p-2 rounded-full shadow-lg
                    "
                >
                    <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
                </button>
            </div>
        </section>
    );
};

export default DealsSection;
