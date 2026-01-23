import Image from "next/image";

export default function About() {
    return (
        <section className="relative w-full bg-white">
            <div className="
                container mx-auto md:px-0 px-4
                flex flex-col lg:flex-row
                h-auto lg:h-[70vh]
                relative
            ">

                {/* IMAGE (TOP on mobile, RIGHT on desktop) */}
                <div className="
                    relative w-full lg:w-1/2
                    h-[260px] sm:h-[320px] lg:h-auto
                    rounded-3xl
                ">
                    <Image
                        src="/about.png"
                        alt="Veterinarian with dog"
                        fill
                        className="object-cover rounded-3xl lg:rounded-l"
                        priority
                    />
                </div>

                {/* CONTENT */}
                <div className="
                    w-full lg:w-1/2
                    bg-[#9444A1]
                    px-6 py-8 sm:px-8 sm:py-10 lg:p-12
                    flex flex-col justify-center
                    text-white
                    rounded-3xl lg:rounded-r
                ">
                    <div className="max-w-2xl">

                        {/* HEADING */}
                        <div className="relative inline-block mb-6">
                            <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold">
                                About R-Biomeds Vetcare
                            </h2>
                            <div className="absolute -bottom-2 left-0 w-full h-1.5 bg-white/30 rounded-full"></div>
                        </div>

                        {/* TEXT */}
                        <div className="space-y-5 text-justify">
                            <p className="text-base sm:text-lg md:text-xl font-medium leading-relaxed opacity-95">
                                R-Biomeds Vetcare (RBV) is the dedicated pet health division of the R-Biomeds Healthcare Group, one of Asia's leading healthcare organizations.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg opacity-85 leading-relaxed">
                                Rooted in Canadian innovation and global quality standards, RBV delivers premium veterinary healthcare, nutrition, and wellness products for dogs and cats.
                            </p>
                            <p className="text-sm sm:text-base md:text-lg opacity-85 leading-relaxed">
                                RBV bridges advanced science with everyday pet care, making clinical-grade solutions accessible and affordable to families across Asia and beyond.
                            </p>
                        </div>

                    </div>
                </div>

            </div>
        </section>
    );
}
