import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import ErrorComponent from "../components/ErrorComponent";

type Props<T> = {
  data: T | Promise<T>;
  message: string;
};

export function useRedirect<T>({ data, message }: Props<T>) {
  const navigate = useNavigate();

  useEffect(() => {
    const promise = data instanceof Promise ? data : Promise.resolve(data);

    promise.then((response) => {
      if (response instanceof Response) {
        if (response.status === 401) {
          navigate("/login");
        } else {
          return <ErrorComponent title="Error occured." message={message} />;
        }
      }
    });
  }, []);
}
