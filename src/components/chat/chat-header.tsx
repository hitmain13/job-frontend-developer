import { memo } from "react";

interface ChatHeaderProps {
  hasMessages: boolean;
  onReset: () => void;
  onExportFull: () => void;
  onExportDiagnosis?: () => void;
  hasDiagnosisExport?: boolean;
}

export const ChatHeader = memo(
  ({
    hasMessages,
    onReset,
    onExportFull,
    onExportDiagnosis,
    hasDiagnosisExport,
  }: ChatHeaderProps) => (
    <div className="bg-surface border-b border-border p-4 flex-shrink-0">
      <div className="max-w-4xl mx-auto flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <div className="w-10 h-10 rounded-full bg-gradient-purple-blue flex items-center justify-center text-white font-semibold">
            R
          </div>
          <div>
            <h1 className="text-lg font-semibold text-foreground">Roberto</h1>
            <p className="text-sm text-muted-foreground">
              Especialista em Marketplaces
            </p>
          </div>
        </div>

        <div className="flex items-center space-x-2">
          {hasMessages && (
            <>
              <ExportButton label="Exportar" onClick={onExportFull} />

              {hasDiagnosisExport && onExportDiagnosis && (
                <ExportButton label="Diagnóstico" onClick={onExportDiagnosis} />
              )}
            </>
          )}

          <button
            onClick={onReset}
            className="px-4 py-2 text-sm rounded-lg border border-border bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2"
          >
            Nova Conversa
          </button>
        </div>
      </div>
    </div>
  ),
);

const ExportButton = ({
  label,
  onClick,
}: {
  label: string;
  onClick: () => void;
}) => (
  <button
    onClick={onClick}
    className="px-3 py-2 text-sm rounded-lg border border-border bg-surface hover:bg-surface-elevated text-muted-foreground hover:text-foreground focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50 flex items-center space-x-2"
  >
    <svg
      className="w-4 h-4"
      fill="none"
      viewBox="0 0 24 24"
      stroke="currentColor"
    >
      <path
        strokeLinecap="round"
        strokeLinejoin="round"
        strokeWidth={2}
        d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
      />
    </svg>
    <span className="hidden sm:inline">{label}</span>
  </button>
);
