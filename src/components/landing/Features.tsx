import { Coins, Users, Bell, ChartBar } from "lucide-react";
import { motion } from "framer-motion";

const features = [
  {
    icon: Users,
    title: "Create Circles",
    description: "Form trusted savings groups with people you know and trust",
  },
  {
    icon: Coins,
    title: "Save Together",
    description: "Pool resources and grow your savings as a community",
  },
  {
    icon: Bell,
    title: "Smart Reminders",
    description: "Never miss a contribution with automated notifications",
  },
  {
    icon: ChartBar,
    title: "Track Progress",
    description: "Monitor your group's savings and loan performance in real-time",
  },
];

const container = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: {
      staggerChildren: 0.2
    }
  }
};

const item = {
  hidden: { opacity: 0, y: 20 },
  show: { opacity: 1, y: 0 }
};

export const Features = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-[#F4F7FF] to-[#FFFFFF] relative overflow-hidden">
      <div className="max-w-6xl mx-auto relative">
        <motion.div 
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-4xl font-bold text-gray-900 mb-4">
            Everything You Need to <span className="text-transparent bg-clip-text bg-gradient-accent">Save Smarter</span>
          </h2>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Powerful features designed to make group savings and lending simple, transparent, and effective.
          </p>
        </motion.div>
        <motion.div 
          variants={container}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8"
        >
          {features.map((feature, index) => (
            <motion.div
              key={feature.title}
              variants={item}
              className="backdrop-blur-xl bg-white/80 p-8 rounded-3xl border border-white/20 hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl group"
            >
              <div className="bg-gradient-accent p-3 rounded-2xl inline-block mb-4 group-hover:scale-110 transition-transform duration-300">
                <feature.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 mb-2">
                {feature.title}
              </h3>
              <p className="text-gray-600">{feature.description}</p>
            </motion.div>
          ))}
        </motion.div>
      </div>
    </section>
  );
};