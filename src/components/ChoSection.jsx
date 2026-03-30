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
                                “Well-bred, well-mannered, and waggily welcoming”
                            </p>
                        </header>

                        <div className="space-y-6 text-base sm:text-lg leading-relaxed text-slate-600">
                            <p>
                                Duke is a distinguished dog with an unshakeable sense of calm and just enough
                                Labrador mischief to keep things interesting. As Chief Happiness Officer, he
                                takes great pride in welcoming the team each morning, tail wagging,
                                posture perfect, ready to set the tone for the day ahead.
                            </p>
                            <p>
                                He’s been raised in an office environment, and it certainly shows. Reggie
                                knows when to be sociable, when to be serious, and how to keep the younger
                                dogs in check with effortless grace. While they bring the bounce, Reggie brings
                                the balance — with a surprise zoomy now and then 🐕✨
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
                    <div className="relative w-full lg:w-2/5 aspect-square sm:aspect-[4/5] lg:h-[600px] overflow-hidden rounded-2xl group">

                        {/* Sliding container */}
                        <div className="absolute inset-0 animate-image-swap">

                            {/* FIRST IMAGE */}
                            <div className="relative w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl rotate-0">
                                <Image
                                    src="/cho.png"
                                    alt="Reggie"
                                    fill
                                    className="object-cover"
                                    priority
                                />
                            </div>

                            {/* SECOND IMAGE */}
                            <div className="relative w-full h-full bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl rotate-0">
                                <Image
                                    src="/duke.png"
                                    alt="Duke"
                                    fill
                                    className="object-cover bg-[#9444A1]"
                                />
                            </div>

                        </div>

                        {/* Funky shadow */}
                        <div className="absolute inset-0 bg-gradient-to-br from-purple-200 to-blue-200 rounded-2xl rotate-500 scale-105 -z-10" />
                    </div>

                </div>
            </div>
        </section>
    );
}