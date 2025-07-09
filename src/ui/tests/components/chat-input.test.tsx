import { ChatInput } from "@/ui/components";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("ChatInput", () => {
  it("renders a textarea with placeholder", () => {
    render(<ChatInput onSendMessage={() => {}} />);

    const textarea = screen.getByPlaceholderText("Digite sua mensagem...");
    expect(textarea).toBeInTheDocument();
  });

  it("allows typing in the textarea", () => {
    render(<ChatInput onSendMessage={() => {}} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Hello world" } });

    expect(textarea).toHaveValue("Hello world");
  });

  it("calls onSendMessage when clicking the send button", () => {
    const mockSend = vi.fn();
    render(<ChatInput onSendMessage={mockSend} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Test message" } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith("Test message");
    expect(textarea).toHaveValue("");
  });

  it("does not send empty or whitespace-only messages", () => {
    const mockSend = vi.fn();
    render(<ChatInput onSendMessage={mockSend} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "   " } });

    const button = screen.getByRole("button");
    fireEvent.click(button);

    expect(mockSend).not.toHaveBeenCalled();
  });

  it("sends message on Enter key press (without Shift)", () => {
    const mockSend = vi.fn();
    render(<ChatInput onSendMessage={mockSend} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "Sending with enter" } });

    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: false });

    expect(mockSend).toHaveBeenCalledTimes(1);
    expect(mockSend).toHaveBeenCalledWith("Sending with enter");
  });

  it("adds a new line with Shift+Enter", () => {
    render(<ChatInput onSendMessage={() => {}} />);

    const textarea = screen.getByRole("textbox");
    fireEvent.change(textarea, { target: { value: "First line" } });
    fireEvent.keyDown(textarea, { key: "Enter", shiftKey: true });

    expect(textarea).toHaveValue("First line");
  });

  it("disables textarea and button when `disabled` is true", () => {
    render(<ChatInput onSendMessage={() => {}} disabled />);

    const textarea = screen.getByRole("textbox");
    const button = screen.getByRole("button");

    expect(textarea).toBeDisabled();
    expect(button).toBeDisabled();
  });

  it("respects custom placeholder text", () => {
    render(
      <ChatInput onSendMessage={() => {}} placeholder="Type something..." />,
    );

    expect(
      screen.getByPlaceholderText("Type something..."),
    ).toBeInTheDocument();
  });
});
