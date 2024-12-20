const steps = [
  {
    number: "01",
    title: "Create Your Circle",
    description: "Sign up and create a savings group or join an existing one",
  },
  {
    number: "02",
    title: "Set Contributions",
    description: "Define contribution amounts and schedule with your group",
  },
  {
    number: "03",
    title: "Start Saving",
    description: "Make regular contributions and watch your savings grow",
  },
];

export const HowItWorks = () => {
  return (
    <section className="py-32 px-4 bg-gradient-to-br from-[#E5DEFF] to-[#F2FCE2] relative overflow-hidden">
      <div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1501854140801-50d01698950b')] bg-cover bg-center opacity-5" />
      <div className="max-w-6xl mx-auto relative">
        <div className="text-center mb-16 animate-fade-up">
          <h2 className="text-3xl md:text-4xl font-bold text-secondary-foreground mb-4">
            How GroupStash Works
          </h2>
          <p className="text-lg text-secondary-foreground/80 max-w-2xl mx-auto">
            Get started with group savings in three simple steps
          </p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div
              key={step.number}
              className="relative p-8 rounded-xl backdrop-blur-xl bg-white/40 border border-white/40 shadow-xl animate-fade-up hover:transform hover:scale-105 transition-all duration-300"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="absolute -top-4 left-6 bg-primary text-white text-lg font-bold px-4 py-2 rounded-xl shadow-lg">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-secondary-foreground mb-4 mt-4">
                {step.title}
              </h3>
              <p className="text-secondary-foreground/80">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};