import SwitchSelector from "../../react-switch-selector/SwitchSelector";

type Props = {
  onClick: React.Dispatch<React.SetStateAction<boolean>>;
};

export default function SwitchButton({ onClick }: Props) {
  const options = [
    {
      label: "Wykres",
      value: "wykres",
      selectedBackgroundColor: "#64724c",
    },
    {
      label: "Tabela",
      value: "tabela",
      selectedBackgroundColor: "#859865",
    },
  ];

  const onChange = (newValue: any) => {
    if ("wykres" === newValue) {
      onClick(true);
    } else if ("tabela" === newValue) {
      onClick(false);
    }
  };

  const initialSelectedIndex = options.findIndex(
    ({ value }) => value === "wykres"
  );

  return (
    <div className="flex justify-center mt-0 mb-4">
      <div className="w-48 h-8">
        <SwitchSelector
          onChange={onChange}
          options={options}
          initialSelectedIndex={initialSelectedIndex}
          backgroundColor={"#545853"}
          fontColor={"#FFFFFF"}
          fontSize={16}
        />
      </div>
    </div>
  );
}
