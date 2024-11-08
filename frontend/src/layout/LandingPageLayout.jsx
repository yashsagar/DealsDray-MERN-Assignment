import AdminPanelNavbar from "../component/AdminPanelNavbar";
import { Outlet } from "react-router-dom";

const LandingPageLayout = () => {
  return (
    <>
      <AdminPanelNavbar />
      <Outlet />
    </>
  );
};
export default LandingPageLayout;
