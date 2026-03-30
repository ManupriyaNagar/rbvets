import Image from "next/image";

export default function ChoSection() {
    return (
        <section className="relative w-full py-16 sm:py-24 overflow-hidden">

            {/* FUN BACKGROUND BLOBS */}


            <div className="max-w-7xl mx-auto px-6 sm:px-8 lg:px-12">
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">

                    {/* CONTENT */}
                    <div className="w-full lg:w-3/5 text-slate-800">

                        <header className="">

                            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 leading-tight">
                                <span className="text-[#9444A1]">Duke</span> <br /> <span className="text-4xl"> Chief Happiness Officer (CHO) </span>
                            </h2>

                            <p className="text-lg mb-4 sm:text-xl font-medium text-[#9444A1] border-l-4 border-[#9444A1] pl-4 py-1 bg-white/50 rounded-r-md">
                                “A wagging welcome to RBVetcare.”
                            </p>
                        </header>

                        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-600">
                            <p>
                                Hi, I’m Duke your Chief Happiness Officer. At RBVetcare, everything we do is inspired by pets and their wellbeing. As a pet-driven company, we proudly create global-standard veterinary medicines and care products trusted by professionals and pet lovers worldwide.

                            </p>
                            <p>
                                Take a look around and discover how we’re helping pets live healthier, happier lives.
                            </p>
                        </div>

                        {/* FUN ACCENT */}
                        <div className="mt-12 flex items-center gap-4">
                            <div className="h-px bg-gradient-to-r from-purple-300 to-blue-300 flex-grow" />
                            <div className="flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <div
                                        key={i}
                                        className="w-2.5 h-2.5 rounded-full bg-gradient-to-r from-purple-400 to-blue-400 animate-pulse"
                                    />
                                ))}
                            </div>
                        </div>
                    </div>
                    <div className="relative w-full lg:w-2/5 aspect-square sm:aspect-[4/5] lg:h-full overflow-hidden rounded-2xl group">

                        {/* FIRST IMAGE */}
                        <Image
                            src="/cho.png"
                            alt="Reggie"
                            fill
                            priority
                            className="object-cover transition-opacity duration-500 opacity-100 group-hover:opacity-0"
                        />

                        {/* SECOND IMAGE */}
                        <Image
                            src="/duke.png"
                            alt="Duke"
                            fill
                            className="object-cover transition-opacity duration-500 opacity-0 group-hover:opacity-100"
                        />

                    </div>
                </div>
            </div>
        </section>
    );
}