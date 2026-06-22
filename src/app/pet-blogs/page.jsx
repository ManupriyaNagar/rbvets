import Link from "next/link";
import { api } from "@/lib/api";

export const metadata = {
  title: "Pet Owners Overview | RBV Pet Blogs",
  description:
    "Expert veterinary health guides for dog, cat, horse, and bird owners — written by veterinary professionals.",
};

export default async function PetBlogsOverview() {
  let categories = [];
  try {
    categories = await api.getCategories();
  } catch (err) {
    console.error("Failed to fetch categories:", err);
  }

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Hero */}
      <section className="bg-white border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 py-12 md:py-16 flex flex-col md:flex-row items-center gap-10">
          <div className="flex-1">
            <p className="text-xs font-bold uppercase tracking-widest text-[#9444A1] mb-3">
              Pet Owners Topics
            </p>
            <h1 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
              Pet Owners Overview
            </h1>
            <p className="text-gray-600 leading-relaxed max-w-xl">
              The content in this section is designed for use by pet owners in
              their home care for their animals. The information is derived from
              professional veterinary expertise and covers basic, and some
              medical, information for owners, as well as special subjects such
              as emergencies and pain management.
            </p>
            <p className="text-gray-500 italic text-sm mt-4">
              The information is written by experts, but owners should consult
              their veterinarian when making care decisions for their pets.
            </p>
          </div>
          <div className="flex-shrink-0 w-full md:w-72 h-52 rounded-2xl bg-[#9444A1]/10 flex items-center justify-center">
            <span className="text-7xl">🐾</span>
          </div>
        </div>
      </section>

      {/* Category Grid */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 py-12">
        <h2 className="text-xl font-bold text-gray-800 mb-8">Browse by Animal</h2>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {categories.map((cat) => (
            <Link
              key={cat.id}
              href={`/pet-blogs/${cat.slug}`}
              className="group bg-white rounded-2xl border border-gray-200 shadow-sm hover:shadow-md hover:border-[#9444A1]/40 transition-all duration-300 overflow-hidden"
            >
              <div className="bg-gradient-to-br from-[#9444A1]/10 to-[#d7a463]/10 h-36 flex items-center justify-center">
                {cat.icon && (cat.icon.startsWith('http') || cat.icon.startsWith('/') || cat.icon.startsWith('data:')) ? (
                  <img src={cat.icon} alt={cat.name} className="w-16 h-16 object-contain" />
                ) : (
                  <span className="text-6xl">{cat.icon || "🐾"}</span>
                )}
              </div>
              <div className="p-5">
                <h3 className="text-lg font-bold text-gray-900 group-hover:text-[#9444A1] transition-colors mb-1">
                  {cat.name}
                </h3>
                <p className="text-sm text-gray-500 line-clamp-2">{cat.description}</p>
                <div className="mt-3 flex items-center text-xs font-semibold text-[#9444A1]">
                  <span>{cat.topics?.length ?? 0} topics</span>
                  <span className="ml-auto group-hover:translate-x-1 transition-transform">→</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
      </section>

      {/* All Topics Quick Links */}
      <section className="max-w-6xl mx-auto px-4 sm:px-6 pb-16">
        <h2 className="text-xl font-bold text-gray-800 mb-6">All Topics at a Glance</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {categories.map((cat) => (
            <div key={cat.id} className="bg-white rounded-2xl border border-gray-200 p-6 shadow-sm">
              <Link href={`/pet-blogs/${cat.slug}`} className="flex items-center gap-2 mb-4 group">
                {cat.icon && (cat.icon.startsWith('http') || cat.icon.startsWith('/') || cat.icon.startsWith('data:')) ? (
                  <img src={cat.icon} alt={cat.name} className="w-6 h-6 object-contain" />
                ) : (
                  <span className="text-2xl">{cat.icon || "🐾"}</span>
                )}
                <h3 className="text-base font-bold text-gray-900 group-hover:text-[#9444A1] transition-colors">
                  {cat.name} Owners
                </h3>
              </Link>
              <ul className="space-y-2">
                {(cat.topics ?? []).map((topic) => (
                  <li key={topic.id} className="flex items-start gap-2">
                    <span className="mt-1 text-[#9444A1] text-xs">⊕</span>
                    <Link
                      href={`/pet-blogs/${cat.slug}/${topic.slug}`}
                      className="text-sm text-gray-700 hover:text-[#9444A1] hover:underline transition-colors"
                    >
                      {topic.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
