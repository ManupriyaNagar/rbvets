'use client';

import React, { useState } from 'react';
import { Send, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';

export default function FormSection() {
    const [result, setResult] = useState("");
    const [isSubmitting, setIsSubmitting] = useState(false);

    const onSubmit = async (event) => {
        event.preventDefault();
        setIsSubmitting(true);
        setResult("");

        try {
            const formData = new FormData(event.target);
            formData.append("access_key", "dadb38a5-7e64-425f-8def-7bf97e069b89");

            const response = await fetch("https://api.web3forms.com/submit", {
                method: "POST",
                body: formData
            });

            const data = await response.json();
            if (data.success) {
                setResult("success");
                event.target.reset();
            } else {
                setResult("error");
            }
        } catch (error) {
            setResult("error");
        } finally {
            setIsSubmitting(false);
        }
    };

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
                            Distribution Inquiries from global bulk order inquiry
                        </h3>

                        <form onSubmit={onSubmit} className="space-y-4">

                            {/* INPUTS */}
                            {[
                                { name: "name", label: "Full Name", placeholder: "Your full name", type: "text" },
                                { name: "country", label: "Country Name", placeholder: "Country Name", type: "text" },
                                { name: "company", label: "Company / Business Name", placeholder: "Company / Business Name", type: "text" },
                                { name: "email", label: "Business Email", placeholder: "you@example.com", type: "email" },
                                { name: "phone", label: "Phone / WhatsApp Number", placeholder: "0123456789", type: "tel" },
                            ].map((field, i) => (
                                <div key={i}>
                                    <label className="block text-xs sm:text-sm font-medium text-white mb-1">
                                        {field.label}
                                    </label>
                                    <input
                                        type={field.type}
                                        name={field.name}
                                        placeholder={field.placeholder}
                                        required
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

                            {/* TEXTAREA */}
                            <div>
                                <label className="block text-xs sm:text-sm font-medium text-white mb-1">
                                    Message
                                </label>
                                <textarea
                                    name="message"
                                    placeholder="Your message or bulk inquiry details..."
                                    required
                                    rows={4}
                                    className="
                                        w-full px-3 sm:px-4 py-2.5 sm:py-3
                                        rounded-lg
                                        bg-gray-50 text-black
                                        placeholder:text-gray-500
                                        border border-gray-200
                                        focus:border-[#9444A1]
                                        focus:ring-1 focus:ring-[#9444A1]
                                        outline-none transition
                                        resize-none
                                    "
                                />
                            </div>

                            {/* ALERTS */}
                            <AnimatePresence mode="wait">
                                {result === "success" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-green-500/10 border border-green-500/20 text-white rounded-lg flex items-center gap-3 text-sm font-medium"
                                    >
                                        <CheckCircle2 className="text-green-400 shrink-0" size={20} />
                                        <span>Thank you! Your inquiry has been submitted successfully. We'll be in touch soon.</span>
                                    </motion.div>
                                )}

                                {result === "error" && (
                                    <motion.div
                                        initial={{ opacity: 0, height: 0 }}
                                        animate={{ opacity: 1, height: "auto" }}
                                        exit={{ opacity: 0, height: 0 }}
                                        className="p-4 bg-red-500/10 border border-red-500/20 text-white rounded-lg flex items-center gap-3 text-sm font-medium"
                                    >
                                        <AlertCircle className="text-red-400 shrink-0" size={20} />
                                        <span>Oops! Something went wrong. Please check your connection and try again.</span>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            {/* BUTTON */}
                            <button
                                type="submit"
                                disabled={isSubmitting}
                                className="
                                    w-full
                                    bg-white text-[#9444A1]
                                    disabled:opacity-80 disabled:cursor-not-allowed
                                    font-bold
                                    py-2.5 sm:py-3
                                    rounded-lg
                                    text-sm sm:text-base
                                    flex items-center justify-center gap-2
                                    active:scale-95 transition
                                    cursor-pointer
                                "
                            >
                                {isSubmitting ? (
                                    <>
                                        Sending...
                                        <Loader2 className="animate-spin" size={16} />
                                    </>
                                ) : (
                                    <>
                                        Send Message
                                        <Send size={16} />
                                    </>
                                )}
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