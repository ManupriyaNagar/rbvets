'use client';

import Image from "next/image";
import Link from "next/link";

const categories = [
    { id: 1, name: "Topical & Hygiene", image: "/category/1.png", href: "/category/topical-hygiene", slug: "topical-hygiene" },
    { id: 2, name: "Joints & Bones", image: "/category/2.png", href: "/category/joints-bones", slug: "joints-bones" },
    { id: 3, name: "Digestive & Liver Health", image: "/category/3.png", href: "/category/digestive-liver", slug: "digestive-liver" },
    { id: 4, name: "Internal Organ Care", image: "/category/4.png", href: "/category/internal-organ-care", slug: "internal-organ-care" },
    { id: 5, name: "General Wellness & Immunity", image: "/category/5.png", href: "/category/wellness-immunity", slug: "wellness-immunity" },
];

export default function CategorySection({ onCategoryHover, activeSlug }) {
    return (
        <section className=" bg-slate-50/50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="text-center mb-6">
                    <h2 className="text-3xl sm:text-4xl font-bold text-slate-900 mb-2">
                        Product <span className="text-[#9444A1]">Range</span>
                    </h2>
                    <p className="text-slate-600 max-w-2xl mx-auto">
                        Find the perfect products and care for your beloved companions across all categories.
                    </p>
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-5 gap-6 sm:gap-8 lg:gap-10">
                    {categories.map((category) => (
                        <Link 
                            href={category.href}
                            key={category.id} 
                            onMouseEnter={() => onCategoryHover && onCategoryHover(category.slug)}
                            className="group flex flex-col items-center"
                        >
                            <div className={`relative w-full aspect-square rounded-2xl overflow-hidden transition-all duration-500 ease-out flex items-center justify-center p-6 ${
                                activeSlug === category.slug ? "bg-white shadow-lg border-2 border-[#9444A1]" : ""
                            }`}>
                                {/* Decorative background element */}
                                <div className="absolute inset-0  " />
                                
                                <div className={`relative w-full h-full transition-transform duration-500 ${activeSlug === category.slug ? "scale-110" : "group-hover:scale-110"}`}>
                                    <Image
                                        src={category.image}
                                        alt={category.name}
                                        fill
                                        className="object-contain rounded-full"
                                    />
                                </div>
                            </div>
                            <div className=" text-center mt-3">
                                <h3 className={`text-base sm:text-sm font-bold transition-colors duration-300 ${
                                    activeSlug === category.slug ? "text-[#9444A1]" : "text-slate-800 group-hover:text-[#9444A1]"
                                }`}>
                                    {category.name}
                                </h3>
                                <div className={`h-0.5 bg-[#9444A1] mx-auto transition-all duration-300 ${
                                    activeSlug === category.slug ? "w-full" : "w-0 group-hover:w-full"
                                }`} />
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </section>
    );
}

