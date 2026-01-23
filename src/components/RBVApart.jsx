import Image from "next/image";
import { PawPrint, ShieldCheck, FlaskConical, Globe, Award } from "lucide-react";

export default function RBVApart() {
    return (
        <section id="about" className="relative w-full bg-white">
            <div className="
                flex flex-col lg:flex-row
                h-auto lg:h-[90vh]
                relative
            ">

                {/* IMAGE */}
                <div className="
                    relative w-full lg:w-1/2
                    h-[260px] sm:h-[320px] lg:h-auto
                ">
                    <Image
                        src="/apart.png"
                        alt="Veterinarian with dog"
                        fill
                        className="object-cover"
                        priority
                    />
                </div>

                {/* CONTENT */}
                <div className="
                    w-full lg:w-1/2
                    bg-white
                    px-6 py-8 sm:px-8 sm:py-10 lg:p-12
                    text-black
                ">
                    <div className="max-w-2xl mx-auto lg:mx-0">

                        <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold mb-6">
                            What Sets RBV Apart
                        </h2>

                        <div className="relative space-y-6">

                            {/* Timeline line – hide on mobile */}
                            <div className="hidden md:block absolute left-[27px] top-6 bottom-6 w-0.5 bg-[#9444A1]/30" />

                            {/* ITEM */}
                            {[
                                {
                                    icon: <ShieldCheck size={22} />,
                                    title: "Global quality assurance",
                                    text: "Products manufactured in certified, USFDA-registered and CGMP-compliant facilities, following strict international safety protocols.",
                                },
                                {
                                    icon: <PawPrint size={22} />,
                                    title: "Vet-formulated care",
                                    text: "Globally certified, science-based treatments, supplements, and premium pet cosmetics developed with veterinary professionals.",
                                },
                                {
                                    icon: <FlaskConical size={22} />,
                                    title: "Science-driven innovation",
                                    text: "Formulas created and validated with veterinary experts, combining evidence-based actives with pet-friendly flavours and textures.",
                                },
                                {
                                    icon: <Globe size={22} />,
                                    title: "Asia-wide presence",
                                    text: "A trusted partner to vets, retailers, and distributors across Asia, backed by strong Canadian heritage and regional market expertise.",
                                },
                                {
                                    icon: <Award size={22} />,
                                    title: "Proven trust",
                                    text: "A proud member of R-Biomeds Healthcare Group, one of Asia’s leading healthcare organizations.",
                                },
                            ].map((item, i) => (
                                <div key={i} className="flex gap-4 items-start">
                                    <div className="
                                        w-12 h-12 shrink-0
                                        rounded-full
                                        border border-[#9444A1]/20
                                        text-[#9444A1]
                                        flex items-center justify-center
                                        bg-white shadow
                                    ">
                                        {item.icon}
                                    </div>
                                    <div>
                                        <h3 className="font-bold text-base sm:text-lg md:text-xl mb-1 hover:text-[#9444A1]">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm sm:text-base opacity-85 leading-relaxed">
                                            {item.text}
                                        </p>
                                    </div>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>

                {/* OVERLAP BADGE */}
                {/* Desktop absolute */}
                <div className="
                    hidden lg:flex
                    absolute bottom-24 right-1/2 translate-x-2 z-30
                    w-[42rem] justify-center
                ">
                    <div className="bg-white p-8 rounded-l-3xl border border-[#9444A1]/10">
                        <p className="text-2xl font-bold text-gray-900 hover:text-[#9444A1]">
                            74% of pet owners are willing to invest more in foods with added health benefits, so our formulas combine taste with targeted wellness support.
                        </p>
                    </div>
                </div>
            </div>

            {/* MOBILE BADGE (INLINE) */}
            <div className="lg:hidden px-6 pb-12">
                <div className="bg-white p-6 rounded-3xl border border-[#9444A1]/10 shadow">
                    <p className="text-base font-bold text-gray-900">
                        74% of pet owners are willing to invest more in foods with added health benefits, so our formulas combine taste with targeted wellness support.
                    </p>
                </div>
            </div>
        </section>
    );
}
