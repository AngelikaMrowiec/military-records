import { Dispatch, SetStateAction } from "react";
import { MonthlyExpense } from "../../util/ExpenseTypes";
import FormWrapper from "../FormWrappers/FormWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormModal = {
  setShowDeleteModal: Dispatch<SetStateAction<boolean>>;
  monthlyExpense: MonthlyExpense;
};

export default function MonthlyExpenesDeleteForm({
  setShowDeleteModal,
  monthlyExpense,
}: FormModal) {
  return (
    <FormWrapper
      method="delete"
      onSubmitFinish={() => setShowDeleteModal(false)}
    >
      <h2 className="block text-center text-2xl font-bold text-white">
        Czy na pewno chcesz usunąć?<br/> Akcja jest nieodwracalna.
      </h2>
      <input className="hidden" defaultValue={monthlyExpense.id} name="id" />
      <div className="flex justify-around w-full mt-20">
        <ReturnButton onClick={() => setShowDeleteModal(false)}>
          Cofnij
        </ReturnButton>
        <ConfirmationButton type="submit" value="delete" name="intent">
          Usuń
        </ConfirmationButton>
      </div>
    </FormWrapper>
  );
}
