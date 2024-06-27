import * as AiIcons from "react-icons/ai";
import * as IoIcons from "react-icons/io";
import { GiPayMoney } from "react-icons/gi";
import { PiKeyReturnFill } from "react-icons/pi";
import { BsClipboard2DataFill } from "react-icons/bs";
import { ReactElement } from "react";

export type SideNavElement = {
  title: string;
  path?: string;
  subNav?: SideNavElement[];
  icon: ReactElement;
};

export const SideNavData: SideNavElement[] = [
  {
    title: "Strona Główna",
    path: "/",
    icon: <AiIcons.AiFillHome />,
  },
  {
    title: "Przychody",
    icon: <IoIcons.IoIosPaper />,
    subNav: [
      {
        title: "Przychody dzienne",
        path: "przychody/dzien",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Przychody miesięczne",
        path: "przychody/msc",
        icon: <IoIcons.IoIosPaper />,
      },
      {
        title: "Przychody roczne",
        path: "przychody/rok",
        icon: <IoIcons.IoIosPaper />,
      },
    ],
  },
  {
    title: "OT",
    path: "ot",
    icon: <AiIcons.AiFillBug />,
  },
  {
    title: "Koszty",
    path: "koszty",
    icon: <GiPayMoney />,
  },
  {
    title: "Faktury",
    path: "faktury",
    icon: <AiIcons.AiFillCopy />,
  },
  {
    title: "Zwroty",
    path: "zwroty",
    icon: <PiKeyReturnFill />,
  },
  {
    title: "Firmy",
    path: "firmy",
    icon: <IoIcons.IoMdPeople />,
  },
  {
    title: "Podsumowanie",
    path: "podsumowanie",
    icon: <BsClipboard2DataFill />,
  },
];
