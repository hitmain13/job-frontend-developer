import type { QuickReply } from "@/types/chat";
import { QuickReplyButtons } from "@/ui/components";
import { render, screen, fireEvent } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";

describe("QuickReplyButtons", () => {
  const mockReplies: QuickReply[] = [
    { id: "1", text: "Sim", value: "yes" },
    { id: "2", text: "Não", value: "no" },
  ];

  it("renderiza todos os botões de respostas rápidas", () => {
    const mockOnReply = vi.fn();

    render(<QuickReplyButtons replies={mockReplies} onReply={mockOnReply} />);

    mockReplies.forEach((reply) => {
      expect(
        screen.getByRole("button", { name: reply.text }),
      ).toBeInTheDocument();
    });
  });

  it("chama onReply com os parâmetros corretos ao clicar em um botão", () => {
    const mockOnReply = vi.fn();

    render(<QuickReplyButtons replies={mockReplies} onReply={mockOnReply} />);

    const button = screen.getByRole("button", { name: "Sim" });
    fireEvent.click(button);

    expect(mockOnReply).toHaveBeenCalledTimes(1);
    expect(mockOnReply).toHaveBeenCalledWith("Sim", "yes");
  });
});
