import { render } from "@testing-library/react";
import { describe, it, expect, vi } from "vitest";
import { QuickReplyButtons } from "./quick-reply-buttons";
import type { QuickReply } from "../../types/chat";

describe("QuickReplyButtons", () => {
  const mockReplies: QuickReply[] = [
    { id: "1", text: "Sim", value: "yes" },
    { id: "2", text: "Não", value: "no" },
  ];

  it("renderiza todos os botões de respostas rápidas", () => {
    const mockOnReply = vi.fn();

    const { getByText } = render(
      <QuickReplyButtons replies={mockReplies} onReply={mockOnReply} />,
    );

    mockReplies.forEach((reply) => {
      expect(getByText(reply.text)).toBeInTheDocument();
    });
  });

  it("chama onReply com os parâmetros corretos ao clicar em um botão", () => {
    const mockOnReply = vi.fn();

    const { getByText, fireEvent } = render(
      <QuickReplyButtons replies={mockReplies} onReply={mockOnReply} />,
    );

    const button = getByText("Sim");
    fireEvent.click(button);

    expect(mockOnReply).toHaveBeenCalledTimes(1);
    expect(mockOnReply).toHaveBeenCalledWith("Sim", "yes");
  });
});
