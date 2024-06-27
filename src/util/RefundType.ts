export type Refund = {
  id: number;
  createdDate: Date;
  refundedDate: Date;
  firstName: string;
  lastName: string;
  value: number;
  orderNumber: string;
  description: string;
  isRefunded: boolean;
};
