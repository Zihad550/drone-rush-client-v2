"use client";

import Image from "next/image";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";

interface PromotionCardProps {
  title: string;
  description: string;
  discount: string;
  image: string;
  cta: string;
}

export default function PromotionCard({
  title,
  description,
  discount,
  image,
  cta,
}: PromotionCardProps) {
  return (
    <Card className="group relative overflow-hidden bg-card/80 backdrop-blur-sm border border-primary/20 hover:border-primary/50 transition-all duration-300 hover:scale-105 hover:shadow-[0_0_30px_rgba(var(--primary),0.3)]">
      <CardContent className="p-6">
        <div className="relative mb-4 overflow-hidden rounded-lg">
          <Image
            src={image}
            alt={title}
            width={400}
            height={250}
            className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
          />
          <div className="absolute top-2 right-2 bg-gradient-to-r from-primary to-secondary text-primary-foreground px-3 py-1 rounded-full text-sm font-bold animate-pulse">
            {discount}
          </div>
        </div>
        <h3 className="text-xl font-semibold mb-2 text-foreground group-hover:text-primary transition-colors">
          {title}
        </h3>
        <p className="text-muted-foreground mb-4">{description}</p>
        <Button className="w-full bg-gradient-to-r from-primary to-secondary hover:from-primary/80 hover:to-secondary/80 text-primary-foreground font-medium py-2 px-4 rounded-lg transition-all duration-300 hover:shadow-lg">
          {cta}
        </Button>
      </CardContent>
      <div className="absolute inset-0 bg-gradient-to-r from-transparent via-primary/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
    </Card>
  );
}
