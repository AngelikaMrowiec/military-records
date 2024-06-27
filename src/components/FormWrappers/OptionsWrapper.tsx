import { ReactNode } from "react";
import { PaymentType } from "../../util/InvoiceType";

type Props = {
  children: ReactNode;
  required? : boolean;
};

export default function OptionsWrapper({ children, required}: Props) {
  return (
    <div className="w-full mb-6">
      <label
        htmlFor="paymentType"
        className="block mb-2 text-xl font-bold text-white"
      >
        {children}
      </label>
      <select
        required = {required}
        id="paymentType"
        name="paymentType"
        className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
      >
        {!required && <option value={undefined}></option>}
        <option value={PaymentType.Gotówka}>Gotówka</option>
        <option value={PaymentType.Przelew}>Przelew</option>
        <option value={PaymentType.Przedpłata}>Przedpłata</option>
      </select>
    </div>
  );
}
