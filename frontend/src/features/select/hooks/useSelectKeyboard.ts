import { type KeyboardEvent } from 'react';
import type { Option } from '@/types';

interface UseSelectKeyboardProps {
  isOpen: boolean;
  filteredOptions: Option[];
  highlightedIndex: number;
  setHighlightedIndex: (index: number | ((prev: number) => number)) => void;
  onSelect: (option: Option) => void;
  openDropdown: () => void;
  closeDropdown: () => void;
}

export function useSelectKeyboard({
  isOpen,
  filteredOptions,
  highlightedIndex,
  setHighlightedIndex,
  onSelect,
  openDropdown,
  closeDropdown,
}: UseSelectKeyboardProps) {
  const handleKeyDown = (e: KeyboardEvent) => {
    switch (e.key) {
      case 'ArrowDown':
        e.preventDefault();
        setHighlightedIndex((prev) =>
          prev < filteredOptions.length - 1 ? prev + 1 : prev,
        );
        break;

      case 'ArrowUp':
        e.preventDefault();
        setHighlightedIndex((prev) => (prev > 0 ? prev - 1 : 0));
        break;

      case 'Enter':
        e.preventDefault();
        if (isOpen && filteredOptions[highlightedIndex]) {
          onSelect(filteredOptions[highlightedIndex]);
        } else {
          openDropdown();
        }
        break;

      case 'Escape':
        e.preventDefault();
        closeDropdown();
        break;

      case 'Home':
        e.preventDefault();
        setHighlightedIndex(0);
        break;

      case 'End':
        e.preventDefault();
        setHighlightedIndex(filteredOptions.length - 1);
        break;
    }
  };

  return { handleKeyDown };
}
