import { PulseLoader } from "react-spinners";

export default function PulseLoaderWrapper() {
  return (
    <div className="flex flex-col justify-center items-center m-auto">
      <PulseLoader color="#64724c" margin={5} size={15} />
    </div>
  );
}
