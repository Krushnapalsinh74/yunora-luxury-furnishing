import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import PageHero from "@/components/ui/PageHero";
import { Link } from "wouter";
import { useBlogs } from "@/lib/useApi";
import { Loader2 } from "lucide-react";
import { useState } from "react";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";
import catSofaFabrics from "@/assets/cat-sofa-fabrics.png";
import catComforters from "@/assets/cat-comforters.png";
import catHomeDecor from "@/assets/cat-home-decor.png";

const FALLBACK_IMAGES = [catCurtains, catBedsheets, catCushions, catSofaFabrics, catComforters, catHomeDecor];

const staticBlogPosts = [
  { id: 1, title: "The Art of Layering Textures in Modern Living Spaces", category: "Interior Design", createdAt: "2023-10-24", imageUrl: catCurtains, slug: "the-art-of-layering", excerpt: "Discover how mixing velvet, linen, and silk can create depth and warmth in minimalist interiors." },
  { id: 2, title: "Choosing the Perfect Thread Count for Your Climate", category: "Buying Guide", createdAt: "2023-10-18", imageUrl: catBedsheets, slug: "thread-count-guide", excerpt: "A comprehensive guide to understanding thread counts and selecting the ideal bedding for different seasons." },
  { id: 3, title: "Color Trends: Terracotta and Warm Neutrals for 2024", category: "Trends", createdAt: "2023-10-12", imageUrl: catCushions, slug: "color-trends-2024", excerpt: "Explore the resurgence of earthy tones in high-end residential design and how to incorporate them." },
  { id: 4, title: "Maintaining Your Luxury Upholstery Fabrics", category: "Care Guide", createdAt: "2023-09-30", imageUrl: catSofaFabrics, slug: "upholstery-care", excerpt: "Expert tips on cleaning, protecting, and extending the life of your premium sofa fabrics." },
  { id: 5, title: "The Psychology of Bedroom Aesthetics for Better Sleep", category: "Wellness", createdAt: "2023-09-22", imageUrl: catComforters, slug: "bedroom-sleep-psychology", excerpt: "How color palettes, textures, and lighting in your bedroom impact your rest quality." },
  { id: 6, title: "Elevating Small Spaces with Strategic Window Treatments", category: "Styling Tips", createdAt: "2023-09-15", imageUrl: catHomeDecor, slug: "window-treatments-small-spaces", excerpt: "Learn how to use curtains to make compact rooms feel taller, wider, and more luxurious." },
];

export default function Blogs() {
  const [page, setPage] = useState(1);
  const { data, isLoading } = useBlogs({ page, limit: 9 });

  const posts = data?.items?.length
    ? data.items.map((b, i) => ({
        id: b.id,
        title: b.title,
        category: b.category || "Lifestyle",
        createdAt: b.createdAt,
        imageUrl: b.imageUrl || FALLBACK_IMAGES[i % FALLBACK_IMAGES.length],
        slug: b.slug,
        excerpt: b.excerpt || "",
      }))
    : staticBlogPosts;

  const featured = posts[0];
  const gridPosts = posts.slice(1);

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow">
        <PageHero 
          title="The Journal" 
          subtitle="Insights, trends, and inspiration for luxury living."
          breadcrumb={[{ label: "Home", href: "/" }, { label: "Blogs" }]}
        />
        
        <div className="container mx-auto px-4 lg:px-8 py-16 lg:py-24">
          
          {isLoading && (
            <div className="flex justify-center py-16">
              <div className="flex flex-col items-center gap-3">
                <Loader2 className="h-8 w-8 text-primary animate-spin" />
                <p className="text-sm text-muted-foreground">Loading articles…</p>
                <p className="text-xs text-muted-foreground/60">Backend may take up to 10 seconds on first load</p>
              </div>
            </div>
          )}

          {!isLoading && featured && (
            <div className="mb-20">
              <Link href={`/blogs/${featured.slug}`}>
                <div className="group relative overflow-hidden rounded-lg shadow-sm border border-border/30 bg-card flex flex-col lg:flex-row">
                  <div className="w-full lg:w-3/5 h-[400px] lg:h-[500px] overflow-hidden">
                    <img
                      src={featured.imageUrl}
                      alt={featured.title}
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                      onError={(e) => { (e.target as HTMLImageElement).src = catCurtains; }}
                    />
                  </div>
                  <div className="w-full lg:w-2/5 p-8 lg:p-12 flex flex-col justify-center">
                    <span className="text-primary text-xs font-medium tracking-widest uppercase mb-4 block">{featured.category}</span>
                    <h2 className="font-serif text-3xl lg:text-4xl mb-4 group-hover:text-primary transition-colors">{featured.title}</h2>
                    <p className="text-sm text-muted-foreground mb-6 uppercase tracking-wider">{formatDate(featured.createdAt)}</p>
                    {featured.excerpt && (
                      <p className="text-muted-foreground font-light leading-relaxed mb-8">{featured.excerpt}</p>
                    )}
                    <span className="text-sm font-medium uppercase tracking-widest border-b border-foreground pb-1 self-start group-hover:border-primary transition-colors">Read Article</span>
                  </div>
                </div>
              </Link>
            </div>
          )}

          {!isLoading && (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 gap-y-16">
              {gridPosts.map((post) => (
                <Link key={post.id} href={`/blogs/${post.slug}`}>
                  <div className="group h-full flex flex-col">
                    <div className="w-full aspect-[4/3] overflow-hidden rounded-lg mb-6 bg-muted/30">
                      <img
                        src={post.imageUrl}
                        alt={post.title}
                        className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                        onError={(e) => { (e.target as HTMLImageElement).src = catCurtains; }}
                      />
                    </div>
                    <div className="flex-grow flex flex-col">
                      <span className="text-primary text-xs font-medium tracking-widest uppercase mb-3 block">{post.category}</span>
                      <h3 className="font-serif text-2xl mb-3 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                      <p className="text-xs text-muted-foreground mb-4 uppercase tracking-wider">{formatDate(post.createdAt)}</p>
                      {post.excerpt && (
                        <p className="text-muted-foreground text-sm font-light leading-relaxed mb-6 line-clamp-3">{post.excerpt}</p>
                      )}
                      <div className="mt-auto">
                        <span className="text-xs font-medium uppercase tracking-widest border-b border-border pb-1 group-hover:border-primary group-hover:text-primary transition-colors">Read More</span>
                      </div>
                    </div>
                  </div>
                </Link>
              ))}
            </div>
          )}

          {data && data.totalPages > 1 && (
            <div className="mt-20 flex justify-center gap-4">
              {page > 1 && (
                <button onClick={() => setPage((p) => p - 1)} className="border border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-3 text-sm font-medium tracking-widest uppercase transition-colors">
                  Previous
                </button>
              )}
              {page < data.totalPages && (
                <button onClick={() => setPage((p) => p + 1)} className="border border-foreground text-foreground hover:bg-foreground hover:text-background px-6 py-3 text-sm font-medium tracking-widest uppercase transition-colors">
                  Load More
                </button>
              )}
            </div>
          )}

        </div>
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
