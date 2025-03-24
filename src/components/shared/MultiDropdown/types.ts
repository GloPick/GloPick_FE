export interface MultiDropdownProps {
  label?: string;
  items: string[];
  value?: string;
  onChange: (val: string) => void;
}
