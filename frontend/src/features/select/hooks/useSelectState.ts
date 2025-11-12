import { useState, useMemo } from 'react';
import type { Option } from '@/types';

interface UseSelectStateProps {
  options: Option[];
}

export function useSelectState({ options }: UseSelectStateProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  const resetState = () => {
    setSearchTerm('');
    setHighlightedIndex(0);
  };

  const openDropdown = () => {
    setIsOpen(true);
  };

  const closeDropdown = () => {
    setIsOpen(false);
    resetState();
  };

  const toggleDropdown = () => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  };

  return {
    isOpen,
    searchTerm,
    highlightedIndex,
    filteredOptions,
    setSearchTerm,
    setHighlightedIndex,
    openDropdown,
    closeDropdown,
    toggleDropdown,
    resetState,
  };
}
