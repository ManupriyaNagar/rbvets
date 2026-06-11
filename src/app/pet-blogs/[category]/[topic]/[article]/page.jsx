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
  const params = [];
  try {
    const categories = await api.getCategories();
    for (const cat of categories) {
      const fullCat = await api.getCategoryBySlug(cat.slug);
      for (const topic of fullCat.topics) {
        topic.articles.forEach((article) => {
          params.push({
            category: cat.slug,
            topic: topic.slug,
            article: article.slug,
          });
        });
      }
    }
  } catch (err) {
    console.error("Failed to generate static params:", err);
  }
  return params;
}

export async function generateMetadata({ params }) {
  const { category, topic, article } = await params;
  try {
    const articleData = await api.getArticleBySlug(article);
    return {
      title: `${articleData.title} | RBV Pet Blogs`,
      description: articleData.summary,
    };
  } catch (err) {
    return {};
  }
}


export default async function ArticlePage({ params }) {
  const { category, topic, article } = await params;

  let cat = null;
  let articleData = null;
  try {
    cat = await api.getCategoryBySlug(category);
    articleData = await api.getArticleBySlug(article);
  } catch (err) {
    console.error("Failed to fetch article data:", err);
  }

  if (!cat || !articleData) notFound();

  const topicData = cat.topics.find((t) => t.slug === topic);
  if (!topicData) notFound();

  // Sibling articles for sidebar
  const siblingArticles = topicData.articles;

  // Prev / Next navigation
  const currentIdx = siblingArticles.findIndex((a) => a.slug === article);
  const prevArticle = siblingArticles[currentIdx - 1] ?? null;
  const nextArticle = siblingArticles[currentIdx + 1] ?? null;

  const sections = articleData.sections || articleData.content || [];

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Breadcrumb */}
      <div className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-3 flex items-center gap-2 text-sm text-gray-500 flex-wrap">
          <Link href="/pet-blogs" className="hover:text-[#9444A1] transition-colors">
            Pet Owners
          </Link>
          <span>›</span>
          <Link
            href={`/pet-blogs/${cat.slug}`}
            className="hover:text-[#9444A1] transition-colors"
          >
            {cat.name} Owners
          </Link>
          <span>›</span>
          <Link
            href={`/pet-blogs/${cat.slug}/${topicData.slug}`}
            className="hover:text-[#9444A1] transition-colors"
          >
            {topicData.title}
          </Link>
          <span>›</span>
          <span className="text-gray-800 font-medium">{articleData.title}</span>
        </div>
      </div>

      <div className="max-w-6xl mx-auto px-4 sm:px-6 py-10 flex flex-col lg:flex-row gap-8">
        {/* Sidebar */}
        <aside className="lg:w-64 flex-shrink-0">
          <div className="bg-white rounded-2xl border border-gray-200 shadow-sm overflow-hidden sticky top-24 space-y-0">
            {/* In this topic */}
            <div className="bg-gray-800 text-white px-4 py-3 flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-widest">
                In This Topic
              </span>
              <span className="text-gray-400 text-lg">+</span>
            </div>
            <div className="p-3 border-b border-gray-100">
              <ul className="space-y-1">
                {sections.map((section, i) => (
                  <li key={i}>
                    <a
                      href={`#section-${i}`}
                      className="block text-xs text-gray-600 hover:text-[#9444A1] px-2 py-1.5 rounded hover:bg-gray-50 transition-colors"
                    >
                      {section.heading}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Other articles in this topic */}
            <div className="bg-gray-100 px-4 py-3">
              <span className="text-xs font-bold uppercase tracking-widest text-gray-600">
                Other Articles in this Topic
              </span>
            </div>
            <nav className="p-3">
              {siblingArticles.map((a) => (
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

        {/* Article Content */}
        <main className="flex-1 min-w-0">
          {/* Back link */}
          <Link
            href={`/pet-blogs/${cat.slug}/${topicData.slug}`}
            className="inline-flex items-center gap-1 text-xs font-bold uppercase tracking-widest text-[#9444A1] mb-6 hover:underline"
          >
            ← {topicData.title}
          </Link>

          <article className="bg-white rounded-2xl border border-gray-200 shadow-sm p-8">
            {/* Article Header */}
            <div className="flex items-center gap-2 mb-4">
              {(() => {
                const iconInfo = getCatIcon(cat);
                return iconInfo.type === 'image' ? (
                  <img
                    src={iconInfo.value}
                    alt={cat.name}
                    className="w-6 h-6 rounded-full object-cover"
                  />
                ) : (
                  <span className="text-2xl">{iconInfo.value}</span>
                );
              })()}
              <span className="text-xs font-bold uppercase tracking-widest text-[#9444A1]">
                Pet Owner Version
              </span>
            </div>

            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              {articleData.title}
            </h1>

            {/* Meta */}
            <div className="flex flex-wrap items-center gap-x-4 gap-y-1 text-sm text-gray-500 mb-2">
              <span>
                By{" "}
                <span className="text-[#9444A1] font-semibold">
                  {articleData.author}
                </span>
              </span>
            </div>
            <p className="text-xs text-gray-400 mb-6">
              Reviewed/Revised {articleData.reviewedDate || articleData.reviewed_date}
            </p>

            {/* Section quick links */}
            <div className="flex flex-wrap gap-2 mb-8 pb-6 border-b border-gray-100">
              {sections.map((section, i) => (
                <a
                  key={i}
                  href={`#section-${i}`}
                  className="text-xs text-[#9444A1] hover:underline font-medium"
                >
                  {section.heading}
                </a>
              ))}
            </div>

            {/* Summary */}
            <p className="text-gray-700 leading-relaxed mb-8 text-base">
              {articleData.summary}
            </p>

            {/* Content Sections */}
            <div className="space-y-8">
              {sections.map((section, i) => (
                <section key={i} id={`section-${i}`} className="scroll-mt-24">
                  <h2 className="text-lg font-bold text-white bg-[#9444A1] px-5 py-3 rounded-xl mb-4">
                    {section.heading}
                  </h2>
                  <p className="text-gray-700 leading-relaxed pl-1">
                    {section.body}
                  </p>
                </section>
              ))}
            </div>
          </article>

          {/* Prev / Next Navigation */}
          <div className="mt-6 flex flex-col sm:flex-row gap-4">
            {prevArticle ? (
              <Link
                href={`/pet-blogs/${cat.slug}/${topicData.slug}/${prevArticle.slug}`}
                className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#9444A1]/40 hover:shadow-md transition-all p-5 group"
              >
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  ← Previous
                </p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#9444A1] transition-colors">
                  {prevArticle.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}

            {nextArticle ? (
              <Link
                href={`/pet-blogs/${cat.slug}/${topicData.slug}/${nextArticle.slug}`}
                className="flex-1 bg-white rounded-2xl border border-gray-200 shadow-sm hover:border-[#9444A1]/40 hover:shadow-md transition-all p-5 text-right group"
              >
                <p className="text-xs text-gray-400 uppercase tracking-widest mb-1">
                  Next →
                </p>
                <p className="text-sm font-semibold text-gray-800 group-hover:text-[#9444A1] transition-colors">
                  {nextArticle.title}
                </p>
              </Link>
            ) : (
              <div className="flex-1" />
            )}
          </div>

          {/* Disclaimer */}
          <div className="mt-6 bg-amber-50 border border-amber-200 rounded-2xl p-5 text-sm text-amber-800">
            <strong>Disclaimer:</strong> This information is intended for
            general educational purposes only. Always consult your veterinarian
            before making health decisions for your pet.
          </div>
        </main>
      </div>
    </div>
  );
}
