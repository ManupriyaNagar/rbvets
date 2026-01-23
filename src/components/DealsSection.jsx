'use client';

import React, { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Star, ChevronRight, ChevronLeft, ArrowRight } from 'lucide-react';


const deals = [
    {
        id: 1,
        image: '/RBVWEbsite/1/Lifestyle.jpg',
        hoverimg: "/fop/1.png",
        title: "No-Tick Spray",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=No-tick+Spray",

    },
    {
        id: 2,
        image: '/RBVWEbsite/2/Lifestyle.jpg',
        hoverimg: "/fop/2.png",
        title: "Entrovet Sachets",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=Entrovet+Sachets",
    },
    {
        id: 3,
        image: '/RBVWEbsite/3/Lifestyle.jpg',
        hoverimg: "/fop/3.png",
        title: "RehydraPet Sachets",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=RehydraPet+Sachets",
    },
    {
        id: 4,
        image: '/RBVWEbsite/4/Lifestyle.jpg', // Reusing image for 4th card
        hoverimg: "/fop/4.png",
        title: "Liver Med",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=Liver+Med",
    },
    {
        id: 5,
        image: '/RBVWEbsite/5/Lifestyle.jpg', // Reusing
        hoverimg: "/fop/5.png",
        title: "Bone & Joint Syrup",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=Bone+%26+Joint+Syrup",
    },
    {
        id: 6,
        image: '/RBVWEbsite/6/Lifestyle.jpg', // Reusing
        hoverimg: "/fop/6.png",
        title: "Skin & Coat Syrup",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=Skin+%26+Coat+Syrup",
    }
];
const DealsSection = ({ deals = [
    { id: 1, image: '/RBVWEbsite/1/Lifestyle.jpg', hoverimg: "/fop/1.png", title: "No-Tick Spray", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=No-tick+Spray", },
    { id: 2, image: '/RBVWEbsite/2/Lifestyle.jpg', hoverimg: "/fop/2.png", title: "Entrovet Sachets", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Entrovet+Sachets", },
    { id: 3, image: '/RBVWEbsite/3/Lifestyle.jpg', hoverimg: "/fop/3.png", title: "RehydraPet Sachets", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=RehydraPet+Sachets", },
    { id: 4, image: '/RBVWEbsite/4/Lifestyle.jpg', hoverimg: "/fop/4.png", title: "Liver Med", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Liver+Med", },
    { id: 5, image: '/RBVWEbsite/5/Lifestyle.jpg', hoverimg: "/fop/5.png", title: "Bone & Joint Syrup", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Bone+%26+Joint+Syrup", },
    { id: 6, image: '/RBVWEbsite/6/Lifestyle.jpg', hoverimg: "/fop/6.png", title: "Skin & Coat Syrup", paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit", link: "/product?service=Skin+%26+Coat+Syrup", }
] }) => {

    const scrollRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);

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
        scrollRef.current?.scrollBy({ left: 340, behavior: 'smooth' });
    };

    const scrollLeft = () => {
        scrollRef.current?.scrollBy({ left: -300, behavior: 'smooth' });
    };

    return (
        <section className="py-8 md:py-10 mb-10">
            <div className="container mx-auto bg-[#953490]/10 p-4 sm:p-6 relative">

                {/* CAROUSEL */}
                <div
                    ref={scrollRef}
                    className="flex gap-4 overflow-x-auto scroll-smooth no-scrollbar pb-4"
                >
                    {deals.map((deal) => (
                        <div
                            key={deal.id}
                            className="
                                min-w-[240px] sm:min-w-[260px]
                                max-w-[300px]
                                flex-shrink-0
                                flex flex-col
                                bg-white
                                rounded-2xl
                                overflow-hidden
                                transition-transform
                                md:hover:-translate-y-1
                            "
                        >
                            {/* IMAGE */}
                            <div className="relative w-full h-[220px] sm:h-[260px] md:h-[55vh] p-3">
                                <div className="relative w-full h-full">
                                    {/* Base image */}
                                    <Image
                                        src={deal.image}
                                        alt={deal.title}
                                        fill
                                        className="object-cover rounded-xl md:opacity-100"
                                    />

                                    {/* Hover image (DESKTOP ONLY) */}
                                    <Image
                                        src={deal.hoverimg}
                                        alt={deal.title}
                                        fill
                                        className="
                                            object-cover rounded-xl
                                            opacity-0
                                            hidden md:block
                                            md:hover:opacity-100
                                            transition-opacity
                                        "
                                    />
                                </div>
                            </div>

                            {/* CONTENT */}
                            <div className="p-4 flex flex-col gap-2">
                                <h3 className="text-gray-900 font-bold text-base sm:text-lg">
                                    {deal.title}
                                </h3>

                                <p className="text-[#0f172a] text-sm sm:text-base line-clamp-2">
                                    {deal.paragraph}
                                </p>

                                <Link
                                    href={deal.link}
                                    className="
                                        mt-2
                                        w-fit
                                        flex items-center gap-2
                                        bg-[#9444A1]
                                        text-white
                                        px-5 py-2.5
                                        rounded-full
                                        font-semibold
                                        text-sm sm:text-base
                                    "
                                >
                                    Explore
                                    <ArrowRight size={18} />
                                </Link>
                            </div>
                        </div>
                    ))}
                </div>

                {/* SCROLL BUTTONS (DESKTOP ONLY) */}
                {showLeftButton && (
                    <button
                        onClick={scrollLeft}
                        className="
                            hidden md:flex
                            absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2
                            z-20
                            bg-[#953490]
                            text-white p-2 rounded-full shadow-lg
                        "
                    >
                        <ChevronLeft size={24} />
                    </button>
                )}

                <button
                    onClick={scrollRight}
                    className="
                        hidden md:flex
                        absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2
                        z-20
                        bg-[#953490]
                        text-white p-2 rounded-full shadow-lg
                    "
                >
                    <ChevronRight size={24} />
                </button>
            </div>
        </section>
    );
};

export default DealsSection;
