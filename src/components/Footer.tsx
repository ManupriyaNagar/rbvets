import { Facebook, Linkedin, Instagram, Twitter, MapPin, Phone, Mail, ArrowRight } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

export default function Footer() {
    return (
        <footer className="relative bg-[#9444A1] pt-12 pb-8 overflow-hidden">
            {/* Background Pulse/Heartbeat Effect Placeholder */}
            <div className="absolute top-0 left-0 w-full h-64 opacity-20 pointer-events-none">
                <svg viewBox="0 0 1000 100" className="w-full h-full stroke-white/20 fill-none" preserveAspectRatio="none">
                    <path d="M0 50 L100 50 L120 20 L140 80 L160 50 L300 50 L320 10 L340 90 L360 50 L600 50 L620 30 L640 70 L660 50 L1000 50" strokeWidth="1" />
                </svg>
            </div>

            <div className="container mx-auto px-4 relative z-10">
                {/* Newsletter Section */}
                <div className="max-w-4xl mx-auto mb-4">
                    <div className="flex flex-col md:flex-row items-center  gap-8 text-center">

                        <div>
                            <h2 className="text-4xl md:text-5xl font-bold mb-4">Ready To Turn Dreams Into Reality</h2>
                            <h3 className="text-3xl md:text-5xl font-bold">Subscribe to Our Newsletter</h3>

                        </div>

                    </div>

                    <div className="mt-8 relative max-w-2xl">
                        <div className="flex items-center bg-[#953490]/20 border border-white/10 rounded-full p-2 pl-6 backdrop-blur-sm">
                            <input
                                type="email"
                                placeholder="Enter your email"
                                className="bg-transparent border-none flex-grow text-white focus:outline-none placeholder:text-white/40"
                            />
                            <button className="bg-[#d7a463] text-white font-bold py-3 px-8 rounded-full flex items-center gap-2 hover:bg-[#c69352] transition-all whitespace-nowrap">
                                Subscribe Now <ArrowRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Footer Main Content */}
                <div className="bg-white text-black rounded-[40px] p-10 md:p-10 border border-white/5 shadow-2xl">
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12">
                        {/* Column 1: Logo & Info */}
                        <div>
                            <div className="flex items-center gap-2 ">
                                <div className="relative h-32 w-62 overflow-hidden">
                                    <Image
                                        src="/logo.png"
                                        alt="Logo"
                                        fill
                                        className="object-contain"
                                    />
                                </div>
                            </div>
                            <p className=" mb-8 leading-relaxed">
                                Medical services are an essential part of our lives, offering care and treatment for various health conditions
                            </p>
                            <div className="flex gap-4">
                                <SocialIcon icon={<Facebook className="w-4 h-4" />} />
                                <SocialIcon icon={<Linkedin className="w-4 h-4" />} />
                                <SocialIcon icon={<Instagram className="w-4 h-4" />} />
                                <SocialIcon icon={<Twitter className="w-4 h-4" />} />
                            </div>
                        </div>

                        {/* Column 2: Page */}
                        <div>
                            <h4 className="text-xl font-bold mb-8">Page</h4>
                            <ul className="space-y-4">
                                <FooterLink href="/about">About Us</FooterLink>
                                <FooterLink href="/services">Services</FooterLink>
                                <FooterLink href="/why-choose-us">Why Chose Us</FooterLink>
                                <FooterLink href="/doctors">Doctors</FooterLink>
                                <FooterLink href="/blog">Blog And News</FooterLink>
                            </ul>
                        </div>

                        {/* Column 3: Link */}
                        <div>
                            <h4 className="text-xl font-bold mb-8">Link</h4>
                            <ul className="space-y-4">
                                <FooterLink href="/terms">Trems & Condition</FooterLink>
                                <FooterLink href="/privacy">Privacy Policy</FooterLink>
                                <FooterLink href="/contact">Contact Us</FooterLink>
                                <FooterLink href="/terms-of-use">Treams Of Use</FooterLink>
                            </ul>
                        </div>

                        {/* Column 4: Contact */}
                        <div>
                            <h4 className="text-xl font-bold mb-8">Contact</h4>
                            <div className="space-y-6">
                                <ContactItem
                                    icon={<MapPin className="w-5 h-5" />}
                                    label="Address"
                                    value="abc ghaziabad,India"
                                />
                                <ContactItem
                                    icon={<Phone className="w-5 h-5" />}
                                    label="Phone Number"
                                    value="012 345 678 9101"
                                />
                                <ContactItem
                                    icon={<Mail className="w-5 h-5" />}
                                    label="Email"
                                    value="abcd@gmail.com"
                                />
                            </div>
                        </div>
                    </div>
                </div>

                {/* Footer Bottom */}
                <div className="mt-8 text-center  text-sm">
                    <p>© {new Date().getFullYear()} RBV | All Rights Reserved</p>
                </div>
            </div>
        </footer>
    );
}

function SocialIcon({ icon }: { icon: React.ReactNode }) {
    return (
        <Link href="#" className="h-10 w-10 rounded-full border border-white/10 flex items-center justify-center hover:bg-[#d7a463] hover:text-black transition-all">
            {icon}
        </Link>
    );
}

function FooterLink({ href, children }: { href: string, children: React.ReactNode }) {
    return (
        <li>
            <Link href={href} className=" hover:text-[#d7a463] transition-colors">{children}</Link>
        </li>
    );
}

function ContactItem({ icon, label, value }: { icon: React.ReactNode, label: string, value: string }) {
    return (
        <div className="flex items-start gap-4">
            <div className="h-12 w-12 shrink-0 rounded-full border border-white/10 flex items-center justify-center bg-[#953490]/10">
                {icon}
            </div>
            <div>
                <p className="text-xs mb-1">{label}</p>
                <p className="text-sm font-medium">{value}</p>
            </div>
        </div>
    );
}
