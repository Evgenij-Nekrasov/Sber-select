import { useEffect, type RefObject } from 'react';

interface UseKeyboardNavigationProps {
  isOpen: boolean;
  highlightedIndex: number;
  listRef: RefObject<HTMLDivElement | null>;
}

export function useKeyboardNavigation({
  isOpen,
  highlightedIndex,
  listRef,
}: UseKeyboardNavigationProps) {
  useEffect(() => {
    if (!isOpen || !listRef.current || highlightedIndex < 0) return;

    const list = listRef.current;
    let item: HTMLElement | undefined;

    const potentialItem = list.children[highlightedIndex];

    if (potentialItem instanceof HTMLElement) {
      item = potentialItem;
    }

    if (!item) return;

    const scrollTop = list.scrollTop;
    const itemTop = item.offsetTop;
    const itemBottom = itemTop + item.offsetHeight;
    const listBottom = scrollTop + list.offsetHeight;

    if (itemTop < scrollTop) {
      list.scrollTop = itemTop;
    } else if (itemBottom > listBottom) {
      list.scrollTop = itemBottom - list.offsetHeight;
    }
  }, [highlightedIndex, isOpen, listRef]);
}
