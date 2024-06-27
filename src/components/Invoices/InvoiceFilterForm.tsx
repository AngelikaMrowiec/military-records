import { Dispatch, SetStateAction } from "react";
import Modal from "../WrappingContainers/Modal";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import OptionsWrapper from "../FormWrappers/OptionsWrapper";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";
import ReturnButton from "../FormWrappers/ReturnButton";
import { Company } from "../../util/CompanyType";

type Props = {
  setFilterModalIsOpen: Dispatch<SetStateAction<boolean>>;
  filterModalIsOpen: boolean;
  companies: Company[];
};

export default function InvoiceFilterForm({
  setFilterModalIsOpen,
  filterModalIsOpen,
  companies,
}: Props) {
  const style = {
    height: "48rem",
    width: "36rem",
  };
  return (
    <Modal open={filterModalIsOpen} onClose={() => setFilterModalIsOpen(false)}>
      <FormWrapper
        style={style}
        method="post"
        onSubmitFinish={() => setFilterModalIsOpen(false)}
      >
        <div className="w-full mb-6">
          <label
            htmlFor="companyId"
            className="block mb-2 text-xl font-bold text-white"
          >
            Firma
          </label>
          <select
            id="companyId"
            name="companyId"
            className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
          >
            <option value={undefined}></option>
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
        >
          Numer faktury
        </InputAndLabelWrapper>
        <OptionsWrapper>Rodzaj płatności</OptionsWrapper>
        <InputAndLabelWrapper htmlFor="from" id="from" type="date" name="from">
          Od
        </InputAndLabelWrapper>
        <InputAndLabelWrapper htmlFor="to" id="to" type="date" name="to">
          Do
        </InputAndLabelWrapper>
        <div className="w-full mb-6">
          <label
            htmlFor="isPaid"
            className="block mb-2 text-xl font-bold text-white"
          >
            Status
          </label>
          <select
            id="isPaid"
            name="isPaid"
            className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
          >
            <option value={"NULL"}></option>
            <option value={0}>Niezapłacona</option>
            <option value={1}>Zapłacona</option>
          </select>
        </div>
        <div className="flex justify-between w-full mt-5">
          <ReturnButton onClick={() => setFilterModalIsOpen(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="search" name="intent">
            Szukaj
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </Modal>
  );
}
