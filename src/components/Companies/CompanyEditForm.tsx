import { Dispatch, SetStateAction } from "react";
import { Company } from "../../util/CompanyType";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type FormProps = {
  companies: Company;
  setShowModal: Dispatch<SetStateAction<boolean>>;
};

export default function CompanyEditForm({
  companies,
  setShowModal,
}: FormProps) {
  return (
    <FormWrapper method="patch" onSubmitFinish={() => setShowModal(false)}>
      <InputAndLabelWrapper
        htmlFor="name"
        id="name"
        type="string"
        name="name"
        defaultValue={companies.name}
        required
      >
        Nazwa
      </InputAndLabelWrapper>
      <InputAndLabelWrapper
        htmlFor="bankAccountNumber"
        id="bankAccountNumber"
        type="string"
        name="bankAccountNumber"
        defaultValue={companies.bankAccountNumber}
      >
        Numer konta
      </InputAndLabelWrapper>
      <input className="hidden" defaultValue={companies.id} name="id" />
      <div className="flex justify-between w-full mt-10">
        <ReturnButton onClick={() => setShowModal(false)}>Cofnij</ReturnButton>
        <ConfirmationButton type="submit" value="edit" name="intent">
          Zapisz
        </ConfirmationButton>
      </div>
    </FormWrapper>
  );
}
