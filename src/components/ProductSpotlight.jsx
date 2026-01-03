import Link from "next/link";
import Image from "next/image";
import { ChevronRight } from "lucide-react";

export default function ProductSpotlight() {
    return (
        <section className="py-16 bg-gray-50">
            <div className="container mx-auto px-4">
                <div className="flex flex-col lg:flex-row gap-8 items-stretch">
                    {/* Left Column: Spotlight Info */}
                    <div className="w-full lg:w-3/5 bg-[#9444A1] rounded-[2.5rem] p-8 md:p-16 flex flex-col justify-center text-white relative overflow-hidden group">
                        {/* Decorative background element */}
                        <div className="absolute top-0 right-0 w-64 h-64 bg-white/5 rounded-full -mr-20 -mt-20 blur-3xl transition-transform duration-700 group-hover:scale-110"></div>

                        <div className="relative z-10 max-w-lg">
                            <h2 className="text-4xl md:text-6xl font-bold mb-6 leading-tight">
                                Product Spotlight
                            </h2>
                            <p className="text-lg md:text-xl opacity-90 mb-10 leading-relaxed">
                                Explore R‑Biomeds Vetcare's latest innovations in pet health. We create advanced solutions to treat animals more effectively, simply, and safely.
                            </p>
                            <Link
                                href="/products"
                                className="inline-flex items-center justify-center bg-white text-[#9444A1] px-10 py-4 rounded-full font-bold text-lg hover:bg-opacity-90 transition-all hover:shadow-xl hover:-translate-y-1 active:translate-y-0"
                            >
                                See More
                            </Link>
                        </div>
                    </div>

                    {/* Right Column: Product Featured Card */}
                    <div className="w-full lg:w-2/5 bg-white rounded-[2.5rem] overflow-hidden flex flex-col shadow-sm border border-gray-100 transition-all hover:shadow-2xl hover:-translate-y-1 duration-300">
                        {/* Product Image Area */}
                        <div className="h-64 md:h-80 bg-gray-100 flex items-center justify-center relative overflow-hidden p-8">
                            <Image
                                src="/img.png" // Using existing image as placeholder
                                alt="Featured Product"
                                width={400}
                                height={400}
                                className="object-contain transition-transform duration-500 hover:scale-105"
                            />
                        </div>

                        {/* Product Info Area */}
                        <div className="p-8 md:p-10 flex flex-col h-full">
                            <div className="mb-4">
                                <span className="text-[#9444A1] font-bold tracking-[0.2em] text-sm uppercase">Dogs</span>
                            </div>
                            <h3 className="text-3xl font-bold text-gray-900 mb-6 font-serif tracking-tight">
                                Librela - Advanced Support
                            </h3>

                            <div className="mt-auto">
                                <Link
                                    href="/products/librela"
                                    className="w-14 h-14 flex items-center justify-center bg-[#9444A1] rounded-full text-white shadow-lg transition-all hover:shadow-purple-200 hover:bg-[#a552b3] group"
                                >
                                    <ChevronRight className="w-6 h-6 transition-transform group-hover:translate-x-1" />
                                </Link>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
    );
}
