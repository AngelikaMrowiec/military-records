import { json, redirect } from "react-router-dom";
import { getAuthToken } from "../util/auth";
import FormWrapper from "../components/FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../components/FormWrappers/InputAndLabelWrapper";
import ConfirmationButton from "../components/FormWrappers/ConfirmationButton";

export default function OtPage() {
  return (
    <div className="flex flex-col justify-center items-center mx-auto h-full">
      <h1 className="text-center text-xl font-semibold mb-4">Dodaj nowe OT:</h1>
      <FormWrapper
        method="post"
        onSubmitFinish={() => window.alert("Poprawnie dodano OT.")}
      >
        <InputAndLabelWrapper
          htmlFor="number"
          id="number"
          type="number"
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
        <div className="mt-10">
          <ConfirmationButton type="submit">Dodaj</ConfirmationButton>
        </div>
      </FormWrapper>
    </div>
  );
}

type Props = {
  request: Request;
};
export async function action({ request }: Props) {
  const formData = await request.formData();

  const otData = {
    date: formData.get("date"),
    value: formData.get("value"),
  };
  const token = await getAuthToken();

  const response = await fetch("http://192.168.1.31:8001/expenses/ot", {
    method: "POST",
    body: JSON.stringify(otData),
    headers: {
      "Content-Type": "application/json",
      Authorization: "Bearer " + token,
    },
  });

  if (response.status === 401) {
    return redirect("/login");
  }

  if (!response.ok) {
    throw json({ message: "Could not save ot." }, { status: response.status });
  }
  return response;
}
