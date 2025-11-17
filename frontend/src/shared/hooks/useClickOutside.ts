import { useEffect, useRef, type RefObject } from 'react';

export function useClickOutside<T extends HTMLElement>(
  handler: () => void,
  externalRef?: RefObject<T | null>,
): RefObject<T | null> {
  const internalRef = useRef<T>(null);
  const targetRef = externalRef ?? internalRef;

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (
        targetRef.current &&
        !targetRef.current.contains(event.target as Node)
      ) {
        handler();
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [handler, targetRef]);

  return targetRef;
}
