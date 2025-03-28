export interface MultiSelectInputProps {
  label?: string;
  selected: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  className?: string;
}
