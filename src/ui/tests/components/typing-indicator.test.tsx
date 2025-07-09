import { TypingIndicator } from "@/ui/components";
import { render } from "@testing-library/react";
import { describe, it, expect } from "vitest";

describe("TypingIndicator", () => {
  it("renders without crashing", () => {
    const { container } = render(<TypingIndicator />);
    expect(container).toBeTruthy();
  });

  it("displays the typing message text", () => {
    const { getByText } = render(<TypingIndicator />);
    expect(getByText("Roberto está digitando...")).toBeInTheDocument();
  });

  it("renders exactly 3 typing dots", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll(".animate-typing-pulse");
    expect(dots.length).toBe(3);
  });

  it("has correct animation delays for each dot", () => {
    const { container } = render(<TypingIndicator />);
    const dots = container.querySelectorAll(".animate-typing-pulse");
    expect(dots[0]).toHaveStyle({ animationDelay: "0ms" });
    expect(dots[1]).toHaveStyle({ animationDelay: "150ms" });
    expect(dots[2]).toHaveStyle({ animationDelay: "300ms" });
  });
});
