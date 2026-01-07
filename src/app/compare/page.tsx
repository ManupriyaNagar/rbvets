import Image from "next/image";
import { CheckCircle2, Award, ShieldCheck } from "lucide-react";

const featureCards = [
    {
        id: 1,
        title: "FluraMed - 112.5mg (Fluralaner Chewable Tablets)",
        primaryImage: "/1FluraMed1125mg.jpg",
        hoverImage: "/2FluraMedBOP112.5mg.jpg",
        bgColor: "bg-[#f0f9ff]",
        icon: <ShieldCheck size={32} />,
        alt: "Vet Prescribed"
    },
    {
        id: 2,
        title: "FluraMed - 250mg (Fluralaner Chewable Tablets)",
        primaryImage: "/3FluraMed250mg.jpg",
        hoverImage: "/4FluraMedBOP250mg.jpg",
        bgColor: "bg-[#f0fdf4]",
        icon: <ShieldCheck size={32} />,
        alt: "Ticks Protection"
    },
    {
        id: 3,
        title: "FluraMed - 500mg (Fluralaner Chewable Tablets)",
        primaryImage: "/5FluraMed500mg.jpg",
        hoverImage: "/6FluraMedBOP500mg.jpg",
        bgColor: "bg-[#faf5ff]",
        icon: <ShieldCheck size={32} />,
        alt: "Lyme Protection"
    },
    {
        id: 4,
        title: "FluraMed - 1000mg (Fluralaner Chewable Tablets)",
        primaryImage: "/7FluraMed1000mg.jpg",
        hoverImage: "/8FluraMedBOP1000mg.jpg",
        bgColor: "bg-[#faf5ff]",
        icon: <ShieldCheck size={32} />,
        alt: "Lyme Protection"
    }
];

export default function ComparePage() {
    return (
        <main className="min-h-screen bg-white">
            {/* Hero Section */}
            <section className="py-8 bg-gray-50 overflow-hidden font-sans">
                <div className="container mx-auto">
                    <div className="flex flex-col items-center text-center mx-auto">
                        <div className="relative w-full shadow-md mb-12 flex justify-center items-center gap-4">
                            <div className="relative w-full max-w-7xl h-64 md:h-[300px] z-10">
                                <Image
                                    src="/bgflura.png"
                                    alt="RBV Main Product"
                                    fill
                                    className="w-full object-cover"
                                />
                            </div>
                        </div>

                        <h1 className="text-3xl md:text-4xl font-bold text-black mb-6 leading-tight">
                            FluroMed <span className="text-3xl font-medium">(Fluralaner Chewable Tablets)</span>
                        </h1>
                        <p className="text-xl text-gray-600 leading-relaxed max-w-4xl px-4">
                            Say goodbye to the monthly hassle of <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">flea</span> and  <span className="font-bold text-[#9444A1] border-b-2 border-[#9444A1]/30">tick</span> treatments!
                            <br />
                            One FLuraMed dose protects, 3X longer than monthly treatments.
                        </p>
                    </div>
                </div>
            </section>

            {/* Feature Grid */}
            <section className="py-16">
                <div className="container mx-auto px-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                        {featureCards.map((card) => (
                            <div key={card.id} className="flex flex-col rounded-[2.5rem] bg-white overflow-hidden shadow-sm transition-all duration-500 hover:shadow-2xl group border border-gray-100">
                                <div className="relative h-80 w-full overflow-hidden">
                                    {/* Primary Image */}
                                    <Image
                                        src={card.primaryImage}
                                        alt={card.alt}
                                        fill
                                        className="object-cover transition-all duration-700 group-hover:scale-110 group-hover:opacity-0"
                                    />
                                    {/* Hover Image (BOP) */}
                                    <Image
                                        src={card.hoverImage}
                                        alt={`${card.alt} Back`}
                                        fill
                                        className="object-cover transition-all duration-700 scale-110 opacity-0 group-hover:opacity-100 group-hover:scale-100"
                                    />

                                    <div className="absolute top-6 left-6 w-14 h-14 bg-[#9444A1] rounded-full flex items-center justify-center text-white border-4 border-white shadow-lg z-20 transition-transform duration-500 group-hover:scale-110">
                                        {card.icon}
                                    </div>

                                    <div className={`absolute inset-0 ${card.bgColor} opacity-10 group-hover:opacity-0 transition-opacity duration-500`}></div>
                                </div>
                                <div className="p-8 md:p-10 bg-white flex-grow flex items-center justify-center text-center">
                                    <p className="text-xl font-bold text-[#4A1952] leading-snug group-hover:text-[#9444A1] transition-colors duration-300">
                                        {card.title}
                                    </p>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>
        </main>
    );
}
