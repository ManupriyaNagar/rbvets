import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

const getCatIcon = (cat) => {
  if (cat?.image) return { type: 'image', value: cat.image };
  if (cat?.icon) {
    const isUrl = cat.icon.startsWith('http') || cat.icon.startsWith('/') || cat.icon.startsWith('data:');
    return isUrl ? { type: 'image', value: cat.icon } : { type: 'emoji', value: cat.icon };
  }
  return { type: 'emoji', value: '🐾' };
};

export async function generateStaticParams() {
  try {
    const categories = await api.getCategories();
    return categories.map((cat) => ({ category: cat.slug }));
  } catch (err) {
    console.error("Failed to generate static params:", err);
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category } = await params;
  try {
    const cat = await api.getCategoryBySlug(category);
    return {
      title: `${cat.name} Owners | RBV Pet Blogs`,
      description: cat.description,
    };
  } catch (err) {
    return {};
  }
}

export default async function CategoryPage({ params }) {
  const { category } = await params;
  let cat = null;
  try {
    cat = await api.getCategoryBySlug(category);
  } catch (err) {
    console.error("Failed to fetch category:", err);
  }
  if (!cat) notFound();

  const totalArticles = cat.topics.reduce(
    (sum, t) => sum + t.articles.length,
    0
  );

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500">
          <Link href="/pet-blogs" className="hover:text-[#9444A1] transition-colors">
            Pet Owners Overview
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{cat.name} Owners</span>
        </div>
      </div>

      {/* Header */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 md:py-14 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <Link
              href="/pet-blogs"
              className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#9444A1] mb-4 hover:underline"
            >
              ← Pet Owners Overview
            </Link>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">
              {cat.name} Owners
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              {cat.description}
            </p>
            <div className="mt-4 flex gap-4 text-sm text-gray-500">
              <span className="bg-[#9444A1]/10 text-[#9444A1] font-semibold px-3 py-1 rounded-full">
                {cat.topics.length} Topics
              </span>
              <span className="bg-[#d7a463]/10 text-[#d7a463] font-semibold px-3 py-1 rounded-full">
                {totalArticles} Articles
              </span>
            </div>
          </div>
          <div className="flex-shrink-0 w-40 h-40 rounded-full bg-gradient-to-br from-[#9444A1]/10 to-[#d7a463]/10 flex items-center justify-center shadow-inner">
            {(() => {
              const iconInfo = getCatIcon(cat);
              return iconInfo.type === 'image' ? (
                <img
                  src={iconInfo.value}
                  alt={cat.name}
                  className="w-24 h-24 object-contain"
                />
              ) : (
                <span className="text-8xl">{iconInfo.value}</span>
              );
            })()}
          </div>
        </div>
      </section>

      {/* Topics List */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-xl font-bold text-gray-800">Topics in this Chapter</h2>
          <span className="text-sm text-gray-400">{cat.topics.length} topics</span>
        </div>

        <div className="space-y-4">
          {cat.topics.map((topic) => (
            <div
              key={topic.id}
              className="bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#9444A1]/30 transition-all duration-300"
            >
              <div className="p-6">
                <div className="flex flex-col sm:flex-row sm:items-start sm:justify-between gap-4">
                  <div className="flex-1">
                    <Link
                      href={`/pet-blogs/${cat.slug}/${topic.slug}`}
                      className="group flex items-center gap-2"
                    >
                      <span className="text-[#9444A1] font-bold text-lg">⊕</span>
                      <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#9444A1] transition-colors">
                        {topic.title}
                      </h3>
                    </Link>
                    {topic.description && (
                      <p className="mt-2 text-sm text-gray-500 ml-7">
                        {topic.description}
                      </p>
                    )}
                  </div>
                  <span className="text-xs text-gray-400 whitespace-nowrap mt-1">
                    {topic.articles.length} article{topic.articles.length !== 1 ? "s" : ""}
                  </span>
                </div>

                {/* Article quick links */}
                <div className="mt-4 ml-7 flex flex-wrap gap-2">
                  {topic.articles.map((article) => (
                    <Link
                      key={article.id}
                      href={`/pet-blogs/${cat.slug}/${topic.slug}/${article.slug}`}
                      className="text-xs text-[#9444A1] bg-[#9444A1]/5 hover:bg-[#9444A1]/15 px-3 py-1.5 rounded-full transition-colors font-medium"
                    >
                      {article.title}
                    </Link>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
