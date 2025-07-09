import { useState, useCallback } from "react";
import type {
  ConversationState,
  ChatMessage,
  ConversationStage,
  UserProfile,
} from "../../types/chat";
import { processUserResponse } from "../../data/conversation";

const initialState: ConversationState = {
  stage: "welcome",
  messages: [],
  userProfile: {},
  isTyping: false,
};

export const useChat = () => {
  const [state, setState] = useState<ConversationState>(initialState);

  console.log("state:", state);

  const addMessage = useCallback(
    (message: Omit<ChatMessage, "id" | "timestamp">) => {
      const newMessage: ChatMessage = {
        ...message,
        id: Math.random().toString(36).substring(2, 9),
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

  const sendUserMessage = useCallback(
    async (content: string, quickReplyValue?: string) => {
      addMessage({
        type: "user",
        content,
      });

      setTyping(true);

      await new Promise((resolve) =>
        setTimeout(resolve, 1000 + Math.random() * 1000),
      );

      const response = processUserResponse(
        state.stage,
        quickReplyValue || content.toLowerCase(),
        state.userProfile,
      );

      const botMessage = addMessage({
        type: "bot",
        content: response.message,
        quickReplies: response.quickReplies,
        diagnosis: response.diagnosis,
        nextSteps: response.nextSteps,
      });

      if (response.nextStage) {
        setStage(response.nextStage);
      }

      setTyping(false);

      return botMessage;
    },
    [state.stage, state.userProfile, addMessage, setTyping, setStage],
  );

  const resetConversation = useCallback(() => {
    setState(initialState);
  }, []);

  const startConversation = useCallback(async () => {
    resetConversation();

    setTyping(false);
  }, [resetConversation, setTyping]);

  const exportConversation = useCallback(() => {
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

  const downloadConversation = useCallback(
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
      sendUserMessage,
      startConversation,
      resetConversation,
      updateUserProfile,
      exportConversation,
      exportDiagnosis,
      downloadConversation,
    },
  };
};
