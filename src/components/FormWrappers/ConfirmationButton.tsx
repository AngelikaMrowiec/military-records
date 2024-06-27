import { ReactNode } from "react";

type Props = {
  type?: "button" | "submit" | "reset";
  value?: string;
  name?: string;
  children: ReactNode;
};

export default function ConfirmationButton({
  type,
  value,
  name,
  children,
}: Props) {
  return (
    <button
      type={type}
      value={value}
      name={name}
      className="w-32 h-10 text-xl text-white bg-sage-400 rounded-full shadow-lg hover:bg-sage-500 hover:font-bold focus:outline-none focus:border-sage-200"
    >
      {children}
    </button>
  );
}
