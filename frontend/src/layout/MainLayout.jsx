import MainNavBar from "../component/MainNavBar";
import { Outlet } from "react-router-dom";

const MainLayout = () => {
  return (
    <div className="bg-[linear-gradient(135deg,#f5f7fa_0%,#c3cfe2_100%)] min-h-screen pt-1">
      <MainNavBar />
      <Outlet />
    </div>
  );
};
export default MainLayout;
