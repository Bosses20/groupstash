import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-primary py-20 px-4 overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1460925895917-afdab827c52f')] bg-cover bg-center opacity-10" />
      <div className="absolute inset-0 bg-gradient-primary opacity-90" />
      <div className="relative max-w-4xl mx-auto text-center">
        <div className="backdrop-blur-xl bg-white/10 p-8 rounded-2xl border border-white/20 shadow-xl animate-fade-up">
          <span className="inline-block px-3 py-1 text-sm font-medium bg-white/20 text-white rounded-full mb-6">
            Simplify Group Savings
          </span>
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-6 leading-tight">
            Empower Your Community with Seamless Saving & Lending
          </h1>
          <p className="text-lg md:text-xl text-white/90 mb-8 max-w-2xl mx-auto">
            Create your circle, save together, and access low-interest loans with a platform designed for community growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
            <Button size="lg" variant="secondary" className="group hover:bg-white hover:text-primary transition-all duration-300">
              Get Started
              <ArrowRight className="ml-2 h-4 w-4 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button size="lg" variant="outline" className="border-white/20 text-white hover:bg-white/20">
              Learn More
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};