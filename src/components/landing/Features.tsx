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
    <section className="py-20 px-4 bg-white">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            Everything You Need to Save Smarter
          </h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            Powerful features designed to make group savings and lending simple, transparent, and effective.
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {features.map((feature, index) => (
            <div
              key={feature.title}
              className="p-6 rounded-lg bg-secondary/50 hover:bg-secondary transition-colors duration-300 animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <feature.icon className="h-10 w-10 text-primary mb-4" />
              <h3 className="text-xl font-semibold text-secondary-foreground mb-2">
                {feature.title}
              </h3>
              <p className="text-secondary-foreground/80">{feature.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};