import { useState } from "react";
import { useAuthStore } from "../store/userAuth";
import toast from "react-hot-toast";

const LoginPage = () => {
  const login = useAuthStore((store) => store.login);
  const [fromData, setFormData] = useState({
    userName: "",
    password: "",
  });

  const handleFormData = (event) => {
    setFormData((prevState) => ({
      ...prevState,
      [event.target.name]: event.target.value,
    }));
  };

  const handleFormSubmit = (event) => {
    event.preventDefault();
    if (!fromData.userName) {
      toast.error("Enter User Name");
      return;
    }

    if (!fromData.password) {
      toast.error("Enter Password");
      return;
    }

    const isPasswordValidated =
      /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,}$/.test(
        fromData.password
      );

    if (!isPasswordValidated) {
      toast.error("Invalid Credentials");
      return;
    }

    login(fromData);
  };
  return (
    <div className=" mt-11">
      <div className="bg-yellow-200/80">
        <p className=" main-wrapper">Login Page</p>
      </div>
      <form
        onSubmit={handleFormSubmit}
        className="max-w-[600px] mx-auto mt-20 space-y-8"
      >
        <div className=" grid grid-cols-[20%,70%] gap-x-4 ">
          <label htmlFor="userName" className="text-right self-center">
            User Name
          </label>
          <input
            type="text"
            id="userName"
            name="userName"
            value={fromData.userName}
            onChange={handleFormData}
            className="h-10 rounded-md outline-none px-4 "
          />
        </div>
        <div className=" grid grid-cols-[20%,70%] gap-x-4">
          <label htmlFor="password" className="text-right self-center">
            Password
          </label>
          <input
            type="password"
            id="password"
            name="password"
            value={fromData.password}
            onChange={handleFormData}
            className="h-10 rounded-md outline-none px-4 "
          />
        </div>
        <div className="grid grid-cols-[20%,70%] gap-x-4">
          <button
            type="submit"
            className="h-10 rounded-md outline-none px-4 col-start-2 bg-green-300 "
          >
            Login
          </button>
        </div>
      </form>
      <div className="mt-10 text-center">
        <p>test user: test1</p>
        <p>test user password : Test@123</p>
      </div>
    </div>
  );
};
export default LoginPage;
