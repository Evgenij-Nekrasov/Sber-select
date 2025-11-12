export interface Option {
  name: string;
  value: string;
}

export interface AppState {
  options: Option[];
  selectedOption: Option | null;
  message: string;
  loading: boolean;
  error: string | null;
}
