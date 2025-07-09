import { render, screen } from "@testing-library/react";
import { describe, it, expect } from "vitest";
import { ChatEmptyState } from "./chat-empty-state";

describe("ChatEmptyState component", () => {
  it("renders the circular icon with letter R", () => {
    render(<ChatEmptyState />);
    const icon = screen.getByText("R");
    expect(icon).toBeInTheDocument();
    expect(icon).toHaveClass("w-16 h-16");
  });

  it("displays the welcome heading in Portuguese", () => {
    render(<ChatEmptyState />);
    const heading = screen.getByRole("heading", {
      name: /bem-vindo à dolado!/i,
    });
    expect(heading).toBeInTheDocument();
  });

  it("shows the descriptive paragraph message", () => {
    render(<ChatEmptyState />);
    const paragraph = screen.getByText(
      /descubra como potencializar seus negócios através de canais digitais/i,
    );
    expect(paragraph).toBeInTheDocument();
  });
});
