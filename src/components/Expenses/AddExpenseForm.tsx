import { useLoaderData, Await } from "react-router-dom";
import { Dispatch, SetStateAction, Suspense, useState, useEffect } from "react";
import { Category } from "../../util/ExpenseTypes";
import Modal from "../WrappingContainers/Modal";
import ConfirmationButton from "../FormWrappers/ConfirmationButton";
import ReturnButton from "../FormWrappers/ReturnButton";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";
import FormWrapper from "../FormWrappers/FormWrapper";

type ModalProps = {
  modalIsOpen: boolean;
  setModalIsOpen: Dispatch<SetStateAction<boolean>>;
};

export default function AddExpenseForm({
  modalIsOpen,
  setModalIsOpen,
}: ModalProps) {
  const { categories } = useLoaderData() as any;
  const [showCategoryModal, setShowCategoryModal] = useState(false);

  useEffect(() => {
    document.body.addEventListener("click", () => {
      setShowCategoryModal(false);
      setModalIsOpen(false);
    });
  });

  function handleAddOption(value: number) {
    if (value === -1) {
      setShowCategoryModal(true);
    }
  }

  function handleReturnToFirstModal() {
    setShowCategoryModal(false);
  }

  let form;
  if (showCategoryModal === false) {
    form = (
      <FormWrapper method="post" onSubmitFinish={() => setModalIsOpen(false)}>
        <div className="w-full mb-6">
          <label
            htmlFor="categoryId"
            className="block mb-2 text-xl font-bold text-white"
          >
            Kategoria
          </label>
          <select
            onChange={(event) => handleAddOption(Number(event.target.value))}
            id="categoryId"
            name="categoryId"
            className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"
            required
          >
            <Suspense>
              <Await resolve={categories}>
                {(loadedCategories: Category[]) =>
                  loadedCategories?.map((category) => (
                    <option key={category.id} value={category.id}>
                      {category.name}
                    </option>
                  ))
                }
              </Await>
            </Suspense>
            <option value={-1}>Dodaj...</option>
          </select>
        </div>
        <InputAndLabelWrapper
          htmlFor="value"
          id="value"
          type="numver"
          name="value"
          required
          min="1"
        >
          Wartość
        </InputAndLabelWrapper>
        <InputAndLabelWrapper
          htmlFor="date"
          id="date"
          type="date"
          name="date"
          required
        >
          Data
        </InputAndLabelWrapper>
        <div className="flex justify-between w-full mt-10">
          <ReturnButton onClick={() => setModalIsOpen(false)}>
            Cofnij
          </ReturnButton>
          <ConfirmationButton type="submit" name="intent" value="add_expense">
            Dodaj
          </ConfirmationButton>
        </div>
      </FormWrapper>
    );
  } else {
    form = (
      <FormWrapper method="post" onSubmitFinish={() => setShowCategoryModal(false)}>
        <div className="w-full my-20">
          <InputAndLabelWrapper
            htmlFor="newCategory"
            id="newCategory"
            type="text"
            name="name"
          >
            Nowa Kategoria
          </InputAndLabelWrapper>
        </div>
        <div className="flex justify-between w-full">
          <ReturnButton onClick={handleReturnToFirstModal}>Cofnij</ReturnButton>
          <ConfirmationButton type="submit" value="add_category" name="intent">
            Dodaj
          </ConfirmationButton>
        </div>
      </FormWrapper>
    );
  }

  function handleOnClose() {
    setModalIsOpen(false);
    setShowCategoryModal(false);
  }

  return (
    <Modal open={modalIsOpen} onClose={handleOnClose}>
      {form}
    </Modal>
  );
}
