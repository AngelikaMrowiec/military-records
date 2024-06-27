import { useState } from "react";
import { Link } from "react-router-dom";
import { SideNavData } from "./SideNavData";
import { AnimatePresence, motion } from "framer-motion";
import SubMenu from "./SubMenu";
import { RxHamburgerMenu } from "react-icons/rx";
import * as AiIcons from "react-icons/ai";

export default function SideNavBar() {
  const [sidebar, setSidebar] = useState(false);

  const showSidebar = () => setSidebar((prev) => !prev);

  const navIconClassName = "ml-8 text-4xl h-20 flex justify-start items-center";
  const sideBarClassName = "bg-gravelgray w-64 h-screen fixed top-0 z-10 ";

  return (
    <header>
      <div className="flex justify-start items-start">
        <Link to="#" className={navIconClassName}>
          <RxHamburgerMenu onClick={showSidebar} />
        </Link>
      </div>
      <AnimatePresence mode="wait">
        {sidebar && (
          <motion.nav
            className={sideBarClassName}
            initial={{ opacity: 0, x: -250 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -250 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
          >
            <div className="w-full flex flex-col ">
              <Link to="#" className={navIconClassName}>
                <AiIcons.AiOutlineClose onClick={showSidebar} />
              </Link>
              {SideNavData.map((element, index) => {
                return <SubMenu SideNavElement={element} key={index} />;
              })}
            </div>
          </motion.nav>
        )}
      </AnimatePresence>
    </header>
  );
}
