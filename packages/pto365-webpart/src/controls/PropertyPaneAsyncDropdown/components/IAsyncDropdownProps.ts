

export interface IAsyncDropdownProps {
  label: string;
  loadOptions: () => Promise<string[]>;
  onChanged: (option: string, index?: number) => void;
  selectedKey: string | number;
  disabled: boolean;
  stateKey: string;
}