import { Dispatch, SetStateAction } from "react";
import { Invoice } from "../../util/InvoiceType";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormProps = {
  invoice: Invoice;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function InvoiceEditForm({
  invoice,
  setShowEditModal,
}: FormProps) {
  return (
    <FormWrapper method="patch" onSubmitFinish={() => setShowEditModal(false)}>
      <input className="hidden" defaultValue={invoice.id} name="id" />
      <InputAndLabelWrapper
        htmlFor="invoiceNumber"
        id="invoiceNumber"
        type="string"
        name="invoiceNumber"
        defaultValue={invoice.invoiceNumber}
        required
      >
        Numer faktury
      </InputAndLabelWrapper>
      <InputAndLabelWrapper
        htmlFor="bruttoValue"
        id="bruttoValue"
        type="string"
        name="bruttoValue"
        defaultValue={invoice.bruttoValue}
        required
      >
        Brutto
      </InputAndLabelWrapper>
      <InputAndLabelWrapper
        htmlFor="vatValue"
        id="vatValue"
        type="string"
        name="vatValue"
        defaultValue={invoice.vatValue}
        required
      >
        Vat
      </InputAndLabelWrapper>
      <InputAndLabelWrapper
        htmlFor="deadLine"
        id="deadLine"
        type="date"
        name="deadLine"
        defaultValue={new Date(invoice.paymentDeadlineDate)
          .toISOString()
          .substring(0, 10)}
      >
        Termin
      </InputAndLabelWrapper>
      <div className="flex justify-around w-full">
        <ReturnButton onClick={() => setShowEditModal(false)}>
          Cofnij
        </ReturnButton>
        <ConfirmationButton type="submit" value="edit" name="intent">
          Zapisz
        </ConfirmationButton>
      </div>
    </FormWrapper>
  );
}
