"use client";

import React, { useState } from "react";
import Link from "next/link";
import Image from "next/image";
import {
    Facebook,
    Instagram,
    MapPin,
    Phone,
    Mail,
    ArrowRight,
    Loader2,
} from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

export default function Footer() {
    const [openDropdown, setOpenDropdown] = useState<string | null>(null);
    const [email, setEmail] = useState("");
    const [status, setStatus] = useState<"idle" | "submitting" | "success" | "error">("idle");

    const handleSubscribe = async (e: React.FormEvent) => {
        e.preventDefault();
        if (!email) return;

        setStatus("submitting");
        try {
            const formData = new FormData();
            formData.append("access_key", "dadb38a5-7e64-425f-8def-7bf97e069b89");
            formData.append("email", email);
            formData.append("subject", "Welcome to the petamour world");
            formData.append("from_name", "PetAmour");
            formData.append("message", `A new subscriber has joined the PetAmour world: ${email}`);

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setStatus("success");
                setEmail("");
            } else {
                setStatus("error");
            }
        } catch (error) {
            setStatus("error");
        }
    };

    return (
        <footer className="relative bg-[#9444A1] pt-12 pb-8 overflow-hidden">
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
                        96% of pet owners consider pets family <br /> RBV exists to protect that bond.
                    </h2>

                    <form onSubmit={handleSubscribe} className="max-w-2xl mx-auto">
                        <div className="flex items-center bg-[#953490]/20 border border-white/50 rounded-full p-2 pl-6 backdrop-blur-sm">
                            <input
                                type="email"
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                                required
                                placeholder="Enter your email"
                                className="bg-transparent border-none flex-grow text-white focus:outline-none placeholder:text-white/40 text-sm md:text-base outline-none"
                            />
                            <button
                                type="submit"
                                disabled={status === "submitting"}
                                className="bg-[#d7a463] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-[#c69352] transition disabled:opacity-80 disabled:cursor-not-allowed cursor-pointer whitespace-nowrap text-sm md:text-base"
                            >
                                {status === "submitting" ? (
                                    <>
                                        Subscribing...
                                        <Loader2 className="w-4 h-4 animate-spin" />
                                    </>
                                ) : (
                                    <>
                                        Subscribe <ArrowRight className="w-4 h-4" />
                                    </>
                                )}
                            </button>
                        </div>

                        {/* Status Message */}
                        <div className="mt-3 h-6 flex justify-center items-center">
                            <AnimatePresence mode="wait">
                                {status === "success" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-green-300 font-semibold text-sm"
                                    >
                                        🎉 Welcome to the petamour world! Check your inbox for confirmation.
                                    </motion.p>
                                )}
                                {status === "error" && (
                                    <motion.p
                                        initial={{ opacity: 0, y: -5 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: -5 }}
                                        className="text-red-300 font-semibold text-sm"
                                    >
                                        ⚠️ Subscription failed. Please try again.
                                    </motion.p>
                                )}
                            </AnimatePresence>
                        </div>
                    </form>
                </div>

                {/* Footer Card */}
                <div className="bg-white text-black rounded-[40px] p-10 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">

                        {/* Logo */}
                        <div className="flex flex-col items-center md:items-start text-center md:text-left">
                            <div className="relative h-24 w-56 mb-4 mx-auto md:mx-0">
                                <Image src="/logo.png" alt="RBV Logo" fill className="object-contain" />
                            </div>
                            <p className="mb-6 text-md leading-relaxed max-w-sm">
                                Rooted in Canadian innovation, RBV delivers premium veterinary
                                healthcare and wellness products.
                            </p>
                            <div className="flex gap-6 justify-center md:justify-start w-full">
                                <div className="space-y-3 text-center">
                                    <span className="text-[10px] text-center font-bold text-[#9444A1] uppercase tracking-widest">RBV</span>
                                    <div className="flex gap-3">
                                        <SocialIcon href="https://www.facebook.com/rbvetcare/about/">
                                            <Facebook className="w-5 h-5" />
                                        </SocialIcon>
                                        <SocialIcon href="https://www.instagram.com/rbv_canada">
                                            <Instagram className="w-5 h-5" />
                                        </SocialIcon>
                                    </div>
                                </div>

                                {/* Vertical Divider */}
                                <div className="w-[2px] bg-[#9444A1]"></div>

                                <div className="space-y-3 text-center">
                                    <span className="text-[10px] font-bold text-[#9444A1] uppercase text-center tracking-widest">PetAmour</span>
                                    <div className="flex gap-3">
                                        <SocialIcon href="https://www.facebook.com/people/PetAmour/61578009273870/?ref=1">
                                            <Facebook className="w-5 h-5" />
                                        </SocialIcon>
                                        <SocialIcon href="https://www.instagram.com/petamour_rbv/">
                                            <Instagram className="w-5 h-5" />
                                        </SocialIcon>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <div className="text-center md:text-left">
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

                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold mb-6">Links</h4>
                            <ul className="space-y-4 text-sm list-none p-0">
                                <FooterLink href="/#about">About Us</FooterLink>
                                <FooterLink href="/#terms">Terms & Conditions</FooterLink>
                                <FooterLink href="/#privacy">Privacy Policy</FooterLink>
                            </ul>
                        </div>

                        <div className="text-center md:text-left">
                            <h4 className="text-xl font-bold mb-6">Contact</h4>
                            <ContactItem
                                icon={<MapPin />}
                                label="Address"
                                value="63 Meadowridge St,  Kitchener, ON, N2P 0E2 Canada"
                                href="https://maps.app.goo.gl/YbMnJrMUGU1xf9x18"
                                target="_blank"
                            />
                            <ContactItem icon={<Phone />} label="Phone" value="+855 12266221" href="tel:+85512266221" />
                            <ContactItem icon={<Mail />} label="Email" value="vetcare@rbiomeds.com" href="mailto:vetcare@rbiomeds.com" />
                        </div>
                    </div>
                </div>

                <div className="text-center mt-6 space-y-2">
                    <p className="text-white text-sm">
                        © {new Date().getFullYear()} RBV. All Rights Reserved.
                    </p>
                    <p className="text-white text-xs tracking-wider uppercase font-medium">
                        Powered by RBV Canada
                    </p>
                </div>
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
        <div className="mb-4 text-center md:text-left">
            <button
                onClick={onToggle}
                className="w-full flex justify-center md:justify-between items-center font-medium gap-2"
            >
                {title}
                <span className="text-lg">{isOpen ? "−" : "+"}</span>
            </button>

            {isOpen && (
                <ul className="mt-3 space-y-2 md:pl-2 list-none p-0">
                    {items.map((item, i) => (
                        <li key={i}>
                            <Link href={item.href} className="text-sm text-gray-600 hover:text-black transition-colors">
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
            className="group h-10 w-10 flex items-center justify-center rounded-full border border-gray-100 bg-gray-50 text-[#9444A1] hover:bg-[#9444A1] hover:text-white hover:border-[#9444A1] transition-all duration-300"
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
    href,
    target,
}: {
    icon: React.ReactNode;
    label: string;
    value: string;
    href?: string;
    target?: string;
}) {
    return (
        <div className="flex flex-col items-center md:flex-row md:items-start gap-4 mb-6 md:mb-4">
            <div className="h-10 w-10 flex items-center justify-center bg-[#9444A1]/5 rounded-full text-[#9444A1]">
                {icon}
            </div>
            <div className="text-center md:text-left">
                <p className="text-xs text-gray-500 uppercase tracking-wider mb-1">{label}</p>
                {href ? (
                    <a
                        href={href}
                        target={target}
                        rel={target === "_blank" ? "noopener noreferrer" : undefined}
                        className="text-sm font-semibold hover:text-[#9444A1] transition-colors hover:underline"
                    >
                        {value}
                    </a>
                ) : (
                    <p className="text-sm font-semibold">{value}</p>
                )}
            </div>
        </div>
    );
}
