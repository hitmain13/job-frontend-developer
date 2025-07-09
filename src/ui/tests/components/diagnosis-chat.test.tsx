import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { DiagnosisCard } from "../../components/chat/diagnosis-chat";
import type { Diagnosis } from "../../../types/chat";

describe("DiagnosisCard", () => {
  it("renders without crashing", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "Diagnóstico Personalizado" }),
    ).toBeInTheDocument();
  });

  it("displays stage correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "ESTÁGIO ATUAL" }),
    ).toBeInTheDocument();
    expect(screen.getByText("Initial Growth")).toBeInTheDocument();
  });

  it("displays potential correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "POTENCIAL DE CRESCIMENTO" }),
    ).toBeInTheDocument();
    expect(screen.getByText("High")).toBeInTheDocument();
  });

  it("displays specific insights correctly", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "INSIGHTS ESPECÍFICOS" }),
    ).toBeInTheDocument();
    expect(
      screen.getByText("Strong market fit with opportunities for expansion."),
    ).toBeInTheDocument();
  });

  it("displays all recommendations", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "RECOMENDAÇÕES ESTRATÉGICAS" }),
    ).toBeInTheDocument();
    mockDiagnosis.recommendations.forEach((recommendation) => {
      expect(screen.getByText(recommendation)).toBeInTheDocument();
    });
  });

  it("renders correct number of recommendation items", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    const recommendationItems = screen.getAllByRole("listitem");
    expect(recommendationItems.length).toBe(
      mockDiagnosis.recommendations.length,
    );
  });

  it("handles empty recommendations array", () => {
    const emptyRecommendationsDiagnosis: Diagnosis = {
      ...mockDiagnosis,
      recommendations: [],
    };
    render(<DiagnosisCard diagnosis={emptyRecommendationsDiagnosis} />);
    expect(
      screen.getByRole("heading", { name: "RECOMENDAÇÕES ESTRATÉGICAS" }),
    ).toBeInTheDocument();
    const recommendationItems = screen.queryAllByRole("listitem");
    expect(recommendationItems.length).toBe(0);
  });

  it("renders SVG icon", () => {
    render(<DiagnosisCard diagnosis={mockDiagnosis} />);
    expect(
      screen.getByRole("img", { name: "Diagnosis Icon" }),
    ).toBeInTheDocument();
  });
});

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
