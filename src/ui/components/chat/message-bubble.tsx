import type { ChatMessage, ConversationState } from "../../../types/chat";
import { QuickReplyButtons } from "./quick-reply-buttons";
import { DiagnosisCard } from "./diagnosis-chat";
import { NextStepsCard } from "./next-steps-card";

interface MessageBubbleProps {
  message: ChatMessage;
  onQuickReply: (reply: string, value: string) => void;
  currentMessage: ConversationState;
}

export const MessageBubble = ({
  message,
  onQuickReply,
  currentMessage,
}: MessageBubbleProps) => {
  const isUser = message.type === "user";
  const lastQuickMessage = [...currentMessage.messages]
    .reverse()
    .find(
      (msg) => msg.quickReplies && msg.quickReplies.length > 0,
    )?.quickReplies;
  return (
    <div
      className={`flex ${isUser ? "justify-end" : "justify-start"} mb-6 animate-message-slide-in`}
    >
      <div className={`max-w-[85%] ${isUser ? "order-1" : "order-2"}`}>
        {!isUser && (
          <div className="flex items-center mb-2">
            <div className="w-8 h-8 rounded-full bg-gradient-purple-blue flex items-center justify-center text-white text-sm font-semibold mr-3">
              R
            </div>
            <span className="text-sm text-muted-foreground">Roberto</span>
          </div>
        )}

        <div
          className={`
            px-4 py-3 rounded-2xl text-sm leading-relaxed
            ${
              isUser
                ? "bg-gradient-purple-blue text-white rounded-br-sm"
                : "bg-chat-bot-bg text-foreground rounded-bl-sm border border-border"
            }
          `}
        >
          {message.content}
        </div>

        {message.diagnosis && (
          <div className="mt-4">
            <DiagnosisCard diagnosis={message.diagnosis} />
          </div>
        )}

        {message.nextSteps && (
          <div className="mt-4">
            <NextStepsCard
              nextSteps={message.nextSteps}
              onAction={onQuickReply}
            />
          </div>
        )}

        {message.quickReplies && message.quickReplies.length > 0 && (
          <div className="mt-4">
            <QuickReplyButtons
              replies={message.quickReplies}
              onReply={onQuickReply}
              disabled={lastQuickMessage !== message.quickReplies}
            />
          </div>
        )}

        <div className="text-xs text-muted-foreground mt-2 opacity-60">
          {message.timestamp.toLocaleTimeString("pt-BR", {
            hour: "2-digit",
            minute: "2-digit",
          })}
        </div>
      </div>
    </div>
  );
};
