import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import MobileNav from "@/components/layout/MobileNav";
import Breadcrumb from "@/components/ui/Breadcrumb";
import { Link, useParams } from "wouter";
import { useBlog, useBlogs } from "@/lib/useApi";
import { Loader2 } from "lucide-react";
import catCurtains from "@/assets/cat-curtains.png";
import catBedsheets from "@/assets/cat-bedsheets.png";
import catCushions from "@/assets/cat-cushions.png";

export default function BlogDetail() {
  const { slug } = useParams<{ slug: string }>();
  const { data: blog, isLoading } = useBlog(slug || "");
  const { data: relatedData } = useBlogs({ limit: 3 });

  const relatedPosts = relatedData?.items?.filter((b) => b.slug !== slug).slice(0, 2) || [];

  const formatDate = (d: string) =>
    new Date(d).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" });

  if (isLoading) {
    return (
      <div className="min-h-screen flex flex-col pb-16 lg:pb-0">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow flex items-center justify-center">
          <div className="flex flex-col items-center gap-4">
            <Loader2 className="h-10 w-10 text-primary animate-spin" />
            <p className="text-sm text-muted-foreground">Loading article…</p>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
        <AnnouncementBar />
        <Header />
        <main className="flex-grow pt-8 pb-24">
          <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
            <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/blogs" }, { label: "Article" }]} />
            <div className="text-center mt-20">
              <p className="text-muted-foreground mb-4">Article not found or loading from backend.</p>
              <Link href="/blogs" className="text-primary hover:underline">Back to Journal</Link>
            </div>
          </div>
        </main>
        <Footer />
        <MobileNav />
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col pb-16 lg:pb-0 bg-background">
      <AnnouncementBar />
      <Header />
      
      <main className="flex-grow pt-8 pb-24">
        <div className="container mx-auto px-4 lg:px-8 max-w-4xl">
          <Breadcrumb items={[{ label: "Home", href: "/" }, { label: "Journal", href: "/blogs" }, { label: blog.title }]} />
          
          <div className="text-center mt-8 mb-12">
            {blog.category && (
              <span className="text-primary text-sm font-medium tracking-widest uppercase mb-6 block">{blog.category}</span>
            )}
            <h1 className="font-serif text-4xl lg:text-6xl leading-tight mb-8">{blog.title}</h1>
            <p className="text-sm text-muted-foreground uppercase tracking-wider">{formatDate(blog.createdAt)}</p>
          </div>
        </div>

        {blog.imageUrl && (
          <div className="w-full max-w-6xl mx-auto px-4 lg:px-8 mb-16">
            <div className="aspect-[21/9] w-full overflow-hidden rounded-lg bg-muted/30">
              <img
                src={blog.imageUrl}
                alt={blog.title}
                className="w-full h-full object-cover"
                onError={(e) => { (e.target as HTMLImageElement).src = catCurtains; }}
              />
            </div>
          </div>
        )}

        <div className="container mx-auto px-4 lg:px-8 max-w-3xl">
          <div className="prose prose-lg prose-neutral prose-headings:font-serif prose-headings:font-normal prose-a:text-primary mx-auto">
            {blog.excerpt && (
              <p className="lead text-xl text-muted-foreground font-light mb-8">{blog.excerpt}</p>
            )}

            {blog.tags && blog.tags.length > 0 && (
              <div className="mt-16 pt-8 border-t border-border flex flex-wrap gap-2">
                {blog.tags.map((tag) => (
                  <span key={tag} className="bg-muted px-3 py-1 text-xs uppercase tracking-wider rounded">{tag}</span>
                ))}
              </div>
            )}

            {blog.metaDescription && (
              <p className="text-muted-foreground font-light leading-relaxed mt-6">{blog.metaDescription}</p>
            )}
          </div>
        </div>

        {relatedPosts.length > 0 && (
          <div className="bg-muted/10 py-20 mt-20 border-t border-border/50">
            <div className="container mx-auto px-4 lg:px-8">
              <h2 className="font-serif text-3xl mb-12 text-center">More from the Journal</h2>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                {relatedPosts.map((post, i) => (
                  <Link key={post.id} href={`/blogs/${post.slug}`} className="group">
                    <div className="flex flex-col sm:flex-row gap-6 bg-card p-4 rounded-lg shadow-sm border border-border/30 hover:border-primary/50 transition-colors">
                      <div className="w-full sm:w-1/3 aspect-[4/3] sm:aspect-square overflow-hidden rounded bg-muted/30">
                        <img
                          src={post.imageUrl || [catBedsheets, catCushions][i % 2]}
                          alt={post.title}
                          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                          onError={(e) => { (e.target as HTMLImageElement).src = catCurtains; }}
                        />
                      </div>
                      <div className="w-full sm:w-2/3 flex flex-col justify-center">
                        {post.category && (
                          <span className="text-primary text-xs font-medium tracking-widest uppercase mb-2">{post.category}</span>
                        )}
                        <h3 className="font-serif text-xl mb-2 group-hover:text-primary transition-colors line-clamp-2">{post.title}</h3>
                        <p className="text-xs text-muted-foreground uppercase tracking-wider mt-auto">
                          {new Date(post.createdAt).toLocaleDateString("en-IN", { day: "numeric", month: "long", year: "numeric" })}
                        </p>
                      </div>
                    </div>
                  </Link>
                ))}
              </div>
            </div>
          </div>
        )}
      </main>

      <Footer />
      <MobileNav />
    </div>
  );
}
