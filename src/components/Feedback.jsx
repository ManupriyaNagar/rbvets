"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const feedbacks = [
    {
        id: 1,
        name: "Sopheaktra Nou",
        image: "/f.png",
        text: "FiproMed Duo is convenient and effective. The spot-on application is simple, and it helps maintain consistent flea and tick control without stressing my pets."
    },
    {
        id: 2,
        name: "Rithy Chea",
        image: "/f.png",
        text: "FluraMed offers long-lasting protection with just one dose. It has made parasite prevention easier and more reliable for my dog throughout the month."
    },
    {
        id: 3,
        name: "Dr. Sovannara Heng",
        image: "/f.png",
        text: "RB Vetcare products are well-formulated and trustworthy. They deliver consistent results, making them suitable for routine parasite prevention in clinical practice."
    },
    {
        id: 4,
        name: "Dara Keo",
        image: "/f.png",
        text: "ImoxiMed is ideal for cats that dislike oral medicines. It is easy to apply and provides reliable protection against common parasites."
    },
    {
        id: 5,
        name: "Pisey Chhun",
        image: "/f.png",
        text: "Using FluraMed has reduced the stress of frequent parasite treatments. One dose lasts weeks and keeps my dog comfortable and protected."
    },
    {
        id: 6,
        name: "Borey Sok",
        image: "/f.png",
        text: "FiproMed Duo has been dependable for monthly parasite control. Even after bathing, it continues to protect my pets from fleas and ticks."
    },
    {
        id: 7,
        name: "Malis Touch",
        image: "/f.png",
        text: "ImoxiMed worked effectively for my cat. The spot-on application was simple, and scratching reduced noticeably within a few days of use."
    },
    {
        id: 8,
        name: "Vannak Lim",
        image: "/f.png",
        text: "My dog usually avoids treatments, but FluraMed was easy to give. I noticed fewer ticks quickly, and the protection lasts much longer."
    },
    {
        id: 9,
        name: "Dr. Sreyneang Phan",
        image: "/f.png",
        text: "I regularly recommend FiproMed Duo because it is easy to apply, reliable, and provides consistent flea and tick protection for dogs and cats."
    },
    {
        id: 10,
        name: "Sokha Chan",
        image: "/f.png",
        text: "FluraMed has simplified parasite control for my dog. One chew provides long-lasting protection, saves time, and gives me complete peace of mind every month."
    }
];



const Feedback = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const cardWidth = 400;
    const gap = 24;

    useEffect(() => {
        const interval = setInterval(() => {
            setActiveIndex((prev) => (prev + 1) % feedbacks.length);
        }, 5000);
        return () => clearInterval(interval);
    }, []);

    return (
        <div className='bg-[#f3e8f4] py-20 overflow-hidden'>
            <div className='container mx-auto px-4'>
                <div className='mb-16 text-center relative'>

                    <h1 className='text-5xl font-bold text-[#953490] mt-6'>Feedbacks</h1>
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1 bg-[#d7a463]"></div>
                </div>

                <div className='relative flex justify-center items-center h-[500px]'>
                    <motion.div
                        className="flex gap-6 absolute left-1/2"
                        initial={false}
                        animate={{
                            x: -(activeIndex * (cardWidth + gap)) - (cardWidth / 2),
                        }}
                        transition={{
                            type: "spring",
                            stiffness: 100,
                            damping: 50,
                            mass: 0.8
                        }}
                    >
                        {feedbacks.map((item, index) => (
                            <div
                                key={item.id}
                                onClick={() => setActiveIndex(index)}
                                className={`w-[320px] md:w-[400px] shrink-0 p-10 rounded-xl flex flex-col items-center text-center transition-colors duration-500 shadow-lg cursor-pointer ${activeIndex === index
                                    ? 'bg-white shadow-2xl'
                                    : 'bg-[#953490]/10 text-[#953490]/70'
                                    }`}
                            >
                                <div className="text-4xl text-[#d7a463] mb-4">
                                    <svg width="40" height="30" viewBox="0 0 40 30" fill="currentColor">
                                        <path d="M11.4 0C5.1 0 0 5.1 0 11.4v18.6h14.3V11.4H5.7C5.7 8.3 8.3 5.7 11.4 5.7V0zm24.3 0c-6.3 0-11.4 5.1-11.4 11.4v18.6H38.6V11.4H30c0-3.1 2.6-5.7 5.7-5.7V0z" />
                                    </svg>
                                </div>
                                <img
                                    src={item.image}
                                    alt={item.name}
                                    className='w-20 h-20 rounded-full border-4 border-white shadow-md mb-6 object-cover'
                                />
                                <p className={`text-lg leading-relaxed mb-10 min-h-[120px] ${activeIndex === index ? 'text-[#4A1952]' : 'text-[#953490]/60'}`}>
                                    "{item.text}"
                                </p>
                                <div className="text-[#d7a463] font-semibold flex items-center gap-2">
                                    <span className="w-6 h-[2px] bg-[#d7a463]"></span>
                                    {item.name}
                                </div>
                            </div>
                        ))}
                    </motion.div>
                </div>

                <div className='flex justify-center gap-3 mt-12'>
                    {feedbacks.map((_, index) => (
                        <button
                            key={index}
                            onClick={() => setActiveIndex(index)}
                            className={`w-3 h-3 rounded-full transition-all duration-500 ${activeIndex === index
                                ? 'bg-[#d7a463] ring-4 ring-[#d7a463]/20'
                                : 'bg-white'
                                }`}
                        />
                    ))}
                </div>
                <div className='flex justify-center mt-12 -mb-20'>
                    <img src="/feedback-img.png" alt="" className='md:w-70% md:h-80' />
                </div>
            </div>
        </div>
    );
};

export default Feedback;
