import { Button } from "@/components/ui/button";
import { ArrowRight } from "lucide-react";
import { motion } from "framer-motion";

export const Hero = () => {
  return (
    <section className="relative min-h-[90vh] flex items-center justify-center bg-gradient-to-br from-[#FFE8D6] to-[#FFF0E5] py-20 px-4 overflow-hidden">
      <motion.div 
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.8 }}
        className="relative max-w-5xl mx-auto text-center"
      >
        <div className="backdrop-blur-xl bg-white/10 p-8 md:p-12 rounded-3xl border border-white/20 shadow-2xl">
          <motion.span 
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ delay: 0.2 }}
            className="inline-block px-4 py-2 text-sm font-medium bg-gradient-accent text-white rounded-full mb-6 shadow-lg"
          >
            Transform Your Group Savings
          </motion.span>
          <motion.h1 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.4 }}
            className="text-4xl md:text-6xl font-bold text-gray-900 mb-6 leading-tight"
          >
            Empower Your Community with <span className="text-transparent bg-clip-text bg-gradient-accent">Smart Saving</span>
          </motion.h1>
          <motion.p 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="text-lg md:text-xl text-gray-700 mb-8 max-w-2xl mx-auto"
          >
            Create your circle, save together, and access low-interest loans with a platform designed for community growth.
          </motion.p>
          <motion.div 
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.8 }}
            className="flex flex-col sm:flex-row gap-4 justify-center items-center"
          >
            <Button 
              size="lg" 
              className="bg-gradient-accent hover:opacity-90 transition-all duration-300 text-white font-semibold px-8 py-6 rounded-2xl shadow-lg group"
            >
              Get Started
              <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
            </Button>
            <Button 
              size="lg" 
              variant="outline" 
              className="border-2 border-primary/20 hover:bg-primary/5 text-gray-800 font-semibold px-8 py-6 rounded-2xl"
            >
              Learn More
            </Button>
          </motion.div>
        </div>
      </motion.div>
    </section>
  );
};