import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="min-h-[80vh] flex items-center justify-center bg-secondary py-20 px-4">
      <div className="max-w-4xl mx-auto text-center animate-fade-up">
        <span className="inline-block px-3 py-1 text-sm font-medium bg-primary/10 text-primary rounded-full mb-6">
          Simplify Group Savings
        </span>
        <h1 className="text-4xl md:text-6xl font-bold text-secondary-foreground mb-6 leading-tight">
          Empower Your Community with Seamless Saving & Lending
        </h1>
        <p className="text-lg md:text-xl text-secondary-foreground/80 mb-8 max-w-2xl mx-auto">
          Create your circle, save together, and access low-interest loans with a platform designed for community growth.
        </p>
        <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
          <Button size="lg" className="group">
            Get Started
            <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
          </Button>
          <Button size="lg" variant="outline">
            Learn More
          </Button>
        </div>
      </div>
    </section>
  );
};