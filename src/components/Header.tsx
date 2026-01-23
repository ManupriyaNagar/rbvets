"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";

export default function Header() {
    const [menuOpen, setMenuOpen] = useState(false);
    const [productOpen, setProductOpen] = useState(false);

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
            <div className="container mx-auto flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-6">

                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <div className="relative h-[120px] w-[180px]">
                        <Image src="/logo.png" alt="Logo" fill className="object-contain" />
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">
                    <Link href="/" className="text-md font-medium text-gray-600 hover:text-[#9444A1]">Home</Link>
                    <Link href="/#about" className="text-md font-medium text-gray-600 hover:text-[#9444A1]">About Us</Link>

                    {/* DESKTOP DROPDOWN */}
                    <div className="relative group">
                        <button className="flex items-center gap-1 text-md font-medium text-gray-600 group-hover:text-[#9444A1]">
                            Products
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <div className="p-2 space-y-1">
                                <Link href="/compare" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 text-[#9444A1]">
                                    <span className="font-semibold text-sm block">Flura Med</span>
                                    <span className="text-xs text-gray-900">Fluralaner Chewable Tablets</span>
                                </Link>
                                <Link href="/rewards" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 text-[#9444A1]">
                                    <span className="font-semibold text-sm block">FiproMed Duo</span>
                                    <span className="text-xs text-gray-900">Spot-on Solution</span>
                                </Link>
                                <Link href="/about" className="block px-4 py-3 rounded-lg hover:bg-[#9444A1]/5 text-[#9444A1]">
                                    <span className="font-semibold text-sm block">ImoxiMed</span>
                                    <span className="text-xs text-gray-900">Spot-on Solution</span>
                                </Link>
                            </div>
                        </div>
                    </div>

                    <Link href="/#petamour" className="text-md font-medium text-gray-600 hover:text-[#9444A1]">Petamour</Link>
                    <Link href="/#contact" className="text-md font-medium text-gray-600 hover:text-[#9444A1]">Contact</Link>
                </nav>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-700"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU */}
         {/* MOBILE MENU */}
{menuOpen && (
    <div className="md:hidden bg-white border-t shadow-lg">
        <div className="flex flex-col px-6 py-6 space-y-5 text-gray-700">

            <Link href="/" onClick={() => setMenuOpen(false)}>
                Home
            </Link>

            <Link href="/#about" onClick={() => setMenuOpen(false)}>
                About Us
            </Link>

            {/* MOBILE PRODUCTS ACCORDION */}
            <div className="flex flex-col">
                <button
                    onClick={() => setProductOpen(!productOpen)}
                    className="flex items-center justify-between font-medium"
                >
                    Products
                    <ChevronDown
                        className={`w-4 h-4 transition-transform ${
                            productOpen ? "rotate-180" : ""
                        }`}
                    />
                </button>

                {/* PRODUCTS LIST — ONE BY ONE */}
                <div
                    className={`overflow-hidden transition-all duration-300 ${
                        productOpen ? "max-h-60 mt-3" : "max-h-0"
                    }`}
                >
                    <div className="flex flex-col gap-3 pl-4 text-sm">
                        <Link
                            href="/compare"
                            onClick={() => {
                                setMenuOpen(false);
                                setProductOpen(false);
                            }}
                            className="py-1"
                        >
                            Flura Med
                        </Link>

                        <Link
                            href="/rewards"
                            onClick={() => {
                                setMenuOpen(false);
                                setProductOpen(false);
                            }}
                            className="py-1"
                        >
                            FiproMed Duo
                        </Link>

                        <Link
                            href="/about"
                            onClick={() => {
                                setMenuOpen(false);
                                setProductOpen(false);
                            }}
                            className="py-1"
                        >
                            ImoxiMed
                        </Link>
                    </div>
                </div>
            </div>

            <Link href="/#petamour" onClick={() => setMenuOpen(false)}>
                Petamour
            </Link>

            <Link href="/#contact" onClick={() => setMenuOpen(false)}>
                Contact
            </Link>
        </div>
    </div>
)}

        </header>
    );
}
