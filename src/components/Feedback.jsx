"use client";
import React, { useState, useEffect, useRef } from 'react';
import { motion } from 'framer-motion';

const feedbacks =
    [
        {
            "id": 11,
            "name": "Dr. Khin Maung Win",
            "image": "/f.png",
            "text": "My Labrador usually refuses medicine, so giving tablets is always a challenge. With FluraMed it was different he took it easily, almost like a treat. Within a few days I noticed fewer ticks, and it’s convenient knowing the protection lasts much longer than monthly options."
        },
        {
            "id": 12,
            "name": "Dr. Meera Kulkarni",
            "image": "/f.png",
            "text": "In clinical practice we look for solutions that pet owners can use easily at home. FiproMed Duo is practical because the spot-on format is quick to apply and helps maintain consistent flea and tick protection for dogs and cats."
        },
        {
            "id": 13,
            "name": "Nguyen Thi Lan",
            "image": "/f.png",
            "text": "My cat is very sensitive to medicines, so I was worried about giving treatments. ImoxiMed was simple to apply and caused no stress for my pet. After a few days, the scratching reduced and my cat seemed much more comfortable."
        },
        {
            "id": 14,
            "name": "Maung Sein Win",
            "image": "/f.png",
            "text": "I use No-Tick Spray before taking my dog outside, especially in grassy areas. The spray is quick to apply and helps keep ticks away during walks. It’s become a simple part of our routine."
        },
        {
            "id": 15,
            "name": "Dr. Anjali Verma",
            "image": "/f.png",
            "text": "Entrovet Sachets are convenient for pet owners because they are simple to administer and helpful for supporting digestive health during mild stomach disturbances."
        },
        {
            "id": 16,
            "name": "Pham Duc Huy",
            "image": "/f.png",
            "text": "When my dog had diarrhea, hydration was my biggest concern. RehydraPet Sachets were easy to mix in water and helped keep him hydrated during recovery."
        },
        {
            "id": 17,
            "name": "Kyaw Win",
            "image": "/f.png",
            "text": "My older dog had started moving a bit slowly, especially during walks. After using Bone & Joint Syrup regularly, he seems more comfortable and active again."
        },
        {
            "id": 18,
            "name": "Aung Kyaw Moe",
            "image": "/f.png",
            "text": "After a few weeks of using Skin & Coat Syrup, my dog’s coat looks healthier and shinier. It also seems to help with dryness."
        },
        {
            "id": 19,
            "name": "Dr. Rakesh Gupta",
            "image": "/f.png",
            "text": "Liver Med is a practical option for supporting liver function in pets that require additional care. Pet owners find it convenient to use, and it fits well into routine veterinary treatment plans."
        }
    ];



const Feedback = () => {
    const [activeIndex, setActiveIndex] = useState(0);
    const [cardWidth, setCardWidth] = useState(400);
    const gap = 24;

    useEffect(() => {
        const handleResize = () => {
            if (window.innerWidth < 640) {
                setCardWidth(280);
            } else if (window.innerWidth < 768) {
                setCardWidth(320);
            } else {
                setCardWidth(400);
            }
        };

        handleResize();
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

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

                    <h1 className='text-3xl md:text-5xl font-bold text-[#953490] mt-6'>Feedbacks</h1>
                    <div className="absolute left-1/2 -translate-x-1/2 w-12 h-1 bg-[#d7a463]"></div>
                </div>

                <div className='relative flex justify-center items-center h-[600px] md:h-[500px]'>
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
                                className={`w-[280px] sm:w-[320px] md:w-[400px] shrink-0 p-6 md:p-10 rounded-xl flex flex-col items-center text-center transition-colors duration-500 shadow-lg cursor-pointer ${activeIndex === index
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
                                <p className={`text-base md:text-lg leading-relaxed mb-10 min-h-[160px] md:min-h-[120px] ${activeIndex === index ? 'text-[#4A1952]' : 'text-[#953490]/60'}`}>
                                    "{item.text}"
                                </p>
                                <div className="text-[#d7a463] font-semibold flex items-center gap-2 mt-auto">
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
                    <img src="/feedback-img.png" alt="" className='w-full md:w-[70%] max-w-[800px] h-auto md:h-80 object-contain' />
                </div>
            </div>
        </div>
    );
};

export default Feedback;