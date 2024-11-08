import { useAuthStore } from "../store/userAuth";
import { Link } from "react-router-dom";
const AdminPanelNavbar = () => {
  const user = useAuthStore((store) => store.user);
  const logout = useAuthStore((store) => store.logout);
  return (
    <div className="bg-slate-400/50 ">
      <nav className="flex mt-12 justify-between px-10 main-wrapper py-0.5">
        <div className="flex gap-10">
          <Link to={"/"}>
            <p>Home</p>
          </Link>
          <Link to={"/employeeList"}>
            <p>Employee List</p>
          </Link>
        </div>
        <div className="flex gap-10">
          <p className="capitalize">{`${user} -`}</p>
          <p
            className="cursor-pointer"
            onClick={() => {
              logout();
            }}
          >
            Logout
          </p>
        </div>
      </nav>
    </div>
  );
};
export default AdminPanelNavbar;
