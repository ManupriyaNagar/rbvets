"use client";

import { useState, useEffect } from "react";
import Image from "next/image";

export default function CategoryHero({ categoryTitle, products }) {
  const [active, setActive] = useState(products[0]);
  const [imgToggle, setImgToggle] = useState(false);

  useEffect(() => {
    if (products && products.length > 0) {
        setActive(products[0]);
    }
  }, [products]);

  if (!products || products.length === 0) return null;

  return (
    <section className="bg-white py-16 px-4">
      <div className="container mx-auto ">

        {/* TOP HEADING */}
        <div className="flex flex-col lg:flex-row gap-6 items-center">

          {/* LEFT CONTENT */}
          <div className="md:max-w-[300px] w-full">
            <h2 className="text-3xl font-semibold text-gray-900 relative inline-block">
              {categoryTitle}
              <span className="absolute left-0 -bottom-2 w-12 h-[3px] bg-[#9444A1] rounded-full"></span>
            </h2>
            
            {/* MOBILE TABS */}
            <div className="md:hidden mt-6 flex gap-3 overflow-x-auto pb-4 no-scrollbar -mx-4 px-4">
              {products.map((product) => (
                <button
                  key={product.title}
                  onClick={() => {
                    setActive(product);
                    setImgToggle(false);
                  }}
                  className={`whitespace-nowrap px-6 py-2.5 rounded-full border transition-all text-sm font-medium
                    ${active.title === product.title
                      ? "bg-[#9444A1] text-white border-[#9444A1] shadow-sm"
                      : "bg-white text-gray-600 border-gray-300"
                    }`}
                >
                  {product.title}
                </button>
              ))}
            </div>

            <div className="hidden sm:block mt-10 space-y-4 w-full">
              {products.map((product) => (
                <button
                  key={product.title}
                  onClick={() => setActive(product)}
                  className={`w-full text-left px-6 py-3.5 rounded-full border transition-all duration-300 font-medium text-lg
                    ${active.title === product.title
                      ? "bg-[#9444A1] text-white border-[#9444A1] shadow-md"
                      : "bg-white text-gray-500 border-gray-300 hover:border-[#9444A1] hover:text-[#9444A1]"
                    }`}
                >
                  {product.title}
                </button>
              ))}
            </div>
          </div>

          {/* MIDDLE CONTENT */}
          <div className="md:max-w-[500px] w-full flex flex-col gap-6 md:h-[650px] h-auto">
            {/* PRODUCT TITLE (MOBILE ONLY) */}
            <div className="md:hidden text-center">
              <h1 className="text-3xl font-bold text-gray-900">
                {active.title}
              </h1>
            </div>

            {/* TOP IMAGE */}
            <div className="relative w-full h-[300px] flex-[1] rounded-2xl overflow-hidden shadow-sm bg-gray-50"
              onClick={() => setImgToggle(!imgToggle)}>
              <Image
                src={active.image}
                alt={active.title}
                fill
                className={`object-contain transition-opacity duration-300
                  ${imgToggle ? "opacity-0" : "opacity-100"}
                  md:opacity-100 md:hover:opacity-0`}
              />
              <Image
                src={active.hoverimg}
                alt={active.title}
                fill
                className={`object-contain transition-opacity duration-300
                  ${imgToggle ? "opacity-100" : "opacity-0"}
                  md:opacity-0 md:hover:opacity-100`}
              />
            </div>

            {/* BOTTOM TEXT */}
            <div className="relative w-full flex-col rounded-2xl bg-[#9444A1]/5 p-6 flex gap-3 shadow-sm min-h-[200px]">
              {[active.description, active.description1, active.description2].map(
                (text, index) => {
                  if (!text) return null;
                  const colonIndex = text.indexOf(":");
                  const isUpperCaseLabel =
                    colonIndex !== -1 &&
                    text.substring(0, colonIndex).toUpperCase() ===
                    text.substring(0, colonIndex);

                  return (
                    <p key={index} className="text-gray-800 leading-relaxed">
                      {isUpperCaseLabel ? (
                        <>
                          <span className="text-base font-bold text-black block mb-0.5">
                            {text.substring(0, colonIndex + 1)}
                          </span>
                          <span className="text-sm font-medium text-gray-700">
                            {text.substring(colonIndex + 1)}
                          </span>
                        </>
                      ) : (
                        <span className="text-sm font-medium text-gray-700">
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
          <div className="w-full flex flex-col gap-6 md:p-0 p-4">
            <div className="hidden md:block text-center">
              <h1 className="text-2xl md:text-4xl font-semibold text-gray-900">
                {active.title}
              </h1>
            </div>

            <div
              className="relative w-full h-[420px] md:h-[620px] rounded-2xl overflow-hidden cursor-pointer shadow-md bg-gray-50"
              onClick={() => setImgToggle(!imgToggle)}
            >
              {/* BASE IMAGE */}
              <Image
                src={active.image1}
                alt={active.title}
                fill
                className={`md:object-contain transition-opacity duration-300
        ${imgToggle ? "opacity-0" : "opacity-100"}
        md:opacity-100 md:hover:opacity-0`}
                priority
              />

              {/* HOVER / TAP IMAGE */}
              <Image
                src={active.hoverimg1 || active.image1}
                alt={active.title}
                fill
                className={`object-contain transition-opacity duration-300
        ${imgToggle ? "opacity-100" : "opacity-0"}
        md:opacity-0 md:hover:opacity-100`}
                priority
              />
            </div>

            <p className="text-xs text-gray-400 md:hidden text-center">
              Tap image to view more
            </p>
          </div>

        </div>
      </div>
    </section>
  );
}
