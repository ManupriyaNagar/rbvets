"use client";

import { useState, useEffect, JSX } from "react";
import Link from "next/link";
import Image from "next/image";
import { Menu, X, ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

export default function Header(): JSX.Element {
    const [menuOpen, setMenuOpen] = useState<boolean>(false);
    const [productOpen, setProductOpen] = useState<boolean>(false);
    const [hash, setHash] = useState<string>("");

    const pathname = usePathname();

    // Track hash for sections like #about
    useEffect(() => {
        const handleHashChange = (): void => {
            setHash(window.location.hash);
        };

        handleHashChange();
        window.addEventListener("hashchange", handleHashChange);

        return () => window.removeEventListener("hashchange", handleHashChange);
    }, []);

    // Helpers
    const isActive = (path: string): boolean => pathname === path;

    const isHashActive = (value: string): boolean =>
        pathname === "/" && hash === value;

    const isProductActive: boolean =
        pathname === "/compare" ||
        pathname === "/rewards" ||
        pathname === "/about";

    const linkClass = (active: boolean): string =>
        `text-md font-medium transition-colors ${active
            ? "text-[#9444A1] font-semibold"
            : "text-gray-600 hover:text-[#9444A1]"
        }`;

    return (
        <header className="sticky top-0 z-50 w-full border-b border-gray-100 bg-white shadow-sm">
            <div className="container mx-auto flex h-[80px] items-center justify-between px-4 sm:px-6 lg:px-6">

                {/* LOGO */}
                <Link href="/" className="flex items-center">
                    <div className="relative h-[120px] w-[180px]">
                        <Image
                            src="/logo.png"
                            alt="Logo"
                            fill
                            className="object-contain"
                        />
                    </div>
                </Link>

                {/* DESKTOP NAV */}
                <nav className="hidden md:flex items-center gap-8">

                    <Link href="/" className={linkClass(isActive("/"))}>
                        Home
                    </Link>

                    <Link href="/#about" className={linkClass(isHashActive("#about"))}>
                        About Us
                    </Link>

                    {/* PRODUCTS DROPDOWN */}
                    <div className="relative group">
                        <button
                            className={`flex items-center gap-1 text-md font-medium ${isProductActive
                                ? "text-[#9444A1] font-semibold"
                                : "text-gray-600 group-hover:text-[#9444A1]"
                                }`}
                            type="button"
                        >
                            Products
                            <ChevronDown className="w-4 h-4 transition-transform group-hover:rotate-180" />
                        </button>

                        <div className="absolute top-full left-0 mt-2 w-64 bg-white shadow-lg rounded-xl border border-gray-100 opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300">
                            <div className="p-2 space-y-1">

                                <Link
                                    href="/compare"
                                    className={`block px-4 py-3 rounded-lg ${isActive("/compare")
                                        ? "bg-[#9444A1]/10 text-[#9444A1]"
                                        : "hover:bg-[#9444A1]/5 text-[#9444A1]"
                                        }`}
                                >
                                    <span className="font-semibold text-sm block">Flura Med</span>
                                    <span className="text-xs text-gray-900">
                                        Fluralaner Chewable Tablets
                                    </span>
                                </Link>

                                <Link
                                    href="/rewards"
                                    className={`block px-4 py-3 rounded-lg ${isActive("/rewards")
                                        ? "bg-[#9444A1]/10 text-[#9444A1]"
                                        : "hover:bg-[#9444A1]/5 text-[#9444A1]"
                                        }`}
                                >
                                    <span className="font-semibold text-sm block">
                                        FiproMed Duo
                                    </span>
                                    <span className="text-xs text-gray-900">
                                        Spot-on Solution
                                    </span>
                                </Link>





                                <Link
                                    href="/about"
                                    className={`block px-4 py-3 rounded-lg ${isActive("/about")
                                        ? "bg-[#9444A1]/10 text-[#9444A1]"
                                        : "hover:bg-[#9444A1]/5 text-[#9444A1]"
                                        }`}
                                >
                                    <span className="font-semibold text-sm block">
                                        ImoxiMed
                                    </span>
                                    <span className="text-xs text-gray-900">
                                        Spot-on Solution
                                    </span>
                                </Link>

                            </div>
                        </div>
                    </div>

                    <Link
                        href="/petamour"
                        className={linkClass(isHashActive("#petamour"))}
                    >
                        Petamour
                    </Link>


                    <Link href="/pet-blogs" className={linkClass(isActive("/about"))}>
                        Pet Blogs
                    </Link>

                    <Link href="/contact" className={linkClass(isActive("/contact"))}>
                        Contact
                    </Link>
                </nav>

                {/* MOBILE BUTTON */}
                <button
                    onClick={() => setMenuOpen(!menuOpen)}
                    className="md:hidden text-gray-700"
                    type="button"
                >
                    {menuOpen ? <X size={28} /> : <Menu size={28} />}
                </button>
            </div>

            {/* MOBILE MENU */}
            {menuOpen && (
                <div className="md:hidden bg-white border-t shadow-lg">
                    <div className="flex flex-col px-6 py-6 space-y-5 text-gray-700">

                        <Link
                            href="/"
                            onClick={() => setMenuOpen(false)}
                            className={linkClass(isActive("/"))}
                        >
                            Home
                        </Link>

                        <Link
                            href="/#about"
                            onClick={() => setMenuOpen(false)}
                            className={linkClass(isHashActive("#about"))}
                        >
                            About Us
                        </Link>

                        {/* MOBILE PRODUCTS */}
                        <div className="flex flex-col">
                            <button
                                onClick={() => setProductOpen(!productOpen)}
                                className={`flex items-center justify-between font-medium ${isProductActive ? "text-[#9444A1]" : ""
                                    }`}
                                type="button"
                            >
                                Products
                                <ChevronDown
                                    className={`w-4 h-4 transition-transform ${productOpen ? "rotate-180" : ""
                                        }`}
                                />
                            </button>

                            <div
                                className={`overflow-hidden transition-all duration-300 ${productOpen ? "max-h-60 mt-3" : "max-h-0"
                                    }`}
                            >
                                <div className="flex flex-col gap-3 pl-4 text-sm">

                                    <Link
                                        href="/compare"
                                        onClick={() => setMenuOpen(false)}
                                        className={linkClass(isActive("/compare"))}
                                    >
                                        Flura Med
                                    </Link>

                                    <Link
                                        href="/rewards"
                                        onClick={() => setMenuOpen(false)}
                                        className={linkClass(isActive("/rewards"))}
                                    >
                                        FiproMed Duo
                                    </Link>

                                    <Link
                                        href="/about"
                                        onClick={() => setMenuOpen(false)}
                                        className={linkClass(isActive("/about"))}
                                    >
                                        ImoxiMed
                                    </Link>

                                </div>
                            </div>
                        </div>

                        <Link
                            href="/#petamour"
                            onClick={() => setMenuOpen(false)}
                            className={linkClass(isHashActive("#petamour"))}
                        >
                            Petamour
                        </Link>

                        <Link
                            href="/contact"
                            onClick={() => setMenuOpen(false)}
                            className={linkClass(isActive("/contact"))}
                        >
                            Contact
                        </Link>

                    </div>
                </div>
            )}
        </header>
    );
}