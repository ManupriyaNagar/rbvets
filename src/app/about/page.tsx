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
                            <div className="shadow-sm relative w-full  h-64 md:h-[300px] 2xl:h-[350px] z-10">
                                <Image
                                    src="/bgimoxi.png"
                                    alt="RBV Main Product"
                                    fill
                                    className="w-full "
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-6 leading-tight">
                            ImoxiMed <span className="text-3xl font-medium">(Spot-on Solutions)</span>
                        </h1>
                        <p className="text-xl text-gray-600  leading-relaxed">
                            This product is indicated for the prevention and treatment of <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">in vivo</span> and <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">in vitro parasitic</span> infections in cats.
                        </p>
                        <p className="text-xl text-gray-600 leading-relaxed">For the treatment and prevention of fleas, ear mites, and gastrointestinal worms Prevents heartworm disease.</p>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-8">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-12">
                        {/* Card 1 */}
                        <div className="flex flex-col rounded-[2.5rem] bg-[#f0f9ff] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative md:h-64 2xl:h-98 w-full overflow-hidden">
                                {/* Primary Image */}
                                <Image
                                    src="/about/211.jpg"
                                    alt="Vet Prescribed"
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
                                />
                                {/* Hover Image */}
                                <Image
                                    src="/about/233.jpg"
                                    alt="Vet Prescribed Back"
                                    fill
                                    className="object-cover transition-all duration-700 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                                />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-[#9444A1] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg z-10 transition-transform duration-500 group-hover:scale-110">
                                    <ShieldCheck size={32} />
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center">
                                <p className="text-xl md:text-2xl font-bold text-[#4A1952] leading-snug group-hover:text-[#9444A1] transition-colors duration-300">
                                    For cats weighing 4Kg or less and ferrets
                                </p>
                            </div>
                        </div>

                        {/* Card 2 */}
                        <div className="flex flex-col rounded-[2.5rem] bg-[#f0fdf4] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-64 2xl:h-98 w-full overflow-hidden">
                                {/* Primary Image */}
                                <Image
                                    src="/about/222.jpg"
                                    alt="Ticks Protection"
                                    fill
                                    className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
                                />
                                {/* Hover Image */}
                                <Image
                                    src="/about/233.jpg"
                                    alt="Ticks Protection Back"
                                    fill
                                    className="object-cover transition-all duration-700 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                                />
                                <div className="absolute top-6 left-6 w-16 h-16 bg-[#9444A1] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg z-10 transition-transform duration-500 group-hover:scale-110">
                                    <ShieldCheck size={32} />
                                </div>
                            </div>
                            <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center">
                                <p className="text-xl md:text-2xl font-bold text-[#4A1952] leading-light group-hover:text-[#9444A1] transition-colors duration-300">
                                    For Broad-spectrum protection
                                    for cats over 4 kg
                                </p>
                            </div>
                        </div>

                        {/* Card 3 */}
                        <div className="flex  col-span-2 rounded-[2.5rem] bg-[#faf5ff] overflow-hidden shadow-sm transition-all hover:shadow-xl group">
                            <div className="relative h-full 2xl:h-[60vh] w-full overflow-hidden">
                                <Image
                                    src="/imoxii.png"
                                    alt="Lyme Protection"
                                    fill
                                    className="md:object-cover 2xl:object-cover transition-transform duration-700"
                                />

                            </div>
                        </div>

                    </div>
                </div>
            </section>
        </main>
    );
}
