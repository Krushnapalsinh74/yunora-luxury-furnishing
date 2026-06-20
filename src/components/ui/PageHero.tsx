import Breadcrumb from "./Breadcrumb";

interface PageHeroProps {
  title: string;
  subtitle?: string;
  breadcrumb?: { label: string; href?: string }[];
}

export default function PageHero({ title, subtitle, breadcrumb }: PageHeroProps) {
  return (
    <div className="bg-muted/30 py-16 lg:py-24 border-b border-border/50">
      <div className="container mx-auto px-4 lg:px-8 flex flex-col items-center text-center">
        {breadcrumb && (
          <div className="mb-6">
            <Breadcrumb items={breadcrumb} />
          </div>
        )}
        <h1 className="font-serif text-4xl lg:text-6xl text-foreground mb-4">{title}</h1>
        {subtitle && (
          <p className="text-muted-foreground text-lg max-w-2xl">{subtitle}</p>
        )}
      </div>
    </div>
  );
}
