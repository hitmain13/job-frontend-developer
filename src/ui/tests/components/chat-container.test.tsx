import { describe, it, expect, vi, beforeEach } from "vitest";
import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { ChatContainer } from "../../components/chat/chat-container";

describe("ChatContainer", () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it("renders header, messages and input", () => {
    mockUseChatReturn.state.messages = [];
    render(<ChatContainer />);

    expect(screen.getByText("Roberto")).toBeInTheDocument();
    expect(
      screen.getByPlaceholderText("Digite sua resposta..."),
    ).toBeInTheDocument();
  });

  it("focuses the input on mount", () => {
    render(<ChatContainer />);
    const input = screen.getByPlaceholderText("Digite sua resposta...");
    expect(document.activeElement).toBe(input);
  });

  it("calls startConversation on mount", () => {
    render(<ChatContainer />);
    expect(mockUseChatReturn.actions.startConversation).toHaveBeenCalled();
  });

  it("calls sendUserMessage when message is sent from input", async () => {
    render(<ChatContainer />);
    const input = screen.getByPlaceholderText("Digite sua resposta...");

    fireEvent.change(input, { target: { value: "Oi" } });
    fireEvent.keyDown(input, { key: "Enter" });

    await waitFor(() => {
      expect(mockUseChatReturn.actions.sendUserMessage).toHaveBeenCalledWith(
        "Oi",
      );
    });
  });
});

const mockSendUserMessage = vi.fn();
const mockStartConversation = vi.fn();
const mockResetConversation = vi.fn();
const mockDownloadConversation = vi.fn();
const mockExportDiagnosis = vi.fn().mockReturnValue(null);
const mockScrollToBottom = vi.fn();

const mockUseChatReturn = {
  state: {
    stage: "welcome",
    messages: [],
    userProfile: {},
    isTyping: false,
  },
  actions: {
    sendUserMessage: mockSendUserMessage,
    startConversation: mockStartConversation,
    resetConversation: mockResetConversation,
    downloadConversation: mockDownloadConversation,
    exportDiagnosis: mockExportDiagnosis,
  },
};

vi.mock("../../hooks/use-chat", () => ({
  useChat: () => mockUseChatReturn,
}));

vi.mock("../../hooks/use-scroll-bottom", () => ({
  useScrollToBottom: () => ({
    endRef: { current: null },
    scrollToBottom: mockScrollToBottom,
  }),
}));
