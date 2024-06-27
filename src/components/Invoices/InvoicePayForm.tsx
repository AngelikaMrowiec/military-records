import { Dispatch, SetStateAction } from "react";
import { Invoice } from "../../util/InvoiceType";
import FormWrapper from "../FormWrappers/FormWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormProps = {
  invoice: Invoice;
  setShowPayModal: Dispatch<SetStateAction<boolean>>;
};

export default function InvoicePayForm({
  invoice,
  setShowPayModal,
}: FormProps) {
  return (
    <>
      <FormWrapper method="post" onSubmitFinish={() => setShowPayModal(false)}>
        <h2 className="block text-center text-2xl font-bold text-white">
          Czy na pewno chcesz opłacić?
          <br /> Akcja jest nieodwracalna.
        </h2>
        <input className="hidden" defaultValue={invoice.id} name="id" />
        <div className="flex justify-around w-full mt-10">
          <ReturnButton onClick={() => setShowPayModal(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="pay" name="intent">
            Opłać
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </>
  );
}
