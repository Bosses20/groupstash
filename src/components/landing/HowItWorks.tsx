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
    <section className="py-20 px-4 bg-secondary">
      <div className="max-w-6xl mx-auto">
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
              className="relative p-6 rounded-lg bg-white animate-fade-up"
              style={{ animationDelay: `${index * 100}ms` }}
            >
              <span className="absolute -top-4 left-6 bg-primary text-white text-sm font-bold px-3 py-1 rounded">
                {step.number}
              </span>
              <h3 className="text-xl font-semibold text-secondary-foreground mb-2 mt-4">
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