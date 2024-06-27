import { ReactNode } from "react";

type Props = {
  onClick: () => void;
  children: ReactNode;
};

export default function ReturnButton({ onClick, children }: Props) {
  return (
    <button
      onClick={onClick}
      className="w-32 h-10 text-xl text-white bg-sage-200 rounded-full shadow-lg hover:bg-sage-300 hover:font-bold focus:outline-none focus:border-sage-100"
    >
      {children}
    </button>
  );
}
