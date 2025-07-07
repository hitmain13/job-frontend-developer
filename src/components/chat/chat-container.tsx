import { useEffect, useRef } from "react";
import { useChat } from "../../hooks/use-chat";
import { MessageBubble } from "./message-bubble";
import { TypingIndicator } from "./typing-indicator";
import { ChatInput } from "./chat-input";

export const ChatContainer = () => {
  const { state, actions } = useChat();
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [state.messages, state.isTyping]);

  useEffect(() => {
    actions.startConversation();
  }, [actions]);

  const handleSendMessage = (content: string) => {
    console.log("Mensagem enviada!", content);
  };

  const handleQuickReply = async (text: string, value: string) => {
    console.log("Resposta rápida, teste!", text, value);
  };

  return (
    <div className="flex flex-col h-screen bg-background">
      <div className="bg-surface border-b border-border p-4 flex-shrink-0">
        <div className="max-w-4xl mx-auto flex items-center justify-between">
          <div className="flex items-center space-x-4">
            <div className="w-10 h-10 rounded-full bg-gradient-purple-blue flex items-center justify-center text-white font-semibold">
              R
            </div>
            <div>
              <h1 className="text-lg font-semibold text-foreground">Roberto</h1>
              <p className="text-sm text-muted-foreground">
                Especialista em Marketplaces - Dolado, sempre do seu lado
              </p>
            </div>
          </div>

          <div className="flex items-center space-x-2">
            {state.messages.length > 0 && (
              <>
                <button
                  onClick={() => actions.downloadExport("conversation")}
                  className="
                    px-3 py-2 text-sm rounded-lg border border-border
                    bg-surface hover:bg-surface-elevated transition-colors
                    text-muted-foreground hover:text-foreground
                    focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
                    flex items-center space-x-2
                  "
                  title="Exportar conversa completa"
                >
                  <svg
                    className="w-4 h-4"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke="currentColor"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 10v6m0 0l-3-3m3 3l3-3m2 8H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z"
                    />
                  </svg>
                  <span className="hidden sm:inline">Conversa</span>
                </button>

                {actions.exportDiagnosis() && (
                  <button
                    onClick={() => actions.downloadExport("diagnosis")}
                    className="
                      px-3 py-2 text-sm rounded-lg border border-border
                      bg-surface hover:bg-surface-elevated transition-colors
                      text-muted-foreground hover:text-foreground
                      focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
                      flex items-center space-x-2
                    "
                    title="Exportar diagnóstico"
                  >
                    <svg
                      className="w-4 h-4"
                      fill="none"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                      />
                    </svg>
                    <span className="hidden sm:inline">Diagnóstico</span>
                  </button>
                )}
              </>
            )}

            <button
              onClick={actions.resetConversation}
              className="
                px-4 py-2 text-sm rounded-lg border border-border
                bg-surface hover:bg-surface-elevated transition-colors
                text-muted-foreground hover:text-foreground
                focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
              "
            >
              Nova Conversa
            </button>
          </div>
        </div>
      </div>

      <div className="flex-1 overflow-y-auto">
        <div className="max-w-4xl mx-auto p-4 space-y-6">
          {state.messages.length === 0 && !state.isTyping && (
            <div className="text-center py-12">
              <div className="w-16 h-16 mx-auto mb-4 rounded-full bg-gradient-purple-blue flex items-center justify-center text-white text-xl font-semibold">
                R
              </div>
              <h2 className="text-xl font-semibold gradient-text mb-2">
                Bem-vindo ao Consultor Digital
              </h2>
              <p className="text-muted-foreground max-w-md mx-auto leading-relaxed">
                Descubra como expandir para marketplaces sem conflitar com seus
                canais tradicionais
              </p>
            </div>
          )}

          {state.messages.map((message) => (
            <MessageBubble
              key={message.id}
              message={message}
              onQuickReply={handleQuickReply}
            />
          ))}

          {state.isTyping && (
            <div className="flex justify-start">
              <TypingIndicator />
            </div>
          )}

          <div ref={messagesEndRef} />
        </div>
      </div>

      <ChatInput
        onSendMessage={handleSendMessage}
        disabled={state.isTyping}
        placeholder="Digite sua resposta..."
      />
    </div>
  );
};
