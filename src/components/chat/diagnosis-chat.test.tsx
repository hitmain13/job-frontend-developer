import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DiagnosisCard } from "./diagnosis-chat";
import type { Diagnosis } from "../../types/chat";

const mockDiagnosis: Diagnosis = {
  stage: "Initial Growth",
  potential: "High",
  specificInsights: "Strong market fit with opportunities for expansion.",
  recommendations: [
    "Focus on customer acquisition",
    "Optimize marketing channels",
    "Expand product offerings",
  ],
};

describe("DiagnosisCard", () => {
  it("renders without crashing", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(screen.getByText("Diagnóstico Personalizado")).toBeInTheDocument();
  });

  it("displays stage correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(screen.getByText("ESTÁGIO ATUAL")).toBeInTheDocument();
    expect(screen.getByText("Initial Growth")).toBeInTheDocument();
  });

  it("displays potential correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(screen.getByText("POTENCIAL DE CRESCIMENTO")).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("displays specific insights correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(screen.getByText("INSIGHTS ESPECÍFICOS")).toBeInTheDocument();
    expect(
      screen.getByText("Strong market fit with opportunities for expansion."),
    ).toBeInTheDocument();
  });

  it("displays all recommendations", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(screen.getByText("RECOMENDAÇÕES ESTRATÉGICAS")).toBeInTheDocument();
    expect(
      screen.getByText("Focus on customer acquisition"),
    ).toBeInTheDocument();
    expect(screen.getByText("Optimize marketing channels")).toBeInTheDocument();
    expect(screen.getByText("Expand product offerings")).toBeInTheDocument();
  });

  it("renders correct number of recommendation items", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    const recommendationItems = screen.getAllByRole("listitem");
    expect(recommendationItems).toHaveLength(
      mockDiagnosis.recommendations.length,
    );
  });

  it("handles empty recommendations array", () => {
    const emptyRecommendationsDiagnosis: Diagnosis = {
      ...mockDiagnosis,
      recommendations: [],
    };
    render(<DiagnosisCard diagnosis={emptyRecommendationsDiagnosis} />);
    expect(screen.getByText("RECOMENDAÇÕES ESTRATÉGICAS")).toBeInTheDocument();
    const recommendationItems = screen.queryAllByRole("listitem");
    expect(recommendationItems).toHaveLength(0);
  });

  it("renders SVG icon", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    const svgElement =
      screen.getByTestId("svg-icon") || document.querySelector("svg");
    expect(svgElement).toBeInTheDocument();
  });
});
