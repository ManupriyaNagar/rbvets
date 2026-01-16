'use client';

import { useState } from 'react';
import Link from 'next/link';
import { ChevronDown } from 'lucide-react';

interface FooterProductDropdownProps {
    title: string;
    subtitle?: string;
    items: { label: string; href: string }[];
}

export default function FooterProductDropdown({ title, subtitle, items }: FooterProductDropdownProps) {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <li>
            <button
                onClick={() => setIsOpen(!isOpen)}
                className="w-full text-left flex items-start justify-between group hover:text-[#d7a463] transition-colors"
            >
                <span className="leading-snug">
                    {title}
                    {subtitle && (
                        <span className="block text-sm text-gray-500 group-hover:text-[#d7a463]/80 font-normal">
                            {subtitle}
                        </span>
                    )}
                </span>
                <ChevronDown
                    className={`w-5 h-5 mt-1 shrink-0 ml-2 transition-transform duration-300 ${isOpen ? 'rotate-180' : ''}`}
                />
            </button>

            <div
                className={`grid transition-all duration-300 ease-in-out ${isOpen ? 'grid-rows-[1fr] opacity-100 mt-2' : 'grid-rows-[0fr] opacity-0'
                    }`}
            >
                <div className="overflow-hidden">
                    <ul className="pl-4 space-y-2 border-l-2 border-gray-100 ml-1">
                        {items.map((item, index) => (
                            <li key={index}>
                                <Link
                                    href={item.href}
                                    className="block text-sm text-gray-500 hover:text-[#d7a463] transition-colors py-1"
                                >
                                    {item.label}
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            </div>
        </li>
    );
}
