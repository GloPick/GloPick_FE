import { DropdownItem } from '../types';

export interface DropdownProps<T = string> {
  label?: string;
  name?: string;
  items: DropdownItem<T>[];
  selected?: T;
  onSelect: (value: T) => void;
}
