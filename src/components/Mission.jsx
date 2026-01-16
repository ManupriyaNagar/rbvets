import { Play, Heart } from "lucide-react";
export default function Mission() {
    return (
        <section className="relative w-full  bg-white">
            <div className="container mx-auto py-20">


                {/* Centered Overlapping Mission Badge */}
                <div className="bg-[#9444A1]/10 w-full max-w-7xl px-2 flex justify-center rounded-3xl ">
                    <div className="p-6 md:p-8 rounded-3xl  flex flex-col md:flex-row items-center gap-8">
                        <div className="h-16 w-16 shrink-0 rounded-2xl bg-[#9444A1]/10 flex items-center justify-center">
                            <Heart className="w-10 h-10 text-[#9444A1]" />
                        </div>
                        <div>
                            <h4 className="text-[#9444A1] font-bold tracking-widest text-5xl mb-2">Our Mission</h4>
                            <p className="text-lg md:text-2xl text-gray-900 leading-tight mb-2">
                                To make world-class pet medicines, nutrition, and lifestyle solutions accessible and affordable to every pet parent.
                            </p>
                            <p className="text-lg md:text-md opacity-85 leading-relaxed text-black">
                                RBV is committed to closing the gap between cutting‑edge research and real‑world pet care, because pets deserve better every day.
                            </p>
                        </div>
                    </div>
                </div>
            </div>

        </section>
    );
}