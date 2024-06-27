import { Company } from "./CompanyType";

export enum PaymentType {
  Gotówka,
  Przelew,
  Przedpłata,
}

export enum InvoiceType {
  Handlowe,
  Niehandlowe,
}

export type Invoice = {
  id: number;
  company: Company;
  invoiceNumber: string;
  vatValue: number;
  bruttoValue: number;
  invoiceType: InvoiceType;
  paymentType: PaymentType;
  paymentDeadlineDate: Date;
  paymentDoneDate: Date | null;
  createdAt: Date;
  isPaid: boolean;
};

export type InvoicesPageResponse = {
  results: Invoice[];
  currentPage: number;
  pageCount: number;
  pageSize: number;
  rowCount: number;
  firstRowOnPage: number;
  lastRowOnPage: number;
};

export type InvoiceSearchParams = {
  invoiceNumber: string;
  companyId: number;
  paymentType: number;
  from: string;
  to: string;
  isPaid: boolean;
  pageNumber: number;
  pageSize: number;
};
