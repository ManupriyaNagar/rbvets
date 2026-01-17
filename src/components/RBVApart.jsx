import Image from "next/image";
import { Dog, PawPrint, Syringe, ShieldCheck, FlaskConical, Globe, Award } from "lucide-react";

export default function RBVApart() {
    return (
        <section id="about" className="relative w-full bg-white">
            <div className="flex flex-col lg:flex-row h-[90vh] 2xl:h-full relative">
                {/* Left Column: Image */}
                <div className="relative w-full lg:w-1/2 lg:min-h-0">
                    <Image
                        src="/apart.png"
                        alt="Veterinarian with dog"
                        fill
                        className="object-cover"
                    />
                </div>

                {/* Right Column: Content & Brand Background */}
                <div className="w-full lg:w-1/2 bg-white  md:p-12 p-10 flex flex-col  text-black">
                    <div className="md:max-w-2xl  2xl:max-w-2xl 2xl:text-justify">
                        <div className="relative inline-block mb-8">
                            <h2 className="text-3xl md:text-5xl 2xl:text-5xl font-bold">What Sets RBV Apart</h2>

                        </div>

                        <div className="relative space-y-6">
                            {/* Vertical Line */}
                            <div className="absolute left-[27px] top-6 bottom-6 w-0.5 bg-[#9444A1]/30"></div>

                            {/* Timeline Item 1 */}
                            <div className="relative flex items-start gap-5 group">
                                <div className="peer relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#9444A1]/20 bg-white text-[#9444A1] shrink-0 shadow-lg transition-transform group-hover:scale-110">
                                    <ShieldCheck size={24} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl 2xl:text-2xl font-bold mb-1 peer-hover:text-[#9444A1] transition-colors hover:text-[#9444A1]">Global quality assurance</h3>
                                    <p className="text-sm md:text-base 2xl:text-xl opacity-85 leading-relaxed">
                                        Products manufactured in certified, USFDA‑registered and CGMP‑compliant facilities, following strict international safety protocols.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 2 */}
                            <div className="relative flex items-start gap-5 group">
                                <div className="peer relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#9444A1]/20 bg-white text-[#9444A1] shrink-0 shadow-lg transition-transform group-hover:scale-110">
                                    <PawPrint size={24} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl font-bold 2xl:text-2xl mb-1 peer-hover:text-[#9444A1] transition-colors hover:text-[#9444A1]">Vet‑formulated care</h3>
                                    <p className="text-sm md:text-base 2xl:text-xl opacity-85 leading-relaxed">
                                        Globally certified, science‑based treatments, supplements, and premium pet cosmetics developed with veterinary professionals.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 3 */}
                            <div className="relative flex items-start gap-5 group">
                                <div className="peer relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#9444A1]/20 bg-white text-[#9444A1] shrink-0 shadow-lg transition-transform group-hover:scale-110">
                                    <FlaskConical size={24} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl 2xl:text-2xl font-bold mb-1 peer-hover:text-[#9444A1] transition-colors hover:text-[#9444A1]">Science‑driven innovation</h3>
                                    <p className="text-sm md:text-base 2xl:text-xl opacity-85 leading-relaxed">
                                        Formulas created and validated with veterinary experts, combining evidence‑based actives with pet‑friendly flavours and textures.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 4 */}
                            <div className="relative flex items-start gap-5 group">
                                <div className="peer relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#9444A1]/20 bg-white text-[#9444A1] shrink-0 shadow-lg transition-transform group-hover:scale-110">
                                    <Globe size={24} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl font-bold 2xl:text-2xl mb-1 peer-hover:text-[#9444A1] transition-colors hover:text-[#9444A1]">Asia‑wide presence</h3>
                                    <p className="text-sm md:text-base 2xl:text-xl opacity-85 leading-relaxed">
                                        A trusted partner to vets, retailers, and distributors across Asia, backed by strong Canadian heritage and regional market expertise.
                                    </p>
                                </div>
                            </div>

                            {/* Timeline Item 5 */}
                            <div className="relative flex items-start gap-5 group">
                                <div className="peer relative z-10 flex items-center justify-center w-14 h-14 rounded-full border-2 border-[#9444A1]/20 bg-white text-[#9444A1] shrink-0 shadow-lg transition-transform group-hover:scale-110">
                                    <Award size={24} />
                                </div>
                                <div className="pt-1">
                                    <h3 className="text-xl 2xl:text-2xl font-bold mb-1 peer-hover:text-[#9444A1] transition-colors hover:text-[#9444A1]">Proven trust</h3>
                                    <p className="text-sm md:text-base 2xl:text-xl opacity-85 leading-relaxed">
                                        A proud member of R‑Biomeds Healthcare Group, one of Asia’s leading healthcare organizations, trusted by vets and retailers.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Centered Overlapping Mission Badge */}
                <div className="absolute bottom-24 right-1/2 translate-x-2 z-30 w-[42rem] px-2 flex justify-center">
                    <div className="bg-white p-6 md:p-8 rounded-l-3xl  flex flex-col md:flex-row items-center border border-[#9444A1]/10">
                        <div>
                            <p className="text-lg md:text-2xl font-bold text-gray-900 leading-tight mb-2 hover:text-[#9444A1]">
                                74% of pet owners are willing to invest more in foods with added health benefits, so our formulas combine taste with targeted wellness support.
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
