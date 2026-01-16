import { Suspense } from "react";
import ProductHero from "@/components/Products/ProductHero";
import FormSection from "@/components/Products/FormSection";

export default function ProductPage() {
    return (
        <div>
            <Suspense fallback={<div>Loading...</div>}>
                <ProductHero />
            </Suspense>
            <FormSection />
        </div>
    );
}