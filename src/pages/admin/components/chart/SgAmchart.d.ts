export interface AxisValues {
  leftAxis: string;
  rightAxis?: string | undefined;
}

export interface ServiceData {
  name: string;
  count: string;
  totalAmount: number;
}

export interface ExpenseData {
  name: string;
  count: string;
  totalAmount: number;
}

export interface CombinedData {
  date: string;
  serviceCount: string;
  serviceTotalAmount: number;
  expenseCount: string;
  expenseTotalAmount: number;
}

export interface InputData {
  dataService: ServiceData[];
  dataExpense: ExpenseData[];
}
