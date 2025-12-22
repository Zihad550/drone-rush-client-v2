import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";

interface JobCardProps {
  title: string;
  description: string;
  location: string;
  type: string;
}

export default function JobCard({
  title,
  description,
  location,
  type,
}: JobCardProps) {
  return (
    <div className="rounded-2xl border border-primary/20 bg-gradient-to-br from-background via-background/95 to-primary/5 p-6 shadow-[0_0_30px_rgba(var(--primary),0.1)] backdrop-blur-sm hover:border-primary/40 hover:shadow-[0_0_40px_rgba(var(--primary),0.2)] transition-all duration-300">
      <div className="mb-4 flex items-start justify-between">
        <h3 className="text-xl font-semibold text-foreground">{title}</h3>
        <Badge
          variant="secondary"
          className="bg-primary/10 text-primary hover:bg-primary/20"
        >
          {type}
        </Badge>
      </div>
      <p className="mb-4 text-muted-foreground">{description}</p>
      <div className="mb-4 flex items-center gap-2 text-sm text-muted-foreground">
        <svg
          className="h-4 w-4"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          role="img"
          aria-labelledby="location-title"
        >
          <title id="location-title">Location pin icon</title>
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z"
          />
        </svg>
        {location}
      </div>
      <Button className="w-full bg-primary hover:bg-primary/90">
        Apply Now
      </Button>
    </div>
  );
}
