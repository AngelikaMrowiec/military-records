import { json, redirect } from "react-router-dom";
import { Token } from "../util/TokenType";
import LoginForm from "../components/Login/LoginForm";
import { setToken } from "../util/auth";

export default function LoginPage() {
  return <LoginForm />;
}

type Props = {
  request: Request;
};

export async function action({ request }: Props) {
  const data = await request.formData();
  const authData = {
    email: data.get("email"),
    password: data.get("password"),
  };

  const response = await fetch("http://192.168.1.31:8001/auth/login", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(authData),
  });

  if (response.status === 401) {
    return response;
  }

  if (!response.ok) {
    throw json({ message: "Could not authenticate user." }, { status: 500 });
  }

  const responseData: Token = await response.json();

  setToken(responseData);

  return redirect("/");
}