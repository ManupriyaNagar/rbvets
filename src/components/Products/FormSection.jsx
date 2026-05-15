'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function FormSection() {
    return (
        <section className="w-full bg-gray-50 py-10 sm:py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">

                <div className="flex flex-col lg:flex-row gap-6 md:gap-8">

                    {/* FORM */}
                    <div className="
                        w-full lg:w-3/5
                        bg-[#953490]
                        p-5 sm:p-6 md:p-8
                        rounded-xl sm:rounded-2xl
                        shadow-sm
                        border border-gray-100
                    ">
                        <h3 className="text-lg sm:text-xl md:text-2xl font-bold text-white mb-4 sm:mb-6">
                            Distrbution Inquieries from global bulk order inquiry
                        </h3>

                        <form className="space-y-3 sm:space-y-4">

                            {/* INPUTS */}
                            {[
                                { label: "Full Name", placeholder: "Your full name", type: "text" },
                                { label: "Country Name", placeholder: "Country Name", type: "text" },
                                { label: "Company / Business Name", placeholder: "Company / Business Name", type: "text" },
                                { label: "Business Email", placeholder: "you@example.com", type: "email" },
                                { label: "Phone / WhatsApp Number", placeholder: "0123456789", type: "tel" },
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-xs sm:text-sm font-medium text-white mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        placeholder={field.placeholder}
                                        className="
                                            w-full px-3 sm:px-4 py-2.5 sm:py-3
                                            rounded-lg
                                            bg-gray-50 text-black
                                            placeholder:text-gray-500
                                            border border-gray-200
                                            focus:border-[#9444A1]
                                            focus:ring-1 focus:ring-[#9444A1]
                                            outline-none transition
                                        "
                                    />
                                </div>
                            ))}

                            {/* BUTTON */}
                            <button
                                type="submit"
                                className="
                                    w-full
                                    bg-white text-[#9444A1]
                                    font-bold
                                    py-2.5 sm:py-3
                                    rounded-lg
                                    text-sm sm:text-base
                                    flex items-center justify-center gap-2
                                    active:scale-95 transition
                                "
                            >
                                Send Message
                                <Send size={16} />
                            </button>
                        </form>
                    </div>

                    {/* IMAGE */}
                    <div className="
                        w-full lg:w-2/5
                        flex justify-center
                    ">
                        <img
                            src="/distributorship.png"
                            alt="distributorship"
                            className="
                                rounded-xl sm:rounded-2xl
                                w-full
                                max-h-[460px] md:max-h-[320px] lg:max-h-none
                                object-cover
                            "
                        />
                    </div>

                </div>
            </div>
        </section>
    );
}