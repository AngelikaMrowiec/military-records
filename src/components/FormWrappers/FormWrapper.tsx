import { ReactNode } from "react";
import { useEffect } from "react";
import { useFetcher } from "react-router-dom";

type Props = {
  children: ReactNode;
  method: "get" | "post" | "put" | "delete" | "patch";
  onSubmitFinish?: (data: any) => void;
  style?: React.CSSProperties | undefined;
};

export default function FormWrapper({
  children,
  method,
  onSubmitFinish,
  style,
}: Props) {
  const fetcher = useFetcher();
  const { data, state } = fetcher;

  useEffect(() => {
    if (state === "idle" && data !== undefined) {
      if (onSubmitFinish !== undefined) {
        onSubmitFinish(data);
      }
    }
  }, [data, state]);

  return (
    <fetcher.Form
      style={style}
      method={method}
      className="flex flex-col items-center justify-center h-[30rem] w-[36rem] max-w-lg mx-auto p-6 bg-gravelgray rounded-lg"
    >
      {children}
    </fetcher.Form>
  );
}

// 48h 36w dobrze wyglada modal faktury
