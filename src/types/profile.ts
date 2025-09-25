export type PriorityKey = 'language' | 'salary' | 'job';

export interface JobField {
  code: string;
  nameKo: string;
  nameEn: string;
}

export interface Priorities {
  first: PriorityKey;
  second: PriorityKey;
  third: PriorityKey;
}

export interface ProfileFormData {
  language: string;
  expectedSalary: number;
  jobField: JobField;
  priorities: Priorities;
}
