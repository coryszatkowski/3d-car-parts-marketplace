import { Printer, Settings, Car } from "lucide-react";

const steps = [
  {
    icon: Printer,
    title: "Print it",
    description: "Download or order the file",
    detail: "Get STL files instantly or order professionally printed parts delivered to your door"
  },
  {
    icon: Settings,
    title: "Mod it", 
    description: "Customize your part or spec",
    detail: "Adjust fitment, choose materials, or request custom modifications from creators"
  },
  {
    icon: Car,
    title: "Drive it",
    description: "Install and hit the road",
    detail: "Follow installation guides and join the community to show off your build"
  }
];

export function HowItWorks() {
  return (
    <section className="py-16 bg-background">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-foreground mb-4">How It Works</h2>
          <p className="text-muted-foreground max-w-2xl mx-auto">
            From design to install in three simple steps
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {steps.map((step, index) => (
            <div key={index} className="text-center group">
              {/* Icon */}
              <div className="relative mb-6">
                <div className="w-20 h-20 mx-auto bg-primary/10 rounded-full flex items-center justify-center group-hover:bg-primary/20 transition-colors">
                  <step.icon className="w-10 h-10 text-primary" />
                </div>
                {index < steps.length - 1 && (
                  <div className="hidden md:block absolute top-10 left-full w-full h-0.5 bg-border -translate-y-0.5">
                    <div className="w-0 h-full bg-primary transition-all duration-1000 group-hover:w-full"></div>
                  </div>
                )}
              </div>

              {/* Content */}
              <h3 className="text-xl font-semibold text-foreground mb-2">{step.title}</h3>
              <p className="text-muted-foreground mb-4">{step.description}</p>
              <p className="text-sm text-muted-foreground leading-relaxed">{step.detail}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}