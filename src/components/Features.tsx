import Image from "next/image";

const features = [
    {
        icon: "/rbvicon/1.png",
        title: "Vet Recommended",
        description:
            "Evidence-based formulations for deworming, anti-tick protection, joint support, gut health, skin and coat, and overall immunity.",
    },
    {
        icon: "/rbvicon/3.png",
        title: "Best Sellers",
        description:
            "FiproMed, Fluramed, ImoxiMed, and HeartMed Plus trusted, vet-focused formulations.",
    },
    {
        icon: "/rbvicon/2.png",
        title: "Breed- & Age-specific",
        description:
            "Tailored nutrition for pups, adults, and senior companions.",
    },
    {
        icon: "/rbvicon/4.png",
        title: "High-Protein Nutrition",
        description:
            "Supports strength, energy, and healthy growth for pets.",
    },
    {
        icon: "/rbvicon/5.png",
        title: "Best Quality",
        description:
            "Manufactured under strict global quality standards.",
    },
];

export default function Features() {
    return (
        <section className="py-10 sm:py-14 bg-white">
            <div className="container mx-auto px-4">

                {/* Heading */}
                <div className="text-center max-w-3xl mx-auto mb-10 sm:mb-14">
                    <h2 className="text-2xl sm:text-3xl md:text-5xl font-bold text-gray-900 leading-tight">
                        Unlock the Power of Our Exclusive Features
                    </h2>
                </div>

                {/* Grid */}
                <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4 sm:gap-6 md:gap-8">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-4 sm:p-6 md:p-8 rounded-2xl sm:rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-sm sm:hover:shadow-sm transition-all duration-300"
                        >
                            {/* Icon */}
                            <div className="mb-4 sm:mb-6 p-2 sm:p-4 rounded-xl sm:rounded-2xl bg-white w-fit mx-auto">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={80}
                                    height={80}
                                    className="w-[60px] h-[60px] sm:w-[80px] sm:h-[80px] md:w-[100px] md:h-[100px]"
                                />
                            </div>

                            {/* Title */}
                            <h3 className="text-sm sm:text-base md:text-lg font-bold text-gray-900 mb-2 sm:mb-3 text-center">
                                {feature.title}
                            </h3>

                            {/* Description */}
                            <p className="text-gray-600 text-xs sm:text-sm leading-relaxed text-center">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}