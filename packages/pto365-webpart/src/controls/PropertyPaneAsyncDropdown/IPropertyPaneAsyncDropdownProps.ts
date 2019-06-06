

export interface IPropertyPaneAsyncDropdownProps {
  label: string;
  loadOptions: () => Promise<string[]>;
  onPropertyChange: (propertyPath: string, newValue: any) => void;
  selectedKey: string | number;
  disabled?: boolean;
}