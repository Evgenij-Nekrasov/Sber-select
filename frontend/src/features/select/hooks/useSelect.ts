import { useSelector } from 'react-redux';
import { useState, useMemo, useRef, useCallback } from 'react';

import { useClickOutside } from '@/shared/hooks/select';
import { useSelectKeyboard } from '@/features/select';
import { useKeyboardNavigation } from '@/features/select/hooks/useKeyboardNavigation';
import { setSelectedOption } from '@/store/app';
import { useAppDispatch } from '@/store/hooks';
import type { Option } from '@/types';
import type { RootState } from '@/store/store';

interface UseSelectProps {
  options: Option[];
  onSelect: (option: Option) => void;
}

export function useSelect({ options, onSelect }: UseSelectProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [openDirection, setOpenDirection] = useState<'up' | 'down'>('down');
  const [searchTerm, setSearchTerm] = useState('');
  const [highlightedIndex, setHighlightedIndex] = useState(0);

  const dispatch = useAppDispatch();

  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);

  const filteredOptions = useMemo(
    () =>
      options.filter((option) =>
        option.name.toLowerCase().startsWith(searchTerm.toLowerCase()),
      ),
    [options, searchTerm],
  );

  const { selectedOption } = useSelector(
    (state: RootState) => state.optionSlice,
  );

  const resetState = () => {
    setSearchTerm('');
    setHighlightedIndex(0);
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

  const handleSelect = (option: Option) => {
    onSelect(option);
    closeDropdown();
  };

  const selectRef = useClickOutside<HTMLDivElement>(closeDropdown);
  useKeyboardNavigation({ isOpen, highlightedIndex, listRef });

  const openDropdown = useCallback(() => {
    if (!selectRef.current) return;

    const rect = selectRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 250 && spaceAbove > spaceBelow) {
      setOpenDirection('up');
    } else {
      setOpenDirection('down');
    }

    setIsOpen(true);
  }, [selectRef]);

  const { handleKeyDown } = useSelectKeyboard({
    isOpen,
    filteredOptions,
    highlightedIndex,
    setHighlightedIndex,
    onSelect: handleSelect,
    openDropdown,
    closeDropdown,
  });

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
    setHighlightedIndex(0);
    if (!isOpen) {
      openDropdown();
    }
    if (selectedOption) {
      dispatch(setSelectedOption(null));
    }
  };

  const handleClear = (e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    resetState();
    dispatch(setSelectedOption(null));
  };

  return {
    // Refs
    selectRef,
    inputRef,
    listRef,
    // State
    isOpen,
    openDirection,
    searchTerm,
    highlightedIndex,
    filteredOptions,
    // Actions
    toggleDropdown,
    setIsOpen,
    openDropdown,
    handleSelect,
    handleInputChange,
    handleKeyDown,
    handleClear,
    setHighlightedIndex,
  };
}
