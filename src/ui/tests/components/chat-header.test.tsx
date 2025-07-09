import { describe, it, expect, vi } from "vitest";
import { render, screen, fireEvent } from "@testing-library/react";
import { ChatHeader } from "@/ui/components";

describe("ChatHeader", () => {
  it("renders the header with default info", () => {
    render(
      <ChatHeader
        hasMessages={false}
        onReset={mockReset}
        onExportFull={mockExportFull}
      />,
    );

    expect(screen.getByText("Roberto")).toBeInTheDocument();
    expect(
      screen.getByText("Especialista em Marketplaces"),
    ).toBeInTheDocument();
    expect(
      screen.getByRole("button", { name: /nova conversa/i }),
    ).toBeInTheDocument();
    expect(
      screen.queryByRole("button", { name: /exportar/i }),
    ).not.toBeInTheDocument();
  });

  it("renders export button when hasMessages is true", () => {
    render(
      <ChatHeader
        hasMessages={true}
        onReset={mockReset}
        onExportFull={mockExportFull}
      />,
    );

    expect(
      screen.getByRole("button", { name: /exportar/i }),
    ).toBeInTheDocument();
  });

  it("renders diagnosis export button when hasDiagnosisExport is true", () => {
    render(
      <ChatHeader
        hasMessages={true}
        hasDiagnosisExport={true}
        onReset={mockReset}
        onExportFull={mockExportFull}
        onExportDiagnosis={mockExportDiagnosis}
      />,
    );

    expect(
      screen.getByRole("button", { name: /diagnóstico/i }),
    ).toBeInTheDocument();
  });

  it("calls onReset when 'Nova Conversa' button is clicked", () => {
    render(
      <ChatHeader
        hasMessages={false}
        onReset={mockReset}
        onExportFull={mockExportFull}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /nova conversa/i }));
    expect(mockReset).toHaveBeenCalled();
  });

  it("calls onExportFull when 'Exportar' button is clicked", () => {
    render(
      <ChatHeader
        hasMessages={true}
        onReset={mockReset}
        onExportFull={mockExportFull}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /exportar/i }));
    expect(mockExportFull).toHaveBeenCalled();
  });

  it("calls onExportDiagnosis when 'Diagnóstico' button is clicked", () => {
    render(
      <ChatHeader
        hasMessages={true}
        hasDiagnosisExport={true}
        onReset={mockReset}
        onExportFull={mockExportFull}
        onExportDiagnosis={mockExportDiagnosis}
      />,
    );

    fireEvent.click(screen.getByRole("button", { name: /diagnóstico/i }));
    expect(mockExportDiagnosis).toHaveBeenCalled();
  });
});

const mockReset = vi.fn();
const mockExportFull = vi.fn();
const mockExportDiagnosis = vi.fn();
