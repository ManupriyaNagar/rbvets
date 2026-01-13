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
                    <Link href="/#products" className="text-md font-medium text-gray-600 hover:text-[#9444A1] transition-colors">Products</Link>
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
