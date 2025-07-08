import type { Diagnosis } from "../../types/chat";

interface DiagnosisCardProps {
  diagnosis?: Diagnosis;
}

export const DiagnosisCard = ({ diagnosis }: DiagnosisCardProps) => {
  return (
    <div className="bg-surface border border-border rounded-xl p-6 space-y-4">
      <div className="flex items-center space-x-3">
        <div className="w-10 h-10 rounded-lg bg-gradient-purple-blue flex items-center justify-center">
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
              d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
            />
          </svg>
        </div>
        <div>
          <h3 className="font-semibold text-foreground">
            Diagnóstico Personalizado
          </h3>
          <p className="text-sm text-muted-foreground">
            Análise completa do seu potencial
          </p>
        </div>
      </div>

      <div className="space-y-4">
        <div className="bg-background rounded-lg p-4">
          <h4 className="font-medium text-sm text-accent mb-1">
            ESTÁGIO ATUAL
          </h4>
          <p className="text-foreground font-semibold">{diagnosis?.stage}</p>
        </div>

        <div className="bg-background rounded-lg p-4">
          <h4 className="font-medium text-sm text-accent mb-1">
            POTENCIAL DE CRESCIMENTO
          </h4>
          <p className="text-foreground font-semibold">
            {diagnosis?.potential}
          </p>
        </div>

        <div className="bg-background rounded-lg p-4">
          <h4 className="font-medium text-sm text-accent mb-2">
            INSIGHTS ESPECÍFICOS
          </h4>
          <p className="text-sm text-muted-foreground leading-relaxed">
            {diagnosis?.specificInsights}
          </p>
        </div>

        <div className="bg-background rounded-lg p-4">
          <h4 className="font-medium text-sm text-accent mb-3">
            RECOMENDAÇÕES ESTRATÉGICAS
          </h4>
          <ul className="space-y-2">
            {diagnosis?.recommendations.map((rec, index) => (
              <li key={index} className="flex items-start space-x-2">
                <div className="w-1.5 h-1.5 rounded-full bg-accent mt-2 flex-shrink-0" />
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {rec}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
};
