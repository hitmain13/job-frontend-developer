import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ChatEmptyState } from "./chat-empty-state";
import type { ConversationState } from "../../../types/chat";
import type { RefObject } from "react";

interface ChatMessagesProps {
  state: ConversationState;
  onQuickReply: (text: string, value: string) => void;
  bottomRef: RefObject<HTMLDivElement | null>;
}

export const ChatMessages = ({
  state,
  onQuickReply,
  bottomRef,
}: ChatMessagesProps) => (
  <div className="flex-1 overflow-y-auto">
    <div className="max-w-4xl mx-auto p-4 space-y-6">
      {state.messages.length === 0 && !state.isTyping && <ChatEmptyState />}

      {state.messages.map((message) => (
        <MessageBubble
          key={message.id}
          message={message}
          onQuickReply={onQuickReply}
          currentMessage={state}
        />
      ))}

      {state.isTyping && (
        <div className="flex justify-start">
          <TypingIndicator />
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  </div>
);
