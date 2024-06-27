import { Dispatch, SetStateAction } from "react";
import { Invoice } from "../../util/InvoiceType";
import FormWrapper from "../FormWrappers/FormWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormProps = {
  invoice: Invoice;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export default function InvoiceDeleteForm({
  invoice,
  setShowDeleteModal,
}: FormProps) {
  return (
    <>
      <FormWrapper
        method="delete"
        onSubmitFinish={() => setShowDeleteModal(false)}
      >
        <h2 className="block text-center text-2xl font-bold text-white">
          Czy na pewno chcesz usunąć?
          <br /> Akcja jest nieodwracalna.
        </h2>
        <input className="hidden" defaultValue={invoice.id} name="id" />
        <div className="flex justify-around w-full mt-10">

        <ReturnButton onClick={() => setShowDeleteModal(false)}>
          Cofnij
        </ReturnButton>
        <ConfirmationButton type="submit" value="delete" name="intent">
          Usuń
        </ConfirmationButton>
        </div>
      </FormWrapper>
    </>
  );
}
