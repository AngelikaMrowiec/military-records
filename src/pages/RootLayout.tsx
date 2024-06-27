import { Outlet } from "react-router-dom";
import SideNavBar from "../components/Sidebar/SideNavBar";

export default function RootLayout() {
  return (
    <>
    <div className="h-[10%]">
    <SideNavBar />
    </div>
      <main className="h-[80%]">
        <Outlet />
      </main>
      <footer className="h-[10%]"></footer>
    </>
  );
}
