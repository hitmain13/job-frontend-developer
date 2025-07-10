"use client"
import { useEffect, useRef } from "react";
import { ChatHeader } from "./chat-header";
import { ChatMessages } from "./chat-messages";
import { ChatInput } from "./chat-input";
import { useChat } from "@/ui/hooks/use-chat";
import { useScrollToBottom } from "@/ui/hooks/use-scroll-bottom";

export const ChatContainer = () => {
  const inputRef = useRef<HTMLTextAreaElement>(null);
  const { state, actions } = useChat();
  const { endRef, scrollToBottom } = useScrollToBottom<HTMLDivElement | null>();

  useEffect(() => {
    actions.startConversation();
    inputRef.current?.focus();
  }, []);

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.isTyping]);

  const handleSendMessage = async (content: string) => {
    await actions.sendUserMessage(content);
  };

  const handleQuickReply = async (text: string, value: string) => {
    await actions.sendUserMessage(text, value);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <ChatHeader
        hasMessages={state.messages.length > 0}
        onReset={actions.resetConversation}
        onExportFull={() => actions.downloadConversation("conversation")}
        onExportDiagnosis={() => actions.downloadConversation("diagnosis")}
        hasDiagnosisExport={!!actions.exportDiagnosis()}
      />

      <ChatMessages
        state={state}
        onQuickReply={handleQuickReply}
        bottomRef={endRef}
      />

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={state.isTyping}
        placeholder="Digite sua resposta..."
        ref={inputRef}
      />
    </div>
  );
};
