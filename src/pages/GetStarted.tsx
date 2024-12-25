import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";
import { ArrowRight, Users, Coins, Bell } from "lucide-react";
import { useNavigate } from "react-router-dom";

const steps = [
  {
    icon: Users,
    title: "Create Your Circle",
    description: "Start by creating your savings circle and inviting trusted members to join.",
  },
  {
    icon: Coins,
    title: "Set Contribution Rules",
    description: "Define contribution amounts, frequency, and savings goals for your group.",
  },
  {
    icon: Bell,
    title: "Start Saving",
    description: "Begin your savings journey with automated reminders and transparent tracking.",
  },
];

const GetStarted = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#FFE8D6] to-[#FFF0E5] py-20 px-4">
      <div className="max-w-6xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          className="text-center mb-16"
        >
          <h1 className="text-4xl md:text-5xl font-bold text-gray-900 mb-6">
            Get Started with <span className="text-transparent bg-clip-text bg-gradient-accent">GroupStash</span>
          </h1>
          <p className="text-xl text-gray-700 max-w-3xl mx-auto mb-12">
            Join thousands of communities already saving smarter with GroupStash. Follow these simple steps to begin your journey.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
          {steps.map((step, index) => (
            <motion.div
              key={step.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.2 }}
              className="backdrop-blur-xl bg-white/80 p-8 rounded-3xl border border-white/20 hover:border-primary/20 transition-all duration-300 shadow-lg hover:shadow-xl"
            >
              <div className="bg-gradient-accent p-4 rounded-2xl inline-block mb-6">
                <step.icon className="h-8 w-8 text-white" />
              </div>
              <h3 className="text-2xl font-semibold text-gray-900 mb-4">{step.title}</h3>
              <p className="text-gray-700 text-lg">{step.description}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="text-center"
        >
          <Button
            size="lg"
            onClick={() => navigate("/onboarding")}
            className="bg-gradient-accent hover:opacity-90 transition-all duration-300 text-white font-semibold px-8 py-6 rounded-2xl shadow-lg group"
          >
            Create Your Circle
            <ArrowRight className="ml-2 h-5 w-5 transition-transform group-hover:translate-x-1" />
          </Button>
        </motion.div>
      </div>
    </div>
  );
};

export default GetStarted;