'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function FormSection() {
    return (
        <section className="w-full bg-gray-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="flex gap-6 md:gap-8">

                    {/* FORM */}
                    <div className="w-3/5 bg-[#953490] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                            Global Bulk Order Inquiry
                        </h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Full Name

                                </label>
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Country Name

                                </label>
                                <input
                                    type="text"
                                    placeholder="Country Name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Company / Business Name

                                </label>
                                <input
                                    type="text"
                                    placeholder="Company / Business Name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">

                                    Business Email

                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">

                                    Phone / WhatsApp Number
                                </label>
                                <input
                                    type="number"
                                    placeholder="0123456789"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-white text-[#9444A1] font-bold py-3 rounded-lg text-base sm:text-lg flex items-center justify-center gap-2 active:scale-95 transition"
                            >
                                Send Message
                                <Send size={18} />
                            </button>
                        </form>
                    </div>
                    <div className='w-2/5 bg-black'>
                        <img src="/1.jpg" alt="hdushfh" />
                    </div>


                </div>
            </div>
        </section>
    );
}
