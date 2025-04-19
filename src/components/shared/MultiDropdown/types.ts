import { DropdownItem } from '../types';

export interface MultiDropdownProps<T = string> {
  label?: string;
  name?: string;
  items: DropdownItem<T>[];
  selcted?: T;
  value?: string;
  onChange: (val: string) => void;
}
