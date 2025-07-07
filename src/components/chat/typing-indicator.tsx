export const TypingIndicator = () => {
  return (
    <div className="flex items-center space-x-2 p-4 bg-chat-bot-bg rounded-2xl rounded-bl-sm max-w-[200px] animate-message-slide-in">
      <div className="flex space-x-1">
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse"
          style={{ animationDelay: "0ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse"
          style={{ animationDelay: "150ms" }}
        />
        <div
          className="w-2 h-2 bg-muted-foreground rounded-full animate-typing-pulse"
          style={{ animationDelay: "300ms" }}
        />
      </div>
      <span className="text-sm text-muted-foreground">
        Roberto está digitando...
      </span>
    </div>
  );
};
