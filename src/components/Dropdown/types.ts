export interface DropdownProps {
  label?: string;
  items: string[];
  selected?: string;
  onSelect: (value: string) => void;
}
