import { useCallback, useMemo, useState } from 'react';

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

  const resetSearchState = useCallback(() => {
    setSearchTerm('');
    setHighlightedIndex(0);
  }, []);

  return {
    isOpen,
    setIsOpen,
    searchTerm,
    setSearchTerm,
    highlightedIndex,
    setHighlightedIndex,
    filteredOptions,
    resetSearchState,
  };
}

