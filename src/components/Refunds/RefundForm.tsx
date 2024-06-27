import { Dispatch, SetStateAction } from "react";
import { Refund } from "../../util/RefundType";
import FormWrapper from "../FormWrappers/FormWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormProps = {
  refund: Refund;
  setShowRefundModal: Dispatch<SetStateAction<boolean>>;
};

export default function RefundForm({ refund, setShowRefundModal }: FormProps) {
  return (
    <>
      <FormWrapper
        method="post"
        onSubmitFinish={() => setShowRefundModal(false)}
      >
        <h2 className="block text-center text-2xl font-bold text-white">
          Czy na pewno dokonać zwrotu?
          <br /> Akcja jest nieodwracalna.
        </h2>
        <input className="hidden" defaultValue={refund.id} name="id" />
        <div className="flex justify-around w-full mt-10">
          <ReturnButton onClick={() => setShowRefundModal(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="refund" name="intent">
            Zwróć
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </>
  );
}
