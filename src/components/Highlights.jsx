'use client';

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const highlights = [
    {
        title: "FluraMed",
        t2: "Fluralaner chewable tablets",
        linkText: "Explore",
        linkHref: "/compare",
        image: "/1.jpg",
        hoverimg: "/products/fluromed.jpg",
        bgColor: "bg-[#faf5ff]",
    },
    {
        title: "FiproMed Duo",
        t2: "(Spot-on Solution)",
        linkText: "Explore",
        linkHref: "/rewards",
        image: "/2.jpg",
        hoverimg: "/products/fluromeduo.jpg",
        bgColor: "bg-gray-100",
    },
    {
        title: "ImoxiMed",
        t2: "(Spot-on Solution)",
        linkText: "Explore",
        linkHref: "/about",
        image: "/3.jpg",
        hoverimg: "/products/Imoximed.jpg",
        bgColor: "bg-[#faf5ff]",
    }
];

export default function Highlights() {
    const [activeId, setActiveId] = useState(null);

    return (
        <section id="highlights" className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">

                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            onClick={() =>
                                setActiveId(activeId === index ? null : index)
                            }
                            className={`
                                group
                                ${item.bgColor}
                                rounded-[2rem]
                                overflow-hidden
                                flex flex-col
                                transition-all duration-500
                                hover:shadow-2xl hover:-translate-y-2
                                cursor-pointer
                            `}
                        >
                            {/* TOP CONTENT */}
                            <div className="p-8 md:p-10 flex flex-col items-center text-center gap-2">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {item.title}
                                </h3>
                                <h4 className="text-xl md:text-2xl font-bold text-gray-900">
                                    {item.t2}
                                </h4>

                                <Link
                                    href={item.linkHref}
                                    onClick={(e) => e.stopPropagation()}
                                    className="inline-flex items-center gap-2 text-[#9444A1] font-bold group/link"
                                >
                                    <span className="border-b-2 border-transparent group-hover/link:border-[#9444A1]">
                                        {item.linkText}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-[#9444A1] text-white flex items-center justify-center transition-transform group-hover/link:translate-x-1">
                                        <MoveRight size={14} />
                                    </div>
                                </Link>
                            </div>

                            {/* IMAGE */}
                            <div className="mt-auto px-6 pb-6">
                                <div className="relative md:h-82 h-86 w-full rounded-2xl overflow-hidden shadow-inner">

                                    {/* BASE IMAGE */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover"
                                    />

                                    {/* HOVER / TAP IMAGE */}
                                    <Image
                                        src={item.hoverimg}
                                        alt={item.title}
                                        fill
                                        className={`
                                            object-cover
                                            transition-opacity duration-500

                                            /* Mobile tap */
                                            ${activeId === index ? "opacity-100" : "opacity-0"}

                                            /* Desktop hover */
                                            md:opacity-0 md:group-hover:opacity-100
                                        `}
                                    />
                                </div>

                                {/* MOBILE HINT */}
                                <p className="mt-2 text-xs text-gray-400 text-center md:hidden">
                                    Tap image to view product
                                </p>
                            </div>
                        </div>
                    ))}

                </div>
            </div>
        </section>
    );
}
