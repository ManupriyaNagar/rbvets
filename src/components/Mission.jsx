export default function Mission() {
    return (
        <section className="relative w-full bg-white">
            <div className="container mx-auto py-10 sm:py-14 md:py-20 px-4">

                {/* Mission Card */}
                <div className="bg-[#9444A1]/10 w-full flex justify-center rounded-2xl sm:rounded-3xl">
                    <div
                        className="
              p-5 sm:p-6 md:p-10
              rounded-2xl sm:rounded-3xl
              flex flex-col md:flex-row
              items-center md:items-center
              text-center md:text-left
              gap-4 sm:gap-6 md:gap-8
              max-w-5xl
            "
                    >
                        {/* Icon */}
                        <div className="h-16 w-16 sm:h-20 sm:w-20 md:h-28 md:w-28 shrink-0 rounded-xl flex items-center justify-center">
                            <img src="/cho1.png" alt="mission icon" className="object-contain" />
                        </div>

                        {/* Content */}
                        <div>
                            <h4 className="text-[#9444A1] font-bold tracking-wide sm:tracking-widest text-xl sm:text-2xl md:text-5xl mb-2 sm:mb-3">
                                Our Mission
                            </h4>

                            <p className="text-sm sm:text-base md:text-xl text-gray-900 leading-relaxed mb-2 sm:mb-3">
                                To make world-class pet medicines, nutrition, and lifestyle solutions accessible and affordable to every pet parent.
                            </p>

                            <p className="text-sm sm:text-base md:text-xl text-gray-900 leading-relaxed">
                                RBV is committed to closing the gap between cutting-edge research and real-world pet care, because pets deserve better every day.
                            </p>
                        </div>
                    </div>
                </div>

            </div>
        </section>
    );
}