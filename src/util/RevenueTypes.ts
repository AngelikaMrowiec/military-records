export type MonthlyRevenue = {
  yearMonth: Date;
  militaryZone: number;
  sklepikMysliwski: number;
  allegro: number;
  stationary: number;
  others: number;
  ot: number;
  sum: number;
};

export type YearlyRevenue = {
  year: number;
  militaryZone: number;
  sklepikMysliwski: number;
  allegro: number;
  stationary: number;
  others: number;
  ot: number;
  sum: number;
};

export type DailyRevenue = {
  date: Date;
  value: number;
};

export type DailyRevenueDated = {
  day: number,
  january: number;
  february: number;
  march: number;
  april: number;
  may: number;
  june: number;
  july: number;
  august: number;
  september: number;
  october: number;
  november: number;
  december: number;
};
