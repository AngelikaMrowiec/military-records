import { Form, Link, useNavigation } from "react-router-dom";

export default function RegisterForm() {
    const navigation = useNavigation();
    const isSubmitting = navigation.state === "submitting";
  
    return (
      <Form method="post" className="max-w-sm mx-auto mt-8 p-6 bg-white rounded-lg shadow-md">
        <h1 className="text-2xl font-semibold mb-4 text-gray-700">Create a new user</h1>
        <p className="mb-4">
          <label htmlFor="email" className="block text-gray-700 font-semibold mb-1">Email</label>
          <input id="email" type="email" name="email" required className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600" />
        </p>
        <p className="mb-4">
          <label htmlFor="image" className="block text-gray-700 font-semibold mb-1">Password</label>
          <input id="password" type="password" name="password" required className="w-full h-10 px-4 text-lg text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-brunswick_green-600"/>
        </p>
        <div className="flex items-center justify-around mb-4">
          <Link to={"/auth/login"} className="text-brunswick_green hover:underline">Login</Link>
          <button disabled={isSubmitting} className={`w-32 h-10 text-lg text-white bg-brunswick_green rounded-full focus:outline-none ${isSubmitting ? 'opacity-50 cursor-not-allowed' : 'hover:bg-brunswick_green-600'}`}>
            {isSubmitting ? "Submitting" : "Save"}
          </button>
        </div>
      </Form>
    );
  }