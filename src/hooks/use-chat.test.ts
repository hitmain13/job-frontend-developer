import { describe, it, expect, vi, beforeEach } from "vitest";
import { renderHook, act } from "@testing-library/react";
import * as convoModule from "../data/conversation";
import { useChat } from "./use-chat";
import type { ConversationResponse } from "../types/chat";

describe("useChat", () => {
  it("should initialize with default state", () => {
    const { result } = renderHook(() => useChat());
    expect(result.current.state.stage).toBe("welcome");
    expect(result.current.state.messages).toEqual([]);
  });

  it("should add user and bot messages when sendUserMessage is called", async () => {
    vi.spyOn(convoModule, "processUserResponse").mockReturnValue(
      mockResponse as unknown as ConversationResponse,
    );

    const { result } = renderHook(() => useChat());

    await act(async () => {
      await result.current.actions.sendUserMessage("Hello");
    });

    expect(result.current.state.messages).toHaveLength(2);
    expect(result.current.state.messages[0].type).toBe("user");
    expect(result.current.state.messages[1].type).toBe("bot");
  });

  it("should update user profile", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.actions.updateUserProfile({
        companySize: "large_company",
      });
    });

    expect(result.current.state.userProfile.companySize).toBe("large_company");
  });

  it("should reset conversation", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.actions.updateUserProfile({ companySize: "enterprise" });
      result.current.actions.resetConversation();
    });

    expect(result.current.state).toEqual(initialState);
  });

  it("should export conversation", () => {
    const { result } = renderHook(() => useChat());

    act(() => {
      result.current.actions.sendUserMessage("Test");
    });

    const exportData = result.current.actions.exportConversation();
    expect(Array.isArray(exportData)).toBe(true);
  });
});

beforeEach(() => {
  vi.resetAllMocks();
});

const mockResponse = {
  message: "Olá! Tudo certo.",
  type: "bot",
  nextStage: "qualification",
};

const initialState = {
  stage: "welcome",
  messages: [],
  userProfile: {},
  isTyping: false,
};
