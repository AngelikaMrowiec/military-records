import { Dispatch, SetStateAction } from "react";
import { MonthlyExpense } from "../../util/ExpenseTypes";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";

type FormProps = {
  monthlyExpense: MonthlyExpense;
  setShowEditModal: Dispatch<SetStateAction<boolean>>;
};

export default function MonthlyExpenseEditForm({
  monthlyExpense,
  setShowEditModal,
}: FormProps) {
  return (
    <FormWrapper method="patch" onSubmitFinish={() => setShowEditModal(false)}>
      <InputAndLabelWrapper
        htmlFor="value"
        id="value"
        type="string"
        name="value"
        defaultValue={monthlyExpense.value}
        required
      >
        Wartość
      </InputAndLabelWrapper>
      <input className="hidden" defaultValue={monthlyExpense.id} name="id" />
      <div className="flex justify-between w-full mt-10">
        <ReturnButton onClick={() => setShowEditModal(false)}>Cofnij</ReturnButton>
        <ConfirmationButton type="submit" value="edit" name="intent">
          Zapisz
        </ConfirmationButton>
      </div>
    </FormWrapper>
  );
}
