import { useLoaderData } from "react-router-dom";
import { Dispatch, SetStateAction } from "react";
import Modal from "../WrappingContainers/Modal";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";

type ModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddCompanyForm({
  modalIsOpen,
  setModalIsOpen,
}: ModalProps) {
  const { companies } = useLoaderData() as any;
  return (
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <FormWrapper method="post" onSubmitFinish={() => setModalIsOpen(false)}>
        <InputAndLabelWrapper
          htmlFor="name"
          id="name"
          type="string"
          name="name"
          required
        >
          Nazwa
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="bankAccountNumber"
          id="bankAccountNumber"
          type="string"
          name="bankAccountNumber"
          required
        >
          Numer konta
        </InputAndLabelWrapper>
        <input className="hidden" defaultValue={companies.id} name="id" />
        <div className="flex justify-between w-full mt-10">
          <ReturnButton onClick={() => setModalIsOpen(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="add_company" name="intent">
            Zapisz
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </Modal>
  );
}
