import { ReactNode } from "react";

type Props = {
  id: string;
  type: string;
  name: string;
  required?: boolean;
  min?: number | string;
  defaultValue?: string | number | readonly string[];
  htmlFor: string;
  children: ReactNode;
};

export default function InputAndLabelWrapper({
  children,
  htmlFor,
  required,
  min,
  id,
  type,
  name,
  defaultValue,
}: Props) {
  return (
    <div className="w-full mb-6">
      <label
        htmlFor={htmlFor}
        className="block mb-2 text-xl font-bold text-white"
      >
        {children}
      </label>
      <input
        className="w-full h-10 px-4 text-lg text-center text-gray-900 bg-white border border-gray-300 rounded-full focus:outline-none focus:border-sage-200"
        id={id}
        type={type}
        name={name}
        required={required}
        min={min}
        defaultValue={defaultValue}
      />
    </div>
  );
}
