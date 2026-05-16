'use client';

import { useState } from "react";
import CategorySection from "./CategorySection";
import DealsSection from "./DealsSection";
import { categoryProducts } from "@/data/categoryProducts";

export default function CategoryDealsWrapper() {
    // Default deals from the categoryProducts data (e.g., from the first category)
    const allCategories = Object.keys(categoryProducts);
    const initialCategory = allCategories[0];
    const [activeCategory, setActiveCategory] = useState(initialCategory);

    const transformProductsToDeals = (products) => {
        return products.map((product, index) => ({
            id: index + 1,
            image: product.image,
            hoverimg: product.hoverimg,
            mainimage: product.mainimage || product.image,
            hovermainimg: product.hovermainimg || product.hoverimg,
            title: product.title,
            tagline: product.tagline,
            link: `/product?service=${encodeURIComponent(product.title)}`
        }));
    };

    const currentDeals = categoryProducts[activeCategory] 
        ? transformProductsToDeals(categoryProducts[activeCategory].products)
        : [];

    return (
        <>
            <CategorySection 
                onCategoryHover={(slug) => setActiveCategory(slug)} 
                activeSlug={activeCategory}
            />
            <DealsSection deals={currentDeals} />
        </>
    );
}
