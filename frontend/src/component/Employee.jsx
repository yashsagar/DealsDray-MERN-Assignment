import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuth";

const Employee = ({ info = [] }) => {
  const deleteEmployee = useAuthStore((store) => store.deleteEmployee);

  const handelDelete = (employee) => {
    console.log(employee);
    deleteEmployee(employee);
  };

  console.log(info);

  return info.map((item, index) => {
    console.log(`${import.meta.env.VITE_BACKEND_BASE_URL}/item.imageLink`);
    return (
      <div key={index} className="contents  ">
        <div className="dataCell">{item.uniqueId}</div>
        <div className="dataCell">
          <img
            src={"/pic-1.png"}
            alt="Employee Image"
            className="w-12 h-12 object-cover "
          />
        </div>
        <div className="dataCell capitalize">{item.name}</div>
        <div className="dataCell">{item.email}</div>
        <div className="dataCell">{item.mobileNo}</div>
        <div className="dataCell">{item.designation.toUpperCase()}</div>
        <div className="dataCell capitalize">{item.gender}</div>
        <div className="dataCell">{item.course[0].toUpperCase()}</div>
        <div className="dataCell">{item.createDate}</div>
        <div className="border-b border-gray-300 grid place-content-center grid-flow-col">
          <Link
            to={"/employeeUpdate"}
            state={{ type: "Edit", data: item }}
            className="mx-1 px-4 py-1 text-sm bg-slate-400/50 rounded-lg"
          >
            Edit
          </Link>
          <button
            className="mx-1 px-4 py-1 text-sm bg-slate-400/50 rounded-lg"
            onClick={() => {
              handelDelete(item);
            }}
          >
            Delete
          </button>
        </div>
      </div>
    );
  });
};
export default Employee;
