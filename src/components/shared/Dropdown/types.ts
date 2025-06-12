export interface DropdownProps<T = string> {
  label?: string;
  name?: string;
  items: DropdownItem<T>[];
  selected?: T;
  onSelect: (value: T) => void;
}

export interface DropdownItem<T = string> {
  name: string;
  value: T;
}
