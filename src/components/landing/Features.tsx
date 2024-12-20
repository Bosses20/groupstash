import { Coins, Users, Bell, ChartBar } from "lucide-react";

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

export const Features = () => {
  return (
    <section className="py-32 px-4 bg-gradient-secondary relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1519389950473-47ba0277781c')] bg-cover bg-center opacity-5" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Everything You Need to Save Smarter
          </h2>
          <p className="text-lg text-white/80 max-w-2xl mx-auto">
            Powerful features designed to make group savings and lending simple, transparent, and effective.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="backdrop-blur-xl bg-white/10 p-8 rounded-xl border border-white/20 hover:bg-white/20 transition-all duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-12 w-12 text-white mb-4" />
              <h3 className="text-xl font-semibold text-white mb-2">
                {feature.title}
              </h3>
              <p className="text-white/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};