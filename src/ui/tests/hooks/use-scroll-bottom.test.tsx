import { describe, it, expect, vi } from "vitest";
import { renderHook, act } from "@testing-library/react";
import { useScrollToBottom } from "@/ui/hooks/use-scroll-bottom";

describe("useScrollToBottom", () => {
  it("should initialize ref as null", () => {
    const { result } = renderHook(() => useScrollToBottom());
    expect(result.current.endRef.current).toBeNull();
  });

  it("should call scrollIntoView on scrollToBottom", () => {
    const { result } = renderHook(() => useScrollToBottom());

    result.current.endRef.current = mockElement as unknown as HTMLElement;

    act(() => {
      result.current.scrollToBottom();
    });

    expect(mockScrollIntoView).toHaveBeenCalledWith({ behavior: "smooth" });
  });
});

const mockScrollIntoView = vi.fn();
const mockElement = {
  scrollIntoView: mockScrollIntoView,
};
