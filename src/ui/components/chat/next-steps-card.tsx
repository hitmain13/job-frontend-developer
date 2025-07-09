import type { NextSteps } from "@/types/chat";

interface NextStepsCardProps {
  nextSteps: NextSteps;
  onAction: (text: string, value: string) => void;
}

export const NextStepsCard = ({ nextSteps, onAction }: NextStepsCardProps) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-blue-pink flex items-center justify-center">
          <svg
            className="w-5 h-5 text-white"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M13 10V3L4 14h7v7l9-11h-7z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">Próximos Passos</h3>
          <p className="text-sm text-muted-foreground">
            Acelere sua estratégia digital
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-background rounded-lg p-4">
          <p className="text-sm text-muted-foreground leading-relaxed">
            {nextSteps.message}
          </p>
        </div>

        <div className="space-y-2">
          {nextSteps.options.map((option, index) => (
            <button
              key={index}
              onClick={() =>
                onAction(option, option.toLowerCase().replace(/\s+/g, "_"))
              }
              className="
                w-full px-4 py-3 text-sm text-left rounded-lg
                bg-gradient-purple-blue text-white font-medium
                hover:bg-gradient-blue-pink transition-all duration-200
                hover:shadow-lg hover:translate-y-[-1px]
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
              "
            >
              {option}
            </button>
          ))}
        </div>

        <div className="bg-gradient-to-r from-orange-500/10 to-red-500/10 border border-orange-500/20 rounded-lg p-4">
          <div className="flex items-start space-x-2">
            <svg
              className="w-5 h-5 text-orange-400 mt-0.5 flex-shrink-0"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z"
              />
            </svg>
            <p className="text-sm text-orange-200 leading-relaxed">
              <span className="font-medium">⚡ Urgência estratégica:</span>{" "}
              {nextSteps.urgency}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
