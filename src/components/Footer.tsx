"use client";

import { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
} from "lucide-react";

export default function Footer() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);

    return (
        <footer id="contact" className="relative bg-[#9444A1] pt-12 pb-8 overflow-hidden">
            {/* Background Wave */}
            <div className="absolute top-0 left-0 w-full h-64 opacity-20 pointer-events-none">
                <svg viewBox="0 0 1000 100" className="w-full h-full stroke-white/20 fill-none">
                    <path
                        d="M0 50 L100 50 L120 20 L140 80 L160 50 L300 50 L320 10 L340 90 L360 50 L600 50 L620 30 L640 70 L660 50 L1000 50"
                        strokeWidth="1"
                    />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Newsletter */}
                <div className="max-w-6xl mx-auto mb-6 text-center">
                    <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                        96% of pet owners consider pets family — RBV exists to protect that bond.
                    </h2>

                    <div className="max-w-2xl mx-auto">
                        <div className="flex items-center bg-[#953490]/20 border border-white/50 rounded-full p-2 pl-6 backdrop-blur-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none flex-grow text-white focus:outline-none placeholder:text-white/40"
                            />
                            <button className="bg-[#d7a463] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-[#c69352] transition">
                                Subscribe <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Card */}
                <div className="bg-white text-black rounded-[40px] p-10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Logo */}
                        <div>
                            <div className="relative h-24 w-56 mb-4">
                                <Image src="/logo.png" alt="RBV Logo" fill className="object-contain" />
                            </div>
                            <p className="mb-6 text-md leading-relaxed">
                                Rooted in Canadian innovation, RBV delivers premium veterinary
                                healthcare and wellness products.
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon href="https://www.facebook.com/rbvetcare/about/">
                                    <Facebook className="w-5 h-5" />
                                </SocialIcon>
                                <SocialIcon href="https://www.instagram.com/rbv_canada">
                                    <Instagram className="w-5 h-5" />
                                </SocialIcon>
                            </div>
                        </div>

                        {/* Products */}
                        <div>
                            <h4 className="text-xl font-bold mb-6">Products</h4>

                            <FooterProductDropdown
                                title="RBV"
                                isOpen={openDropdown === "rbv"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "rbv" ? null : "rbv")
                                }
                                items={[
                                    { label: "Flura Med", href: "/compare" },
                                    { label: "FiproMed Duo", href: "/rewards" },
                                    { label: "ImoxiMed", href: "/about" },
                                ]}
                            />

                            <FooterProductDropdown
                                title="PetAmour"
                                isOpen={openDropdown === "petamour"}
                                onToggle={() =>
                                    setOpenDropdown(openDropdown === "petamour" ? null : "petamour")
                                }
                                items={[
                                    { label: "No-Tick Spray", href: "/product?service=No-tick+Spray" },
                                    { label: "Entrovet Sachets", href: "/product?service=Entrovet+Sachets" },
                                    { label: "RehydraPet Sachets", href: "/product?service=RehydraPet+Sachets" },
                                    { label: "Liver Med", href: "/product?service=Liver+Med" },
                                    { label: "Bone & Joint Syrup", href: "/product?service=Bone+%26+Joint+Syrup" },
                                    { label: "Skin & Coat Syrup", href: "/product?service=Skin+%26+Coat+Syrup" },
                                ]}
                            />
                        </div>

                        {/* Links */}
                        <div>
                            <h4 className="text-xl font-bold mb-6">Links</h4>
                            <ul className="space-y-4 text-sm">
                                <FooterLink href="/#about">About Us</FooterLink>
                                <FooterLink href="/#terms">Terms & Conditions</FooterLink>
                                <FooterLink href="/#privacy">Privacy Policy</FooterLink>
                            </ul>
                        </div>

                        {/* Contact */}
                        <div>
                            <h4 className="text-xl font-bold mb-6">Contact</h4>
                            <ContactItem icon={<MapPin />} label="Address" value="Yangon, Myanmar" />
                            <ContactItem icon={<Phone />} label="Phone" value="+95 9979386000" />
                            <ContactItem icon={<Mail />} label="Email" value="info@rbv.com" />
                        </div>
                    </div>
                </div>

                <p className="text-center text-white text-sm mt-6">
                    © {new Date().getFullYear()} RBV. All Rights Reserved.
                </p>
            </div>
        </footer>
    );
}

/* ---------------- COMPONENTS ---------------- */

function FooterProductDropdown({
    title,
    items,
    isOpen,
    onToggle,
}: {
    title: string;
    items: { label: string; href: string }[];
    isOpen: boolean;
    onToggle: () => void;
}) {
    return (
        <div className="mb-4">
            <button
                onClick={onToggle}
                className="w-full flex justify-between items-center font-medium"
            >
                {title}
                <span>{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
                <ul className="mt-3 space-y-2 pl-2">
                    {items.map((item, i) => (
                        <li key={i}>
                            <Link href={item.href} className="text-sm text-gray-600 hover:text-black">
                                {item.label}
                            </Link>
                        </li>
                    ))}
                </ul>
            )}
        </div>
    );
}

function SocialIcon({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <Link
            href={href}
            target="_blank"
            className="h-10 w-10 flex items-center justify-center hover:bg-gray-100"
        >
            {children}
        </Link>
    );
}

function FooterLink({ href, children }: { href: string; children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className="hover:text-[#d7a463]">
                {children}
            </Link>
        </li>
    );
}

function ContactItem({
    icon,
    label,
    value,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
}) {
    return (
        <div className="flex gap-4 mb-4">
            <div className="h-10 w-10 flex items-center justify-center">
                {icon}
            </div>
            <div>
                <p className="text-xs">{label}</p>
                <p className="text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}
