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
        link: "/product?service=Bone+&+Joint+Syrup",
    },
    {
        id: 6,
        image: '/RBVWEbsite/6/Lifestyle.jpg', // Reusing
        hoverimg: "/fop/6.png",
        title: "Skin & Coat Syrup",
        paragraph: "lorem ipsum dolor sit amet consectetur adipisicing elit",
        link: "/product?service=Skin+&+Coat+Syrup",
    }
];

const StarRating = ({ rating, count }) => (
    <div className="flex items-center gap-1 text-sm mt-1">
        <div className="flex text-orange-500">
            {[...Array(5)].map((_, i) => (
                <Star
                    key={i}
                    size={16}
                    fill={i < Math.floor(rating) ? "currentColor" : "none"}
                    className={i < Math.floor(rating) ? "text-orange-500" : "text-gray-300"}
                />
            ))}
        </div>
        <span className="text-gray-500 text-xs pt-1">{count}</span>
    </div>
);

const DealsSection = () => {
    const scrollRef = useRef(null);
    const [showLeftButton, setShowLeftButton] = useState(false);

    const checkScrollPosition = () => {
        if (scrollRef.current) {
            setShowLeftButton(scrollRef.current.scrollLeft > 0);
        }
    };

    useEffect(() => {
        const scrollContainer = scrollRef.current;
        if (scrollContainer) {
            scrollContainer.addEventListener('scroll', checkScrollPosition);
            // Check initial position
            checkScrollPosition();
        }
        return () => {
            if (scrollContainer) {
                scrollContainer.removeEventListener('scroll', checkScrollPosition);
            }
        };
    }, []);

    const scrollRight = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: 340, behavior: "smooth" });
        }
    };

    const scrollLeft = () => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: -300, behavior: "smooth" });
        }
    };

    return (
        <section className="py-10 mb-10">
            <div className="container mx-auto bg-[#953490]/10 p-6 relative group">
                {/* Title or Header could go here if needed, but image shows just cards */}

                {/* Carousel Container */}
                <div ref={scrollRef} className="flex overflow-x-auto gap-4 pb-4 md:pb-0 scroll-smooth no-scrollbar">
                    {deals.map((deal) => (
                        <div key={deal.id} className="min-w-[220px] md:min-w-[260px] max-w-[360px]  flex-shrink-0 flex flex-col justify-between overflow-hidden relative transition-transform hover:-translate-y-1 duration-300">



                            {/* Image Area */}
                            <div className="relative h-[55vh] w-full p-4 flex items-center justify-center">
                                <div className="relative w-full h-full">
                                    <Image
                                        src={deal.image}
                                        alt={deal.title}
                                        fill
                                        className=" transition-transform duration-300 rounded-[1rem] opacity-100 hover:opacity-0"
                                    />
                                    <Image
                                        src={deal.hoverimg}
                                        alt={deal.title}
                                        fill
                                        className=" transition-transform duration-300 rounded-[1rem] opacity-0 hover:opacity-100"
                                    />
                                </div>
                            </div>

                            {/* Content Area */}
                            <div className="p-3 flex flex-col gap-1 ">
                                <h3 className="text-gray-900 font-bold text-lg ">
                                    {deal.title}
                                </h3>
                                <p className="text-[#0f172a] text-md ">{deal.paragraph}</p>



                                <div className="mt-2 ">
                                    <Link href={deal.link}
                                        className=" group/btn w-fit flex items-center gap-2 bg-[#9444A1] text-white px-6 py-4 rounded-full font-bold"
                                    >
                                        Explore
                                        <ArrowRight size={20} className="group-hover/btn:translate-x-1 transition-transform" />
                                    </Link>

                                </div>
                            </div>
                        </div>
                    ))}

                    {/* View More Card/Button (Optional - as per arrow in image) */}
                    {/* Left Scroll Button */}
                    {showLeftButton && (
                        <button
                            onClick={scrollLeft}
                            className="absolute left-0 top-1/2 -translate-y-1/2 -translate-x-1/2 z-20 bg-[#953490] text-white p-2 rounded-full shadow-lg "
                        >
                            <ChevronLeft size={24} />
                        </button>
                    )}

                    {/* Right Scroll Button */}
                    <button
                        onClick={scrollRight}
                        className="absolute right-0 top-1/2 -translate-y-1/2 translate-x-1/2 z-20 bg-[#953490] text-white p-2 rounded-full shadow-lg "
                    >
                        <ChevronRight size={24} />
                    </button>
                </div>
            </div>
        </section>
    );
};

export default DealsSection;
