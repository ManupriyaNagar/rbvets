import { Stethoscope, Activity, Clock, HeartPulse, FileText } from "lucide-react";
import Image from "next/image";

const features = [
    {
        icon: "/rbvicon/1.png",
        title: "Vet Recommended",
        description: "Evidence‑based formulations for deworming, anti‑tick protection, joint support, gut health, skin and coat, and overall immunity.",
    },
    {
        icon: "/rbvicon/3.png",
        title: "Best Sellers",
        description: "FiproMed, Fluramed, ImoxiMed, and HeartMed Plus  trusted, vet‑focused formulations for dog and cat protection and wellness.",
    },
    {
        icon: "/rbvicon/2.png",
        title: "Breed‑ & Age‑specific Formulas",
        description: "Tailored nutrition and supplements for playful pups, active adults, and senior companions.",
    },
    {
        icon: "/rbvicon/4.png",
        title: "High‑Protein Nutrition",
        description: "Recipes rich in high‑quality proteins to support strength, energy, and healthy growth for both dogs and cats.",
    },
    {
        icon: "/rbvicon/5.png",
        title: "Best Quality",
        description: "Manufactured under strict international quality standards (USFDA‑linked, CGMP‑style processes) to deliver safe, consistent results for dogs and cats.",
    },
];

export default function Features() {
    return (
        <section className="py-8 bg-white">
            <div className="container mx-auto px-4">
                <div className="text-center max-w-5xl mx-auto mb-16">
                    <h2 className="text-3xl md:text-5xl font-bold text-gray-900 mb-6 leading-tight">
                        Unlock the Power of Our Exclusive Features
                    </h2>

                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-8 -mt-10">
                    {features.map((feature, index) => (
                        <div
                            key={index}
                            className="group p-8 rounded-3xl bg-gray-50 border border-gray-100 hover:bg-white hover:shadow-xl hover:-translate-y-2 transition-all duration-300"
                        >
                            <div className="mb-6 p-4 rounded-2xl bg-white w-fit mx-auto transition-colors">
                                <Image
                                    src={feature.icon}
                                    alt={feature.title}
                                    width={100}
                                    height={100}
                                    className="w-[100px] h-[100px] 2xl:w-[200px] 2xl:h-[150px]"
                                />
                            </div>
                            <h3 className="text-xl font-bold text-gray-900 mb-4">{feature.title}</h3>
                            <p className="text-gray-600 text-sm leading-relaxed">
                                {feature.description}
                            </p>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
