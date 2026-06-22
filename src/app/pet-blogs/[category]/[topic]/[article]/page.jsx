import Link from "next/link";
import { notFound } from "next/navigation";
import { api } from "@/lib/api";

export async function generateStaticParams() {
  try {
    const sitemap = await api.getBlogSitemap();
    return sitemap.flatMap((e) =>
      e.topics.flatMap((t) =>
        t.articles.map((articleSlug) => ({
          category: e.category_slug,
          topic:    t.topic_slug,
          article:  articleSlug,
        }))
      )
    );
  } catch {
    return [];
  }
}

export async function generateMetadata({ params }) {
  const { article } = await params;
  try {
    const a = await api.getArticleBySlug(article);
    return { title: `${a.title} | RBV Pet Blogs`, description: a.summary };
  } catch {
    return {};
  }
}

export default async function ArticlePage({ params }) {
  const { category, topic, article } = await params;

  let cat         = null;
  let articleData = null;
  try {
    [cat, articleData] = await Promise.all([
      api.getCategoryBySlug(category),
      api.getArticleBySlug(article),
    ]);
  } catch {}

  if (!cat || !articleData) notFound();

  const topicData = cat.topics.find((t) => t.slug === topic);
  if (!topicData) notFound();

  const sections       = articleData.sections ?? [];
  const currentIdx     = topicData.articles.findIndex((a) => a.slug === article);
  const prevArticle    = topicData.articles[currentIdx - 1] ?? null;
  const nextArticle    = topicData.articles[currentIdx + 1] ?? null;

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/pet-blogs" className="hover:text-[#9444A1] transition-colors">Pet Owners</Link>
          <span>›</span>
          <Link href={`/pet-blogs/${cat.slug}`} className="hover:text-[#9444A1] transition-colors">{cat.name} Owners</Link>
          <span>›</span>
          <Link href={`/pet-blogs/${cat.slug}/${topicData.slug}`} className="hover:text-[#9444A1] transition-colors">{topicData.title}</Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{articleData.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24">
            {/* Section TOC */}
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest">In This Topic</span>
              <span className="text-gray-400">+</span>
            </div>
            {sections.length > 0 && (
              <div className="p-3 border-b border-gray-100">
                <ul className="space-y-1">
                  {sections.map((sec, i) => (
                    <li key={i}>
                      <a href={`#section-${i}`} className="block text-xs text-gray-600 hover:text-[#9444A1] px-2 py-1.5 rounded hover:bg-gray-50 transition-colors">
                        {sec.heading}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}

            {/* Sibling articles */}
            <div className="bg-gray-100 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">Other Articles</span>
            </div>
            <nav className="p-3">
              {topicData.articles.map((a) => (
                <Link
                  key={a.id}
                  href={`/pet-blogs/${cat.slug}/${topicData.slug}/${a.slug}`}
                  className={`flex items-center gap-2 px-3 py-2.5 rounded-lg text-sm transition-colors ${
                    a.slug === article
                      ? "bg-[#9444A1]/10 text-[#9444A1] font-semibold"
                      : "text-gray-700 hover:bg-gray-50 hover:text-[#9444A1]"
                  }`}
                >
                  <span className="text-xs">→</span>
                  {a.title}
                </Link>
              ))}
            </nav>
          </div>
        </aside>

        {/* Article */}
        <main className="flex-1 min-w-0">
          <Link href={`/pet-blogs/${cat.slug}/${topicData.slug}`} className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#9444A1] mb-6 hover:underline">
            ← {topicData.title}
          </Link>

          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {/* Header */}
            <div className="flex items-center gap-2 mb-4">
              {cat.icon && (cat.icon.startsWith('http') || cat.icon.startsWith('/') || cat.icon.startsWith('data:')) ? (
                <img src={cat.icon} alt={cat.name} className="w-6 h-6 object-contain" />
              ) : (
                <span className="text-2xl">{cat.icon || "🐾"}</span>
              )}
              <span className="text-xs font-bold uppercase tracking-widest text-[#9444A1]">Pet Owner Version</span>
            </div>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">{articleData.title}</h1>

            {/* Meta */}
            {articleData.author && (
              <p className="text-sm text-gray-500 mb-1">
                By <span className="text-[#9444A1] font-semibold">{articleData.author}</span>
              </p>
            )}
            {articleData.reviewed_date && (
              <p className="text-xs text-gray-400 mb-6">Reviewed/Revised {articleData.reviewed_date}</p>
            )}

            {/* Section quick-jump links */}
            {sections.length > 0 && (
              <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
                {sections.map((sec, i) => (
                  <a key={i} href={`#section-${i}`} className="text-xs text-[#9444A1] hover:underline font-medium">
                    {sec.heading}
                  </a>
                ))}
              </div>
            )}

            {/* Summary */}
            {articleData.summary && (
              <p className="text-gray-700 leading-relaxed mb-8 text-base">{articleData.summary}</p>
            )}

            {/* Featured image */}
            {articleData.featured_image && (
              <img
                src={articleData.featured_image}
                alt={articleData.title}
                className="w-full rounded-xl mb-8 object-cover max-h-72"
              />
            )}

            {/* Content sections */}
            <div className="space-y-8">
              {sections.map((sec, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-24">
                  <h2 className="text-lg font-bold text-white bg-[#9444A1] px-5 py-3 rounded-xl mb-4">
                    {sec.heading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed pl-1">{sec.body}</p>
                </section>
              ))}
            </div>
          </article>

          {/* Prev / Next */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {prevArticle ? (
              <Link
                href={`/pet-blogs/${cat.slug}/${topicData.slug}/${prevArticle.slug}`}
                className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#9444A1]/40 hover:shadow-md transition-all p-5 group"
              >
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">← Previous</p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#9444A1]">{prevArticle.title}</p>
              </Link>
            ) : <div className="flex-1" />}

            {nextArticle ? (
              <Link
                href={`/pet-blogs/${cat.slug}/${topicData.slug}/${nextArticle.slug}`}
                className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#9444A1]/40 hover:shadow-md transition-all p-5 text-right group"
              >
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">Next →</p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#9444A1]">{nextArticle.title}</p>
              </Link>
            ) : <div className="flex-1" />}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
            <strong>Disclaimer:</strong> This information is for general educational purposes only.
            Always consult your veterinarian before making health decisions for your pet.
          </div>
        </main>
      </div>
    </div>
  );
}
