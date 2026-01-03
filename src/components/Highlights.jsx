import Link from "next/link";
import Image from "next/image";
import { MoveRight } from "lucide-react";

const highlights = [
    {
        title: "Why Choose RBV Care Over Other Brands?",
        linkText: "Compare Protection",
        linkHref: "/compare",
        image: "/1.jpg",
        bgColor: "bg-[#faf5ff]", // Light blue tint
    },
    {
        title: "Earn Exclusive Rewards With Every Purchase",
        linkText: "View Rewards",
        linkHref: "/rewards",
        image: "/2.jpg",
        bgColor: "bg-gray-100", // Light grey tint
    },
    {
        title: "Join 10+ Million Happy Pet Families",
        linkText: "Explore RBV",
        linkHref: "/about",
        image: "/3.jpg",
        bgColor: "bg-[#faf5ff]", // Light purple tint
    }
];

export default function Highlights() {
    return (
        <section className="py-16 bg-white">
            <div className="container mx-auto px-4">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {highlights.map((item, index) => (
                        <div
                            key={index}
                            className={`${item.bgColor} rounded-[2rem] overflow-hidden flex flex-col transition-all duration-500 hover:shadow-2xl hover:-translate-y-2 group`}
                        >
                            {/* Top Content */}
                            <div className="p-8 md:p-10 flex flex-col items-center text-center">
                                <h3 className="text-xl md:text-2xl font-bold text-gray-900 mb-6 leading-snug min-h-[4rem] flex items-center">
                                    {item.title}
                                </h3>

                                <Link
                                    href={item.linkHref}
                                    className="inline-flex items-center gap-2 text-[#9444A1] font-bold hover:opacity-80 transition-all group/link"
                                >
                                    <span className="border-b-2 border-transparent group-hover/link:border-[#9444A1]">
                                        {item.linkText}
                                    </span>
                                    <div className="w-6 h-6 rounded-full bg-[#9444A1] text-white flex items-center justify-center transition-transform group-hover/link:translate-x-1">
                                        <MoveRight size={14} />
                                    </div>
                                </Link>
                            </div>

                            {/* Bottom Image */}
                            <div className="mt-auto px-6 pb-6">
                                <div className="relative h-86 w-86 rounded-2xl overflow-hidden shadow-inner">
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="transition-transform duration-700 "
                                    />
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </section>
    );
}
