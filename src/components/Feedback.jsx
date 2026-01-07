"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const feedbacks = [
    {
        id: 1,
        name: "David Mark",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 2,
        name: "Jessica Kyle",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 3,
        name: "William Brown",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 4,
        name: "Sarah Jenkins",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 5,
        name: "Michael Scott",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 6,
        name: "David Mark",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 7,
        name: "Jessica Kyle",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 8,
        name: "William Brown",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 9,
        name: "Sarah Jenkins",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
    },
    {
        id: 10,
        name: "Michael Scott",
        image: "/img.png",
        text: "Boromirs destroy perils bilbo baggins regain seems wider by treebeard quietly faced hesitate fire breathing value fisherman thinks gollum's stove call shake therefore has taken."
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
                    <img src="/feedback-img.png" alt="" className='w-70% h-80' />
                </div>
            </div>
        </div>
    );
};

export default Feedback;
