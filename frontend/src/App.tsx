import { useCallback, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchOptions,
  sendSelectedOption,
  setSelectedOption,
  clearMessage,
  clearError,
} from '@/store/app';
import { Button, Message, Select } from '@/components';
import type { AppDispatch, RootState } from '@/store/store';
import type { Option } from '@/types';
import { useAutoDismissMessages } from '@/shared/hooks';

import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { options, selectedOption, message, loading, error } = useSelector(
    (state: RootState) => state.optionSlice,
  );

  const handleClearMessage = useCallback(() => {
    dispatch(clearMessage());
  }, [dispatch]);

  const handleClearError = useCallback(() => {
    dispatch(clearError());
  }, [dispatch]);

  const { dismissMessage, dismissError } = useAutoDismissMessages({
    message,
    error,
    clearMessage: handleClearMessage,
    clearError: handleClearError,
  });

  useEffect(() => {
    dispatch(fetchOptions());
  }, [dispatch]);

  const handleSelect = (option: Option) => {
    dispatch(setSelectedOption(option));
  };

  const handleSubmit = () => {
    if (selectedOption) {
      dispatch(sendSelectedOption(selectedOption.value));
    }
  };

  return (
    <div className="app">
      <div className={styles.container}>
        <Select
          options={options}
          selectedOption={selectedOption}
          onSelect={handleSelect}
          onClearSelection={() => dispatch(setSelectedOption(null))}
          placeholder="Выбрать опцию"
        />
        <Button onClick={handleSubmit} disabled={!selectedOption || loading}>
          Отправить
        </Button>
      </div>
      {message && <Message onClose={dismissMessage}>{message}</Message>}
      {error && <Message onClose={dismissError}>{error}</Message>}
    </div>
  );
};

export default App;
