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
    const { getByText } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(getByText("Diagnóstico Personalizado")).toBeInTheDocument();
  });

  it("displays stage correctly", () => {
    const { getByText } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(getByText("ESTÁGIO ATUAL")).toBeInTheDocument();
    expect(getByText("Initial Growth")).toBeInTheDocument();
  });

  it("displays potential correctly", () => {
    const { getByText } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(getByText("POTENCIAL DE CRESCIMENTO")).toBeInTheDocument();
    expect(getByText("High")).toBeInTheDocument();
  });

  it("displays specific insights correctly", () => {
    const { getByText } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(getByText("INSIGHTS ESPECÍFICOS")).toBeInTheDocument();
    expect(
      getByText("Strong market fit with opportunities for expansion."),
    ).toBeInTheDocument();
  });

  it("displays all recommendations", () => {
    const { getByText } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(getByText("RECOMENDAÇÕES ESTRATÉGICAS")).toBeInTheDocument();
    expect(
      getByText("Focus on customer acquisition"),
    ).toBeInTheDocument();
    expect(getByText("Optimize marketing channels")).toBeInTheDocument();
    expect(getByText("Expand product offerings")).toBeInTheDocument();
  });

  it("renders correct number of recommendation items", () => {
    const { getAllByRole } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    const recommendationItems = getAllByRole("listitem");
    expect(recommendationItems).toHaveLength(
      mockDiagnosis.recommendations.length,
    );
  });

  it("handles empty recommendations array", () => {
    const emptyRecommendationsDiagnosis: Diagnosis = {
      ...mockDiagnosis,
      recommendations: [],
    };
    const { getByText, queryAllByRole } = render(<DiagnosisCard diagnosis={emptyRecommendationsDiagnosis} />);
    expect(getByText("RECOMENDAÇÕES ESTRATÉGICAS")).toBeInTheDocument();
    const recommendationItems = queryAllByRole("listitem");
    expect(recommendationItems).toHaveLength(0);
  });

  it("renders SVG icon", () => {
    const { getByTestId } = render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    const svgElement = getByTestId("svg-icon");
    expect(svgElement).toBeInTheDocument();
  });
});
