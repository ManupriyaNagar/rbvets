import Image from "next/image";
import { Play, Heart } from "lucide-react";

export default function About() {
    return (
        <section className="relative w-full bg-white">
            <div className="flex flex-col lg:flex-row h-[90vh] relative">
                {/* Left Column: Image */}
                <div className="relative w-full lg:w-1/2 lg:min-h-0">
                    <Image
                        src="/about.png"
                        alt="Veterinarian with dog"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right Column: Content & Brand Background */}
                <div className="w-full lg:w-1/2 bg-[#9444A1] p-12 md:p-10 flex flex-col  text-white">
                    <div className="max-w-2xl ">
                        <div className="relative inline-block mb-8 mt-10 ">
                            <h2 className="text-3xl md:text-5xl font-bold">About R-Biomeds Vetcare</h2>
                            <div className="absolute -bottom-2 left-0 w-3/3 h-1.5 bg-white/30 rounded-full"></div>
                        </div>

                        <div className="space-y-6 mb-12 max-w-[40rem] text-justify">
                            <p className="text-lg md:text-xl font-medium leading-relaxed opacity-95">
                                R-Biomeds Vetcare (RBV) is the dedicated pet health division of the R-Biomeds Healthcare Group, one of Asia's leading healthcare organizations.
                            </p>
                            <p className="text-base opacity-85 leading-relaxed">
                                Rooted in Canadian innovation and global quality standards, RBV delivers premium veterinary healthcare, nutrition, and wellness products for dogs and cats.
                            </p>
                            <p className="text-base opacity-85 leading-relaxed">
                                RBV bridges advanced science with everyday pet care, making clinical-grade solutions accessible and affordable to families across Asia and beyond.
                            </p>
                        </div>
                    </div>
                </div>

                {/* Centered Overlapping Mission Badge */}
                <div className="absolute bottom-24 left-1/2 -translate-x-1/2 z-30 w-full max-w-7xl px-4 flex justify-center">
                    <div className="bg-white p-6 md:p-10 rounded-3xl shadow-2xl flex flex-col md:flex-row items-center gap-8 border border-[#9444A1]/10">
                        <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#9444A1]/10 flex items-center justify-center">
                            <Heart className="w-10 h-10 text-[#9444A1]" />
                        </div>
                        <div>
                            <h4 className="text-[#9444A1] font-bold uppercase tracking-widest text-sm mb-2">Our Mission</h4>
                            <p className="text-lg md:text-2xl font-bold text-gray-900 leading-tight mb-2">
                                To make world-class pet medicines, nutrition, and lifestyle solutions accessible and affordable to every pet parent.
                            </p>
                            <p className="text-base opacity-85 leading-relaxed text-black">
                                RBV is committed to closing the gap between cutting‑edge research and real‑world pet care, because pets deserve better every day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>
            {/* Spacer for the overlapping badge */}
            <div className=""></div>
        </section>
    );
}
