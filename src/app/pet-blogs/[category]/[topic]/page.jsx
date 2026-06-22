import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const sitemap = await api.getBlogSitemap();
    return sitemap.flatMap((e) =>
      e.topics.map((t) => ({ category: e.category_slug, topic: t.topic_slug }))
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { category, topic } = await params;
  try {
    const cat = await api.getCategoryBySlug(category);
    const t   = cat?.topics?.find((t) => t.slug === topic);
    if (!t) return {};
    return { title: `${t.title} | RBV Pet Blogs`, description: t.description };
  } catch {
    return {};
  }
}

export default async function TopicPage({ params }) {
  const { category, topic } = await params;

  let cat = null;
  try { cat = await api.getCategoryBySlug(category); } catch {}
  if (!cat) notFound();

  const topicData = cat.topics.find((t) => t.slug === topic);
  if (!topicData) notFound();

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/pet-blogs" className="hover:text-[#9444A1] transition-colors">Pet Owners</Link>
          <span>›</span>
          <Link href={`/pet-blogs/${cat.slug}`} className="hover:text-[#9444A1] transition-colors">
            {cat.name} Owners
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{topicData.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar — sibling topics */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
            <div className="bg-gray-800 text-white px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest">Other Topics</span>
            </div>
            <nav className="p-3">
              {cat.topics.map((t) => (
                <Link
                  key={t.id}
                  href={`/pet-blogs/${cat.slug}/${t.slug}`}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    t.slug === topic
                      ? "bg-[#9444A1]/10 text-[#9444A1] font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#9444A1]"
                  }`}
                >
                  <span className="text-xs">→</span>
                  {t.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Main */}
        <main className="flex-1 min-w-0">
          <Link href={`/pet-blogs/${cat.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#9444A1] mb-6 hover:underline">
            ← {cat.name} Owners
          </Link>

          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8 mb-6">
            <div className="flex items-center gap-3 mb-2">
              {cat.icon && (cat.icon.startsWith('http') || cat.icon.startsWith('/') || cat.icon.startsWith('data:')) ? (
                <img src={cat.icon} alt={cat.name} className="w-8 h-8 object-contain" />
              ) : (
                <span className="text-3xl">{cat.icon || "🐾"}</span>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-[#9444A1]">Pet Owner Version</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-3">{topicData.title}</h1>
            {topicData.description && (
              <p className="text-gray-600 leading-relaxed">{topicData.description}</p>
            )}
            <div className="mt-4">
              <span className="bg-[#9444A1]/10 text-[#9444A1] font-semibold text-xs px-3 py-1 rounded-full">
                {topicData.articles.length} Article{topicData.articles.length !== 1 ? "s" : ""}
              </span>
            </div>
          </div>

          {/* Article cards */}
          <div className="space-y-4">
            {topicData.articles.map((article, idx) => (
              <Link
                key={article.id}
                href={`/pet-blogs/${cat.slug}/${topicData.slug}/${article.slug}`}
                className="group block bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#9444A1]/40 transition-all duration-300 p-6"
              >
                <div className="flex items-start gap-4">
                  <div className="flex-shrink-0 w-10 h-10 rounded-full bg-[#9444A1]/10 flex items-center justify-center text-[#9444A1] font-bold text-sm">
                    {idx + 1}
                  </div>
                  <div className="flex-1 min-w-0">
                    <h2 className="text-lg font-bold text-gray-900 group-hover:text-[#9444A1] transition-colors mb-1">
                      {article.title}
                    </h2>
                    <p className="text-sm text-gray-500 line-clamp-2">{article.summary}</p>
                    <div className="mt-3 flex items-center gap-4 text-xs text-gray-400">
                      {article.author && <span>By {article.author}</span>}
                      {article.reviewed_date && <><span>·</span><span>Reviewed {article.reviewed_date}</span></>}
                      <span className="ml-auto text-[#9444A1] font-semibold group-hover:translate-x-1 transition-transform">Read →</span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </main>
      </div>
    </div>
  );
}
