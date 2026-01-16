import Link from "next/link";
import Image from "next/image";

export default function Header() {
    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
            <div className="container mx-auto flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-6">
                <div className="flex items-center gap-2">
                    <Link href="/" className="flex items-center gap-2">
                        <div className="relative h-[120px] w-[180px]">
                            <Image
                                src="/logo.png"
                                alt="Logo"
                                fill
                                className="object-contain"
                            />
                        </div>
                    </Link>
                </div>

                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-md font-medium text-gray-600 hover:text-[#9444A1] transition-colors">Home</Link>
                    <Link href="/#about" className="text-md font-medium text-gray-600 hover:text-[#9444A1] transition-colors">About Us</Link>

                    <div className="relative group">
                        <button className="flex items-center gap-1 text-md font-medium text-gray-600 group-hover:text-[#9444A1] transition-colors">
                            Products
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="transition-transform group-hover:rotate-180"><path d="m6 9 6 6 6-6" /></svg>
                        </button>
                        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 translate-y-2 group-hover:translate-y-0">
                            <div className="p-2 flex flex-col gap-1">
                                <Link href="/compare" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 hover:text-[#9444A1] transition-colors">
                                    <span className="font-semibold block text-sm">Flura Med</span>
                                    <span className="text-xs text-gray-500">Fluralaner Chewable Tablets</span>
                                </Link>
                                <Link href="/rewards" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 hover:text-[#9444A1] transition-colors">
                                    <span className="font-semibold block text-sm">FiproMed Duo</span>
                                    <span className="text-xs text-gray-500">Spot-on Solution</span>
                                </Link>
                                <Link href="/about" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 hover:text-[#9444A1] transition-colors">
                                    <span className="font-semibold block text-sm">ImoxiMed</span>
                                    <span className="text-xs text-gray-500">Spot-on Solution</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/#petamour" className="text-md font-medium text-gray-600 hover:text-[#9444A1] transition-colors">Petamour</Link>
                    <Link href="/#contact" className="text-md font-medium text-gray-600 hover:text-[#9444A1] transition-colors">Contact</Link>
                </nav>

                {/* <div className="flex items-center gap-4">
                    <Link
                        href="#contact"
                        className="hidden sm:inline-flex items-center justify-center rounded-full bg-[#9444A1] px-6 py-2 text-sm font-bold text-white hover:bg-[#7a3785] transition-colors"
                    >
                        Contact
                    </Link>
                    <button className="md:hidden text-gray-600 p-2">
                        <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" strokeWidth={2} stroke="currentColor" className="w-6 h-6">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5" />
                        </svg>
                    </button>
                </div> */}
            </div>
        </header >
    );
}
