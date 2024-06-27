export type MonthlyExpense = {
  id: number;
  createDate: Date;
  category: {
    id: number;
    name: string;
  };
  value: number;
};

export type Category = {
  id: number;
  name: string;
}