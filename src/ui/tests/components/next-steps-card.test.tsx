import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { NextStepsCard } from "../../components/chat/next-steps-card";

const mockNextSteps = {
  message: "Here are the recommended next steps.",
  options: ["Schedule meeting", "Talk to a specialist"],
  urgency: "This action should be taken within the next 5 days.",
};

describe("NextStepsCard", () => {
  it("renders title, subtitle, and main message", () => {
    const mockFn = vi.fn();

    render(<NextStepsCard nextSteps={mockNextSteps} onAction={mockFn} />);

    expect(screen.getByText("Próximos Passos")).toBeInTheDocument();
    expect(
      screen.getByText("Acelere sua estratégia digital"),
    ).toBeInTheDocument();
    expect(screen.getByText(mockNextSteps.message)).toBeInTheDocument();
  });

  it("renders all action buttons", () => {
    const mockFn = vi.fn();
    render(<NextStepsCard nextSteps={mockNextSteps} onAction={mockFn} />);

    mockNextSteps.options.forEach((option) => {
      expect(screen.getByText(option)).toBeInTheDocument();
    });
  });

  it("calls onAction with correct arguments when a button is clicked", () => {
    const mockFn = vi.fn();
    render(<NextStepsCard nextSteps={mockNextSteps} onAction={mockFn} />);

    const button = screen.getByText("Schedule meeting");
    fireEvent.click(button);

    expect(mockFn).toHaveBeenCalledTimes(1);
    expect(mockFn).toHaveBeenCalledWith("Schedule meeting", "schedule_meeting");
  });

  it("renders the urgency message", () => {
    const mockFn = vi.fn();
    render(<NextStepsCard nextSteps={mockNextSteps} onAction={mockFn} />);

    expect(screen.getByText(/Urgência estratégica/)).toBeInTheDocument();
    expect(screen.getByText(mockNextSteps.urgency)).toBeInTheDocument();
  });
});
