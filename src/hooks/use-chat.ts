import { useState, useCallback } from "react";
import type {
  ConversationState,
  ChatMessage,
  ConversationStage,
  UserProfile,
} from "../types/chat";
import { getWelcomeMessage } from "../data/conversation";

const initialState: ConversationState = {
  stage: "welcome",
  messages: [],
  userProfile: {},
  isTyping: false,
};

export const useChat = () => {
  const [state, setState] = useState<ConversationState>(initialState);

  const addMessage = useCallback(
    (message: Omit<ChatMessage, "id" | "timestamp">) => {
      const newMessage: ChatMessage = {
        ...message,
        id: Math.random().toString(36).substr(2, 9),
        timestamp: new Date(),
      };

      setState((prev) => ({
        ...prev,
        messages: [...prev.messages, newMessage],
      }));

      return newMessage;
    },
    [],
  );

  const updateUserProfile = useCallback((updates: Partial<UserProfile>) => {
    setState((prev) => ({
      ...prev,
      userProfile: { ...prev.userProfile, ...updates },
    }));
  }, []);

  const setTyping = useCallback((isTyping: boolean) => {
    setState((prev) => ({ ...prev, isTyping }));
  }, []);

  const setStage = useCallback((stage: ConversationStage) => {
    setState((prev) => ({ ...prev, stage }));
  }, []);

  const startConversation = useCallback(async () => {
    if (state.messages.length > 0) return;

    setTyping(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    const welcomeResponse = getWelcomeMessage();
    addMessage({
      type: "bot",
      content: welcomeResponse.message,
      quickReplies: welcomeResponse.quickReplies,
    });

    if (welcomeResponse.nextStage) {
      setStage(welcomeResponse.nextStage);
    }

    setTyping(false);
  }, [state.messages.length, addMessage, setStage, setTyping]);

  const resetConversation = useCallback(() => {
    setState(initialState);
  }, []);

  const exportConversation = useCallback(() => {
    // Export messages in the requested format
    const exportData = state.messages.map((message) => ({
      id: `${Date.now()}-${message.type}`,
      text: message.content,
      sender: message.type === "user" ? "user" : "bot",
      ...(message.diagnosis && { diagnosis: message.diagnosis }),
      ...(message.nextSteps && { nextSteps: message.nextSteps }),
    }));

    return exportData;
  }, [state.messages]);

  const exportDiagnosis = useCallback(() => {
    // Find the message with diagnosis
    const diagnosisMessage = state.messages.find(
      (msg) => msg.diagnosis && msg.nextSteps,
    );

    if (!diagnosisMessage) return null;

    return {
      message: diagnosisMessage.content,
      type: "result",
      diagnosis: diagnosisMessage.diagnosis,
      nextSteps: diagnosisMessage.nextSteps,
    };
  }, [state.messages]);

  const downloadExport = useCallback(
    (type: "conversation" | "diagnosis") => {
      const data =
        type === "conversation" ? exportConversation() : exportDiagnosis();
      if (!data) return;

      const blob = new Blob([JSON.stringify(data, null, 2)], {
        type: "application/json",
      });
      const url = URL.createObjectURL(blob);
      const a = document.createElement("a");
      a.href = url;
      a.download = `${type}-${new Date().toISOString().split("T")[0]}.json`;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
    },
    [exportConversation, exportDiagnosis],
  );

  return {
    state,
    actions: {
      startConversation,
      resetConversation,
      updateUserProfile,
      exportConversation,
      exportDiagnosis,
      downloadExport,
    },
  };
};
