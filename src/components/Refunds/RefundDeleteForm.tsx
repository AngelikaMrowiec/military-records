import { Dispatch, SetStateAction } from "react";
import { Refund } from "../../util/RefundType";
import FormWrapper from "../FormWrappers/FormWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type Props = {
  refund: Refund;
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
};

export default function RefundDeleteForm({
  setShowDeleteModal,
  refund,
}: Props) {
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
      <input className="hidden" defaultValue={refund.id} name="id" />
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
  )
}
