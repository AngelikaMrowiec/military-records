import { Dispatch, SetStateAction } from "react";
import Modal from "../WrappingContainers/Modal";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";
import OptionsWrapper from "../FormWrappers/OptionsWrapper";
import { Company } from "../../util/CompanyType";
import { InvoiceType } from "../../util/InvoiceType";

type Props = {
  addModalIsOpen: boolean;
  setAddModalIsOpen: Dispatch<SetStateAction<boolean>>;
  companies: Company[];
};

export default function InvoiceAddForm({
  addModalIsOpen,
  setAddModalIsOpen,
  companies,
}: Props) {
  const style = {
    height: "48rem",
    width: "36rem",
  };

  return (
    <Modal open={addModalIsOpen} onClose={() => setAddModalIsOpen(false)}>
      <FormWrapper
        style={style}
        method="post"
        onSubmitFinish={() => setAddModalIsOpen(false)}
      >
        <div className="w-full mb-6">
          <label
            htmlFor="companyId"
            className="block mb-2 text-xl font-bold text-white"
          >
            Firma
          </label>
          <select
            required
            id="companyId"
            name="companyId"
            className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
          >
            {companies.map((company) => (
              <option key={company.id} value={company.id}>
                {company.name}
                {company.bankAccountNumber &&
                  `(${company.bankAccountNumber.substring(0, 4)})`}
              </option>
            ))}
          </select>
        </div>
        <InputAndLabelWrapper
          htmlFor="invoiceNumber"
          id="invoiceNumber"
          type="string"
          name="invoiceNumber"
          required
        >
          Numer faktury
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="vatValue"
          id="vatValue"
          type="number"
          name="vatValue"
          required
        >
          Vat
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="bruttoValue"
          id="bruttoValue"
          type="number"
          name="bruttoValue"
          required
        >
          Brutto
        </InputAndLabelWrapper>
        <div className="w-full mb-6">
          <label
            htmlFor="invoiceType"
            className="block mb-2 text-xl font-bold text-white"
          >
            Status
          </label>
          <select
            id="invoiceType"
            name="invoiceType"
            className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
            required
          >
            <option value={InvoiceType.Handlowe}>Handlowa</option>
            <option value={InvoiceType.Niehandlowe}>Niehandlowa</option>
          </select>
        </div>
        <OptionsWrapper required>Rodzaj płatności</OptionsWrapper>
        <InputAndLabelWrapper
          htmlFor="paymentDeadlineDate"
          id="paymentDeadlineDate"
          type="date"
          name="paymentDeadlineDate"
          required
        >
          Termin
        </InputAndLabelWrapper>
        <div className="flex justify-between w-full mt-5">
          <ReturnButton onClick={() => setAddModalIsOpen(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="add_invoice" name="intent">
            Zapisz
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </Modal>
  );
}
