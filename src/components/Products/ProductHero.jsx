"use client";

import { useState, useEffect } from "react";
import Image from "next/image";
import { useSearchParams } from "next/navigation";

const services = [
  {
    title: "Create Breeding",
    image: "/RBVWEbsite/1/FOP.jpg",
    hoverimg: "/RBVWEbsite/1/BOP.jpg",
    image1: "/RBVWEbsite/1/Features.jpg",
    hoverimg1: "/RBVWEbsite/1/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
  {
    title: "Medical Treatments",
    image: "/RBVWEbsite/2/FOP.jpg",
    hoverimg: "/RBVWEbsite/2/BOP.jpg",
    image1: "/RBVWEbsite/2/feature.jpg",
    hoverimg1: "/RBVWEbsite/2/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
  {
    title: "General Grooming",
    image: "/RBVWEbsite/3/FOP.jpg",
    hoverimg: "/RBVWEbsite/3/BOP.jpg",
    image1: "/RBVWEbsite/3/feature.jpg",
    hoverimg1: "/RBVWEbsite/3/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
  {
    title: "Diets & Nutrition",
    image: "/RBVWEbsite/4/FOP.jpg",
    hoverimg: "/RBVWEbsite/4/BOP.jpg",
    image1: "/RBVWEbsite/4/features.jpg",
    hoverimg1: "/RBVWEbsite/4/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
  {
    title: "Nails Treatment",
    image: "/RBVWEbsite/5/FOP.jpg",
    hoverimg: "/RBVWEbsite/5/BOP.jpg",
    image1: "/RBVWEbsite/5/feature.jpg",
    hoverimg1: "/RBVWEbsite/5/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
  {
    title: "Ear Cleaning",
    image: "/RBVWEbsite/6/FOP.jpg",
    hoverimg: "/RBVWEbsite/6/BOP.jpg",
    image1: "/RBVWEbsite/6/features.jpg",
    hoverimg1: "/RBVWEbsite/6/vs.jpg",
    description: "COMPOSITION : Each 10 ml Contains: Vitamin A 45000 IU, Vitamin D3 8000 IU, Calcium 1628 mg, Phosphorus 838.5 mg, Vitamin B12 5mg, Manganese 100 mg.",
    description1: "INDICATION : Joint health, bone development, and recovery.",
    description2: "USE: Supports bone and joint function, prevents deficiency in calcium and vitamin D.",
  },
];

export default function ProductHero() {
  const [active, setActive] = useState(services[0]);
  const searchParams = useSearchParams();

  useEffect(() => {
    const serviceName = searchParams.get("service");
    if (serviceName) {
      const selectedService = services.find(
        (s) => s.title.toLowerCase() === serviceName.toLowerCase()
      );
      if (selectedService) {
        setActive(selectedService);
      }
    }
  }, [searchParams]);

  return (
    <section className="w-full bg-white py-16">
      <div className="container mx-auto ">

        {/* TOP HEADING */}


        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 items-center">

          {/* LEFT CONTENT */}
          <div>
            <h2 className="text-3xl font-semibold text-gray-900 relative inline-block">
              Our Products
              <span className="absolute left-0 -bottom-2 w-12 h-[3px] bg-[#9444A1] rounded-full"></span>
            </h2>

            <div className="mt-10 space-y-6">
              {services.map((service) => (
                <button
                  key={service.title}
                  onClick={() => setActive(service)}
                  className={`w-full text-left px-8 py-4 rounded-full border transition-all duration-300 font-medium text-lg
                    ${active.title === service.title
                      ? "bg-[#9444A1] text-white border-[#9444A1] shadow-md"
                      : "bg-white text-gray-500 border-gray-300 hover:border-[#9444A1] hover:text-[#9444A1]"
                    }`}
                >
                  {service.title}
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE CONTENT */}
          <div className="flex flex-col gap-6 h-[650px]">
            {/* TOP IMAGE */}
            <div className="relative w-full h-[450px] flex-[1] rounded-2xl overflow-hidden">
              <Image
                src={active.image}
                alt={active.title}
                fill
                className="object-cover opacity-100 hover:opacity-0"
              />
              <Image
                src={active.hoverimg}
                alt={active.title}
                fill
                className="object-cover opacity-0 hover:opacity-100"
              />
            </div>

            {/* BOTTOM TEXT */}
            <div className="relative w-full flex-col rounded-2xl bg-[#9444A1]/5 p-6 flex gap-2">
              {[active.description, active.description1, active.description2].map(
                (text, index) => {
                  if (!text) return null;
                  const colonIndex = text.indexOf(":");
                  const isUpperCaseLabel =
                    colonIndex !== -1 &&
                    text.substring(0, colonIndex).toUpperCase() ===
                    text.substring(0, colonIndex);

                  return (
                    <p key={index} className="text-gray-800">
                      {isUpperCaseLabel ? (
                        <>
                          <span className="text-lg font-bold text-black">
                            {text.substring(0, colonIndex + 1)}
                          </span>
                          <span className="text-base font-medium text-gray-700">
                            {text.substring(colonIndex + 1)}
                          </span>
                        </>
                      ) : (
                        <span className="text-base font-medium text-gray-700">
                          {text}
                        </span>
                      )}
                    </p>
                  );
                }
              )}
            </div>
          </div>

          {/* RIGHT IMAGE */}
          <div className="flex flex-col gap-6 h-[650px]">
            <div className="text-center mb-6">
              <h1 className="text-5xl font-semibold text-gray-900 ">
                {active.title}
              </h1>
            </div>
            <div className="relative w-full flex-1 rounded-2xl overflow-hidden">
              <Image
                src={active.image1}
                alt={active.title}
                fill
                className="object-cover opacity-100 hover:opacity-0"
                priority
              />
              <Image
                src={active.hoverimg1 || active.image1}
                alt={active.title}
                fill
                className="object-cover opacity-0 hover:opacity-100"
                priority
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
