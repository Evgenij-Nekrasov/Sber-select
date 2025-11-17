import { useRef } from 'react';

import { useSelectKeyboard } from '@/features/select';
import { useKeyboardNavigation } from '@/features/select/hooks/useKeyboardNavigation';
import { useClickOutside } from '@/shared/hooks';
import type { Option } from '@/types';

import { useDropdownPosition } from './useDropdownPosition';
import { useSelectInput } from './useSelectInput';
import { useSelectState } from './useSelectState';

interface UseSelectProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
  onClearSelection: () => void;
}

export function useSelect({
  options,
  selectedOption,
  onSelect,
  onClearSelection,
}: UseSelectProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const selectRef = useRef<HTMLDivElement>(null);

  const {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    resetSearchState,
  } = useSelectState({ options });

  const {
    openDirection,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  } = useDropdownPosition({
    selectRef,
    isOpen,
    setIsOpen,
    resetSearchState,
  });

  useClickOutside(closeDropdown, selectRef);
  const handleSelect = (option: Option) => {
    onSelect(option);
    closeDropdown();
  };

  useKeyboardNavigation({ isOpen, highlightedIndex, listRef });

  const { handleKeyDown } = useSelectKeyboard({
    isOpen,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    onSelect: handleSelect,
    openDropdown,
    closeDropdown,
  });

  const { displayValue, handleInputChange, handleClearInput } = useSelectInput({
    selectedOption,
    searchTerm,
    setSearchTerm,
    setHighlightedIndex,
    onClearSelection,
    openDropdown,
  });

  return {
    selectRef,
    inputRef,
    listRef,
    isOpen,
    openDirection,
    searchTerm,
    highlightedIndex,
    filteredOptions,
    displayValue,
    toggleDropdown,
    setIsOpen,
    openDropdown,
    handleSelect,
    handleInputChange,
    handleKeyDown,
    handleClear: handleClearInput,
    setHighlightedIndex,
  };
}
