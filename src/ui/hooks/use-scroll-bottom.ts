import { useRef } from "react";

export const useScrollToBottom = <T extends HTMLElement | null>() => {
  const endRef = useRef<T>(null);

  const scrollToBottom = () => {
    endRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  return { endRef, scrollToBottom };
};
