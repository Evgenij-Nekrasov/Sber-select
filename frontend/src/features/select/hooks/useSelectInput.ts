import {
  useCallback,
  useMemo,
  type ChangeEvent,
  type KeyboardEvent,
  type MouseEvent,
} from 'react';

import type { Option } from '@/types';

interface UseSelectInputParams {
  selectedOption: Option | null;
  searchTerm: string;
  setSearchTerm: (value: string) => void;
  setHighlightedIndex: (value: number) => void;
  onClearSelection: () => void;
  openDropdown: () => void;
}

export function useSelectInput({
  selectedOption,
  searchTerm,
  setSearchTerm,
  setHighlightedIndex,
  onClearSelection,
  openDropdown,
}: UseSelectInputParams) {
  const displayValue = useMemo(() => {
    return searchTerm !== '' ? searchTerm : selectedOption?.name ?? '';
  }, [searchTerm, selectedOption]);

  const resetInputState = useCallback(() => {
    setSearchTerm('');
    setHighlightedIndex(0);
    onClearSelection();
  }, [setSearchTerm, setHighlightedIndex, onClearSelection]);

  const handleInputChange = useCallback(
    (event: ChangeEvent<HTMLInputElement>) => {
      const value = event.target.value;
      setSearchTerm(value);
      setHighlightedIndex(0);
      openDropdown();

      if (value === '' && selectedOption) {
        onClearSelection();
      }
    },
    [
      openDropdown,
      onClearSelection,
      selectedOption,
      setHighlightedIndex,
      setSearchTerm,
    ],
  );

  const handleClearInput = useCallback(
    (event?: MouseEvent | KeyboardEvent) => {
      if (event) {
        event.stopPropagation();
        event.preventDefault();
      }
      resetInputState();
    },
    [resetInputState],
  );

  return {
    displayValue,
    handleInputChange,
    handleClearInput,
  };
}

