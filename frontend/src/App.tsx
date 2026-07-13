import { Activity, Bot, ChartNoAxesCombined, ShieldCheck } from "lucide-react";

const features = [
  {
    title: "Finance workspace",
    description: "Track expenses, income, budgets, goals, and reports.",
    icon: ChartNoAxesCombined,
  },
  {
    title: "AI insights",
    description: "Use Gemini-powered analysis for summaries and recommendations.",
    icon: Bot,
  },
  {
    title: "Production baseline",
    description: "Health checks, typed config, Docker, linting, and tests.",
    icon: ShieldCheck,
  },
];

function App() {
  return (
    <main className="app-shell">
      <section className="hero" aria-labelledby="page-title">
        <div className="status-pill">
          <Activity size={16} aria-hidden="true" />
          Day 1 foundation
        </div>
        <h1 id="page-title">FinPilot AI</h1>
        <p>
          A production-ready foundation for an AI-powered personal finance
          platform.
        </p>
      </section>

      <section className="feature-grid" aria-label="Foundation features">
        {features.map((feature) => {
          const Icon = feature.icon;

          return (
            <article className="feature-card" key={feature.title}>
              <Icon size={24} aria-hidden="true" />
              <h2>{feature.title}</h2>
              <p>{feature.description}</p>
            </article>
          );
        })}
      </section>
    </main>
  );
}

export default App;
