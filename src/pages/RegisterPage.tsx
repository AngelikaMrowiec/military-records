import { json, redirect } from "react-router-dom";
import RegisterForm from "../components/Register/RegisterForm";

export default function RegisterPage() {
  return (
    <RegisterForm />
  )
} 

type Props = {
    request: Request
  }

export async function action( {request} : Props ) {  
    const data = await request.formData();
    const authData = {
      email: data.get("email"),
      password: data.get("password"),
    };
  
    const response = await fetch("http://192.168.1.31:8001/auth/register", {
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
      throw json({ message: "Could not create a new user." }, { status: 500 });
    }
  
    return redirect("auth/login");
  }