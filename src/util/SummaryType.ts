 export type YearlySummary = {
    difference: number;
    commodities: number;
    additional: number;
    expenses: number;
    income: number;
    year: number;
  }

  export type MonthlySummary = {
    difference: number;
    commodities: number;
    additional: number;
    expenses: number;
    income: number;
    yearMonth: Date;
  }