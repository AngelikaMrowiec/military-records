import { Link, useNavigation } from "react-router-dom";
import FormWrapper from "../FormWrappers/FormWrapper";
import InputAndLabelWrapper from "../FormWrappers/InputAndLabelWrapper";

export default function LoginForm() {
  const navigation = useNavigation();
  const isSubmitting = navigation.state === "submitting";

  return (
    <div className="flex flex-col justify-center items-center mx-auto h-full">
      <FormWrapper method="post">
        <h1 className="text-2xl font-semibold mb-4 text-white">Zaloguj się:</h1>
        <p className="mb-4">
          <InputAndLabelWrapper
            htmlFor="email"
            id="email"
            type="email"
            name="email"
            required
          >
            E-mail
          </InputAndLabelWrapper>
        </p>
        <p className="mb-4">
          <InputAndLabelWrapper
            htmlFor="image"
            id="password"
            type="password"
            name="password"
            required
          >
            Hasło
          </InputAndLabelWrapper>
        </p>
        <div className="my-4">
          <Link to={"/"} className="text-white text-xl hover:underline">
            Cofnij
          </Link>
          <button
            disabled={isSubmitting}
            className={`w-32 h-10 ml-20 text-xl text-white bg-sage-400 rounded-full shadow-lg focus:outline-none focus:border-sage-200 ${
              isSubmitting
                ? "opacity-50 cursor-not-allowed"
                : "hover:bg-sage-500 hover:font-bold"
            }`}
          >
            {isSubmitting ? "Wysyłanie.." : "Zaloguj"}
          </button>
        </div>
      </FormWrapper>
    </div>
  );
}
