import { type QuickReply } from "../../types/chat";

interface QuickReplyButtonsProps {
  replies: QuickReply[];
  onReply: (text: string, value: string) => void;
}

export const QuickReplyButtons = ({
  replies,
  onReply,
}: QuickReplyButtonsProps) => {
  return (
    <div className="flex flex-col gap-2">
      {replies.map((reply) => (
        <button
          key={reply.id}
          onClick={() => onReply(reply.text, reply.value)}
          className="
            px-4 py-3 text-sm text-left rounded-xl border border-border
            bg-surface hover:bg-surface-elevated transition-all duration-200
            hover:border-accent hover:shadow-sm hover:translate-y-[-1px]
            focus:outline-none focus:ring-2 focus:ring-accent focus:ring-opacity-50
          "
        >
          {reply.text}
        </button>
      ))}
    </div>
  );
};
