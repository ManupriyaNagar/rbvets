import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function ProductSpotlight() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Column: Spotlight Info */}
                    <div className="w-full lg:w-3/5 bg-[#9444A1] p-8 md:p-16 flex flex-col justify-center text-white relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>

                        <div className="relative z-10 max-w-lg">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Product Spotlight
                            </h2>
                            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                                World‑class pet medicines, nutrition, and wellness solutions for dogs and cats – trusted by vets and loved by pet parents across Asia.
                            </p>
                            <Link
                                href={"#highlights"}

                                className="inline-flex items-center justify-center bg-white text-[#9444A1] px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                            >
                                See More
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Product Featured Card */}
                    <div className="w-full lg:w-2/5 bg-white  overflow-hidden flex flex-col shadow-sm border border-gray-100 transition-all hover:shadow-2xl duration-300">
                        {/* Product Image Area */}
                        <div className="h-64 md:h-full  bg-gray-100 flex items-center justify-center relative overflow-hidden ">
                            {/* <Image
                                src="/p.png" // Using existing image as placeholder
                                alt="Featured Product"
                                width={400}
                                height={400}
                                className="object-cover transition-transform duration-500 "
                            /> */}
                            <img src="/p.png" alt="" className="object-cover transition-transform duration-500 " />
                        </div>

                        {/* Product Info Area */}
                        <div className="p-8 md:p-10 flex flex-col">
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 tracking-tight hover:text-[#9444A1] transition-colors cursor-default">
                                Globally certified manufacturing (USFDA‑registered facilities, CGMP standards)
                            </h3>


                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
