import { useSelect } from '@/features/select';
import type { Option } from '@/types';
import styles from './Select.module.css';

interface SelectProps {
  options: Option[];
  selectedOption: Option | null;
  onSelect: (option: Option) => void;
  placeholder?: string;
}

export const Select = ({
  options,
  selectedOption,
  onSelect,
  placeholder,
}: SelectProps) => {
  const {
    selectRef,
    inputRef,
    listRef,
    isOpen,
    openDirection,
    searchTerm,
    highlightedIndex,
    filteredOptions,
    toggleDropdown,
    openDropdown,
    setIsOpen,
    handleSelect,
    handleInputChange,
    handleKeyDown,
    handleClear,
    setHighlightedIndex,
  } = useSelect({ options, onSelect });

  const displayValue = searchTerm || selectedOption?.name || '';

  return (
    <div
      className={styles.select}
      ref={selectRef}
      onBlur={(e) => {
        if (!selectRef.current?.contains(e.relatedTarget as Node)) {
          setIsOpen(false);
        }
      }}
    >
      <div
        className={`${styles.selectHeader} ${isOpen ? styles.open : ''}`}
        onClick={toggleDropdown}
        onKeyDown={handleKeyDown}
        tabIndex={0}
        role="combobox"
        aria-haspopup="listbox"
        aria-expanded={isOpen}
        aria-controls="select-listbox"
      >
        <input
          ref={inputRef}
          type="text"
          className={styles.searchInput}
          value={displayValue}
          onChange={handleInputChange}
          onFocus={openDropdown}
          placeholder={placeholder}
          aria-label="Search options"
          aria-autocomplete="list"
          aria-controls="select-listbox"
        />
        {(searchTerm || selectedOption) && (
          <button
            type="button"
            className={styles.clearButton}
            onClick={handleClear}
            aria-label="Clear search"
            tabIndex={-1}
          >
            ×
          </button>
        )}
        <span className={styles.arrow} aria-hidden="true">
          ▼
        </span>
      </div>

      {isOpen && filteredOptions.length > 0 && (
        <div
          id="select-listbox"
          className={`${styles.optionsList} ${styles[openDirection]}`}
          ref={listRef}
          role="listbox"
          aria-label="Options"
          tabIndex={-1}
        >
          {filteredOptions.map((option, index) => (
            <div
              key={option.value}
              className={`${styles.option} ${
                index === highlightedIndex ? styles.highlighted : ''
              } ${
                selectedOption?.value === option.value ? styles.selected : ''
              }`}
              onMouseDown={(e) => {
                e.preventDefault();
                handleSelect(option);
              }}
              onMouseEnter={() => setHighlightedIndex(index)}
              role="option"
              aria-selected={selectedOption?.value === option.value}
            >
              {option.name}
            </div>
          ))}
        </div>
      )}

      {isOpen && filteredOptions.length === 0 && (
        <div className={styles.optionsList}>
          <div className={styles.noResults}>No options found</div>
        </div>
      )}
    </div>
  );
};
