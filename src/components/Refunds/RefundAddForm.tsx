import { Dispatch, SetStateAction } from "react";
import Modal from "../WrappingContainers/Modal";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import ReturnButton from "../FormWrappers/ReturnButton";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";
import OptionsWrapper from "../FormWrappers/OptionsWrapper";

type Props = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function RefundAddForm({ modalIsOpen, setModalIsOpen }: Props) {
  const style = {
    height: "48rem",
    width: "36rem",
  };

  return (
    <Modal open={modalIsOpen} onClose={() => setModalIsOpen(false)}>
      <FormWrapper
        style={style}
        method="post"
        onSubmitFinish={() => setModalIsOpen(false)}
      >
        <InputAndLabelWrapper
          htmlFor="firstName"
          id="firstName"
          type="string"
          name="firstName"
          required
        >
          Imię
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="lastName"
          id="lastName"
          type="string"
          name="lastName"
          required
        >
          Nazwisko
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="value"
          id="value"
          type="number"
          name="value"
          required
        >
          Wartość
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="orderNumber"
          id="orderNumber"
          type="number"
          name="orderNumber"
          required
        >
          Numer zamówienia
        </InputAndLabelWrapper>
        <OptionsWrapper>Rodzaj płatności</OptionsWrapper>
        <InputAndLabelWrapper
          htmlFor="description"
          id="description"
          type="string"
          name="description"
          required
        >
          Opis
        </InputAndLabelWrapper>
        <div className="flex justify-between w-full mt-5">
          <ReturnButton onClick={() => setModalIsOpen(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" value="add_refund" name="intent">
            Zapisz
          </ConfirmationButton>
        </div>
      </FormWrapper>
    </Modal>
  );
}
