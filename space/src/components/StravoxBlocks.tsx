import { stravox } from "@/content";
import { SpecTable } from "@/components/SpecTable";
import { FlightDiagramPlaceholder } from "@/components/Placeholders";

const stageClass = {
  done: "bg-dark text-light border-dark",
  now: "bg-hot text-light border-hot",
  next: "bg-light text-ink border-rule-light",
} as const;

const phaseColor = {
  hot: "bg-hot",
  airbrake: "bg-airbrake",
  success: "bg-status-success",
} as const;

export function BuildStages() {
  const { stages } = stravox;
  return (
    <>
      <div className="grid grid-cols-2 sm:grid-cols-3 lg:grid-cols-7 gap-2 mb-8">
        {stages.items.map((stage) => (
          <div
            key={stage.id}
            className={`border rounded-machined p-3 min-h-[110px] ${stageClass[stage.status]}`}
          >
            <p className="type-label opacity-80 mb-2">Stage {stage.id}</p>
            <p className="type-stat text-sm leading-tight mb-2">{stage.name}</p>
            <p className="type-label opacity-70">{stage.window}</p>
          </div>
        ))}
      </div>
      <div className="border border-rule-light rounded-machined p-5 bg-light">
        <h3 className="type-stat text-ink text-xl mb-3">{stages.active.title}</h3>
        <p className="type-body text-ink/80 mb-5">{stages.active.body}</p>
        <SpecTable rows={stages.active.stats} light />
      </div>
    </>
  );
}

export function FlightPhases() {
  const { flight } = stravox;
  return (
    <div className="space-y-8">
      {flight.phases.map((phase) => (
        <article
          key={phase.id}
          className="border border-rule-light rounded-machined overflow-hidden bg-light"
        >
          <div className={`h-1.5 ${phaseColor[phase.color]}`} />
          <div className="p-5 md:p-6 grid gap-6 lg:grid-cols-2">
            <div>
              <h3 className="type-stat text-ink text-2xl mb-4">
                <span className="mr-2" aria-hidden>
                  {phase.icon}
                </span>
                {phase.title}
              </h3>
              <FlightDiagramPlaceholder
                title={phase.title}
                colorClass={phaseColor[phase.color]}
              />
            </div>
            <div>
              <SpecTable rows={phase.specs} light />
              <p className="type-body text-ink/80 mt-5">{phase.body}</p>
            </div>
          </div>
        </article>
      ))}
    </div>
  );
}
