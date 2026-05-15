import { categoryProducts } from "@/data/categoryProducts";
import CategoryHero from "@/components/CategoryHero";
import { notFound } from "next/navigation";

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
    const { slug } = await params;
    const categoryData = (categoryProducts as any)[slug];

    if (!categoryData) {
        return notFound();
    }

    return (
        <main className="min-h-screen">
            <CategoryHero 
                categoryTitle={categoryData.title} 
                products={categoryData.products} 
            />
        </main>
    );
}

export async function generateStaticParams() {
    return Object.keys(categoryProducts).map((slug) => ({
        slug: slug,
    }));
}
