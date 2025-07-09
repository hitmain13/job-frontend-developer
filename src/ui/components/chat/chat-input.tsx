import { useState, type KeyboardEvent, type RefObject } from "react";

interface ChatInputProps {
  onSendMessage: (message: string) => void;
  disabled?: boolean;
  placeholder?: string;
  ref?: RefObject<HTMLTextAreaElement | null>;
}

export const ChatInput = ({
  onSendMessage,
  disabled = false,
  placeholder = "Digite sua mensagem...",
  ...props
}: ChatInputProps) => {
  const [message, setMessage] = useState(
    "Oi! 👋 Eu gostaria de entender mais em como ampliar os canais digitais da minha companhia!",
  );

  const handleSend = () => {
    if (message.trim() && !disabled) {
      onSendMessage(message.trim());
      setMessage("");
    }
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLTextAreaElement>) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      handleSend();
    }
  };

  return (
    <div className="border-t border-border bg-background p-4">
      <div className="flex space-x-3 max-w-4xl mx-auto">
        <div className="flex-1 flex items-center">
          <textarea
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={handleKeyPress}
            placeholder={placeholder}
            disabled={disabled}
            rows={1}
            className="
              w-full px-4 py-3 rounded-xl resize-none
              bg-chat-input-bg border border-border
              text-foreground placeholder-muted-foreground focus:ring-2
              disabled:opacity-50 disabled:cursor-not-allowed
              transition-all duration-200
            "
            style={{
              minHeight: "48px",
              maxHeight: "120px",
            }}
            {...props}
          />
        </div>

        <button
          onClick={handleSend}
          disabled={!message.trim() || disabled}
          className="
            w-12 h-12 rounded-xl flex items-center justify-center
            bg-gradient-purple-blue text-white
            hover:bg-gradient-blue-pink transition-all duration-200
            disabled:opacity-50 disabled:cursor-not-allowed
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
            hover:shadow-lg hover:translate-y-[-1px]
          "
        >
          <svg
            className="w-5 h-5 transform rotate-90"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth={2}
              d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8"
            />
          </svg>
        </button>
      </div>
    </div>
  );
};
