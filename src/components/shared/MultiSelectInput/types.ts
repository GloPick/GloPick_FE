export interface MultiSelectInputProps {
  label?: string;
  selected: string[];
  onChange: (items: string[]) => void;
  placeholder?: string;
  error?: string;
  className?: string;
}
