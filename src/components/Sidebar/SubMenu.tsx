import { useState } from "react";
import { NavLink } from "react-router-dom";
import { SideNavElement } from "./SideNavData";
import { motion, AnimatePresence } from "framer-motion";
import * as RiIcons from "react-icons/ri";

type Props = {
  SideNavElement: SideNavElement;
};

export default function SubMenu({ SideNavElement }: Props) {
  const [subnav, setSubnav] = useState(false);

  const showSubnav = () => setSubnav((prev) => !prev);

  const activeClassNameMain =
    "text-timberwolf-600 shadow-lg font-bold bg-sage-200 border-solid border-l-8 border-l-gravelgray-300 ";
  const activeClassNameSub =
    "text-timberwolf-600 font-bold bg-sage-400 ";
  const inactiveClassNameMain =
    "flex text-white justify-between items-center p-5 list-none h-16 no-underline text-lg hover:bg-sage-400 hover:border-solid hover:border-l-8 hover:border-l-gravelgray-300 hover:cursor-pointer hover:shadow-lg";
  const inactiveClassNameSub =
    "flex text-white bg-sage-200 h-16 px-5 items-center text-lg hover:bg-sage-500 hover:shadow-lg";

  return (
    <nav>
      <NavLink
        to={SideNavElement.path || "#"}
        onClick={() => SideNavElement.subNav && showSubnav()}
        className={({ isActive }) =>
          isActive && SideNavElement.path
            ? activeClassNameMain + inactiveClassNameMain
            : inactiveClassNameMain
        }
        end
      >
        <div className="flex items-center">
          <span>{SideNavElement.icon}</span>
          <span className="mx-4">{SideNavElement.title}</span>
          {SideNavElement.subNav && subnav ? (
            <RiIcons.RiArrowUpSFill />
          ) : SideNavElement.subNav ? (
            <RiIcons.RiArrowDownSFill />
          ) : null}
        </div>
      </NavLink>
      <AnimatePresence>
        {subnav && (
          <>
            {SideNavElement.subNav?.map((element, index) => (
              <motion.div
                key={index}
                initial={{ opacity: 0, x: -20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
                transition={{ delay: index * 0.1, duration: 0.2 }}
              >
                <NavLink
                  to={element.path || "#"}
                  className={({ isActive }) =>
                    isActive
                      ? activeClassNameSub + inactiveClassNameSub
                      : inactiveClassNameSub
                  }
                  end
                >
                  <div className="flex items-center">
                    <span>{element.icon}</span>
                    <span className="ml-4">{element.title}</span>
                  </div>
                </NavLink>
              </motion.div>
            ))}
          </>
        )}
      </AnimatePresence>
    </nav>
  );
}
