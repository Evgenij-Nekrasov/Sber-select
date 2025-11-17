import { useCallback, useState } from 'react';
import type { RefObject } from 'react';

type OpenDirection = 'up' | 'down';

interface UseDropdownPositionParams {
  selectRef: RefObject<HTMLDivElement | null>;
  isOpen: boolean;
  setIsOpen: (value: boolean) => void;
  resetSearchState: () => void;
}

export function useDropdownPosition({
  selectRef,
  isOpen,
  setIsOpen,
  resetSearchState,
}: UseDropdownPositionParams) {
  const [openDirection, setOpenDirection] = useState<OpenDirection>('down');

  const calculateDirection = useCallback(() => {
    if (!selectRef.current) return 'down';

    const rect = selectRef.current.getBoundingClientRect();
    const viewportHeight = window.innerHeight;

    const spaceBelow = viewportHeight - rect.bottom;
    const spaceAbove = rect.top;

    if (spaceBelow < 250 && spaceAbove > spaceBelow) {
      return 'up';
    }

    return 'down';
  }, [selectRef]);

  const openDropdown = useCallback(() => {
    const direction = calculateDirection();
    setOpenDirection(direction);
    setIsOpen(true);
  }, [calculateDirection, setIsOpen]);

  const closeDropdown = useCallback(() => {
    setIsOpen(false);
    resetSearchState();
  }, [setIsOpen, resetSearchState]);

  const toggleDropdown = useCallback(() => {
    if (isOpen) {
      closeDropdown();
    } else {
      openDropdown();
    }
  }, [isOpen, closeDropdown, openDropdown]);

  return {
    openDirection,
    openDropdown,
    closeDropdown,
    toggleDropdown,
  };
}

