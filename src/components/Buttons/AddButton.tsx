import { ReactNode } from "react";

type Props = {
  children: ReactNode;
  onClick: () => void;
};

export default function AddButton({ children, onClick }: Props) {
  return (
    <div
      className="h-[10%] w-fit mt-5 flex justify-end items-start"
      onClick={(e) => e.stopPropagation()}
    >
      <button
        onClick={onClick}
        className="w-48 h-10 text-lg text-white bg-sage-300 rounded-full hover:bg-sage-400 hover:font-bold focus:outline-none focus:border-sage-600"
      >
        {children}
      </button>
    </div>
  );
}
