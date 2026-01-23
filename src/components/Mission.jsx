import { Heart } from "lucide-react";

export default function Mission() {
    return (
        <section className="relative w-full bg-white">
            <div className="container mx-auto py-12 md:py-20 px-4">

                {/* Mission Card */}
                <div className="bg-[#9444A1]/10 w-full flex justify-center rounded-3xl">
                    <div className="
                        p-6 sm:p-8 md:p-10
                        rounded-3xl
                        flex flex-col md:flex-row
                        items-start md:items-center
                        gap-6 md:gap-8
                        max-w-5xl
                    ">
                        {/* Icon */}
                        <div className="h-14 w-14 md:h-16 md:w-16 shrink-0 rounded-2xl bg-[#9444A1]/10 flex items-center justify-center">
                            <Heart className="w-8 h-8 md:w-10 md:h-10 text-[#9444A1]" />
                        </div>

                        {/* Content */}
                        <div>
                            <h4 className="text-[#9444A1] font-bold tracking-widest text-2xl sm:text-3xl md:text-5xl mb-3">
                                Our Mission
                            </h4>

                            <p className="text-base sm:text-lg md:text-2xl text-gray-900 leading-snug mb-3">
                                To make world-class pet medicines, nutrition, and lifestyle solutions accessible and affordable to every pet parent.
                            </p>

                            <p className="text-sm sm:text-base md:text-md opacity-85 leading-relaxed text-black">
                                RBV is committed to closing the gap between cutting-edge research and real-world pet care, because pets deserve better every day.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}
