import { render, screen } from "@testing-library/react";
import { ChatMessages } from "./chat-messages";
import { describe, expect, it, vi } from "vitest";
import type { ConversationState, ChatMessage } from "../../types/chat";

describe("ChatMessages", () => {
  it("renders ChatEmptyState when there are no messages and isTyping is false", () => {
    render(
      <ChatMessages
        state={baseState}
        onQuickReply={vi.fn()}
        bottomRef={{ current: null }}
      />,
    );

    expect(
      screen.getByRole("heading", { level: 2, name: /Bem-vindo à Dolado!/i }),
    ).toBeInTheDocument();
  });

  it("renders a user message", () => {
    const stateWithMessage: ConversationState = {
      ...baseState,
      messages: [createMockMessage({ content: "Hello, bot!" })],
    };

    render(
      <ChatMessages
        state={stateWithMessage}
        onQuickReply={vi.fn()}
        bottomRef={{ current: null }}
      />,
    );

    expect(screen.getByText("Hello, bot!")).toBeInTheDocument();
  });

  it("renders TypingIndicator when isTyping is true", () => {
    const typingState: ConversationState = {
      ...baseState,
      isTyping: true,
    };

    render(
      <ChatMessages
        state={typingState}
        onQuickReply={vi.fn()}
        bottomRef={{ current: null }}
      />,
    );

    expect(screen.getByText(/Roberto está digitando.../i)).toBeInTheDocument();
  });

  it("renders messages and TypingIndicator at the same time", () => {
    const state: ConversationState = {
      ...baseState,
      messages: [createMockMessage({ content: "Message with typing" })],
      isTyping: true,
    };

    render(
      <ChatMessages
        state={state}
        onQuickReply={vi.fn()}
        bottomRef={{ current: null }}
      />,
    );

    expect(screen.getByText("Message with typing")).toBeInTheDocument();
    expect(screen.getByText(/Roberto está digitando.../i)).toBeInTheDocument();
  });
});

const createMockMessage = (
  overrides: Partial<ChatMessage> = {},
): ChatMessage => ({
  id: "msg-1",
  type: "user",
  content: "Mensagem de teste",
  timestamp: new Date(),
  ...overrides,
});

const baseState: ConversationState = {
  stage: "welcome",
  messages: [],
  userProfile: {},
  isTyping: false,
};
