import { useEffect, useState } from "react";
import Employee from "../component/Employee";
import { Link } from "react-router-dom";
import { useAuthStore } from "../store/userAuth";

const EmployeeListPage = () => {
  const [inputValue, setInputValue] = useState("");
  const [data, setData] = useState([]);

  const dataFetch = useAuthStore((store) => store.dataFetch);

  useEffect(() => {
    dataFetch().then((data) => {
      setData(data);
    });
  }, [dataFetch]);

  const handleEnterPress = (event) => {
    if (event.key === "Enter") {
      console.log(inputValue);
    }
  };

  return (
    <>
      <div className="bg-yellow-200/80 py-0.5">
        <p className=" main-wrapper">Employee List</p>
      </div>
      <div className="main-wrapper bg-white mt-4 relative">
        <div className="flex mr-20 gap-20 py-0.5 rounded-sm">
          <p className="ml-auto">Total Count: 4</p>
          <Link
            to={"/employeeUpdate"}
            state={{ type: "Create", data: null }}
            className="pl-2 pr-40 bg-green-500/50 "
          >
            Create Employee
          </Link>
        </div>

        <div className="flex  gap-4 py-0.5 rounded-sm absolute right-0">
          <p className="ml-auto">Search</p>
          <input
            type="text"
            value={inputValue}
            onChange={(e) => {
              setInputValue(e.target.value);
            }}
            onKeyDown={handleEnterPress}
            className="w-[480px] h-7 border border-black outline-none placeholder:text-center px-4"
            placeholder="Enter Search Keyword"
          />
        </div>

        <div className="grid grid-cols-[1.3fr_1fr_1fr_2fr_1.5fr_1fr_1fr_1fr_1.5fr_2fr] border-x border-gray-300 ">
          <div className="contents">
            <div className=" headding">Unique ID</div>
            <div className="headding">Image</div>
            <div className="headding">Name</div>
            <div className="headding">Email</div>
            <div className="headding">Mobile No</div>
            <div className="headding">Designation</div>
            <div className="headding">Gender</div>
            <div className="headding">Course</div>
            <div className="headding">Create Date</div>
            <div className="font-bold bg-gray-200 px-2 pt-10 border-b border-gray-300 flex items-end justify-center">
              Action
            </div>
          </div>

          {/* <Employee info={data1} /> */}
          <Employee info={data} />
        </div>
      </div>
    </>
  );
};
export default EmployeeListPage;
