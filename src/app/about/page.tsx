import Image from "next/image";
import { CheckCircle2, Award, ShieldCheck } from "lucide-react";

export default function AboutPage() {
    return (
        <main className="min-h-screen bg-white ">
            {/* Hero Section */}
            <section className="py-8 bg-gray-50 overflow-hidden">
                <div className="container mx-auto ">
                    <div className="flex flex-col items-center text-center  mx-auto">
                        <div className="relative w-full mb-12 flex justify-center items-center gap-4">
                            <div className="relative w-full max-w-7xl h-64 md:h-[300px] z-10">
                                <Image
                                    src="/fl.png"
                                    alt="RBV Main Product"
                                    fill
                                    className="w-full rounded-[2rem]"
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            The RBV Difference
                        </h1>
                        <p className="text-xl text-gray-600  leading-relaxed">
                            Tired of using multiple pest products? RBV provides triple protection in a single, monthly solution. It’s available from your vet and comes with a <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">100% satisfaction guarantee.</span>
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Card 1 */}
                        <div className="flex flex-col rounded-[2.5rem] bg-[#f0f9ff] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/hero-1.png"
                                    alt="Vet Prescribed"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-[#007084] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                                    <span className="text-2xl font-bold">#1</span>
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center">
                                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                                    The #1 Vet Prescribed Combo Preventative
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col rounded-[2.5rem] bg-[#f0fdf4] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-64 w-full overflow-hidden">
                                <Image
                                    src="/hero-2.png"
                                    alt="Ticks Protection"
                                    fill
                                    className="object-cover transition-transform duration-700 group-hover:scale-110"
                                />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-[#007084] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg">
                                    <ShieldCheck size={32} />
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center">
                                <p className="text-xl md:text-2xl font-bold text-gray-900 leading-snug">
                                    The Only Combo Preventative to Kill 6 Types of Ticks
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex  col-span-2 rounded-[2.5rem] bg-[#faf5ff] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-full w-full overflow-hidden">
                                <Image
                                    src="/hero-3.png"
                                    alt="Lyme Protection"
                                    fill
                                    className="object-cover transition-transform duration-700"
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
