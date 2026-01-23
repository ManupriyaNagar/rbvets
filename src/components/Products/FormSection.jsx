'use client';

import React from 'react';
import { Send } from 'lucide-react';

export default function FormSection() {
    return (
        <section className="w-full bg-gray-50 py-12 md:py-16">
            <div className="max-w-7xl mx-auto px-4 md:px-6">
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 md:gap-8">

                    {/* FORM */}
                    <div className="w-full bg-[#953490] p-6 sm:p-8 rounded-2xl shadow-sm border border-gray-100 lg:col-span-1">
                        <h3 className="text-xl sm:text-2xl font-bold text-white mb-6">
                            Send us a message
                        </h3>

                        <form className="space-y-4">
                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Name
                                </label>
                                <input
                                    type="text"
                                    placeholder="Your full name"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Email
                                </label>
                                <input
                                    type="email"
                                    placeholder="you@example.com"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none transition"
                                />
                            </div>

                            <div>
                                <label className="block text-sm font-medium text-white mb-1">
                                    Message
                                </label>
                                <textarea
                                    rows={4}
                                    placeholder="How can we help you?"
                                    className="w-full px-4 py-3 rounded-lg bg-gray-50 text-black placeholder:text-gray-500 border border-gray-200 focus:border-[#9444A1] focus:ring-1 focus:ring-[#9444A1] outline-none resize-none transition"
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

                    {/* INFO BLOCK */}
                    <div className="lg:col-span-2 w-full bg-[#9444A1]/5 p-6 sm:p-8 rounded-2xl border border-[#9444A1]/10 flex flex-col justify-center">
                        <h3 className="text-xl sm:text-2xl font-bold text-gray-900 mb-3">
                            Customer Support
                        </h3>
                        <p className="text-gray-600 text-sm sm:text-base leading-relaxed max-w-2xl">
                            Have specific questions about our products or need assistance with your order?
                            Our support team is here to help you every step of the way.
                        </p>
                    </div>

                </div>
            </div>
        </section>
    );
}
