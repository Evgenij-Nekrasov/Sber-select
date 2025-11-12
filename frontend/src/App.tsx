import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';

import {
  fetchOptions,
  sendSelectedOption,
  setSelectedOption,
} from '@/store/app';
import { Button, Message, Select } from '@/components';
import type { AppDispatch, RootState } from '@/store/store';
import type { Option } from '@/types';

import styles from './App.module.css';

const App = () => {
  const dispatch = useDispatch<AppDispatch>();
  const { options, selectedOption, message, loading, error } = useSelector(
    (state: RootState) => state.optionSlice,
  );

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
          placeholder="Выбрать опцию"
        />
        <Button onClick={handleSubmit} disabled={!selectedOption || loading}>
          Отправить
        </Button>
      </div>
      {message && <Message>{message}</Message>}
      {error && <Message>{error}</Message>}
    </div>
  );
};

export default App;
