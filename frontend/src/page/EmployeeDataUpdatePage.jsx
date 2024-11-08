import { useLocation } from "react-router-dom";
import { Formik, Form, Field, ErrorMessage } from "formik";
import * as Yup from "yup";
import toast from "react-hot-toast";
import { useAuthStore } from "../store/userAuth";

const EmployeeDataUpdatePage = () => {
  const location = useLocation();
  const state = location.state;
  const update = useAuthStore((store) => store.update);

  const validationSchema = Yup.object({
    name: Yup.string()
      .required("Name is required")
      .min(3, "Name must be at least 3 characters"),
    email: Yup.string()
      .email("Invalid email format")
      .required("Email is required"),
    mobileNo: Yup.string()
      .matches(/^[0-9]{10}$/, "Mobile number must be exactly 10 digits")
      .required("Mobile number is required"),
    designation: Yup.string().required("Designation is required"),
    gender: Yup.string().required("Gender is required"),
    course: Yup.array().min(1, "Select at least one course"),
    imgUpload: Yup.mixed()
      .required("Image is required")
      .test(
        "fileFormat",
        "Only JPG and PNG files are allowed",
        (value) => value && ["image/jpeg", "image/png"].includes(value.type)
      ),
  });

  const handleSubmit = (values, resetForm) => {
    const data = update(values);
    data.then((message) => {
      message.success && toast.success(message.message);
    });
    resetForm();
  };

  return (
    <>
      <div className="bg-yellow-200/80 py-0.5">
        <p className=" main-wrapper">
          {state.type === "Create" ? "Create Employee" : "Employee Edit"}
        </p>
      </div>
      <div className="main-wrapper">
        <Formik
          initialValues={{
            name: state.type === "Create" ? "" : state.data.name,
            email: state.type === "Create" ? "" : state.data.email,
            mobileNo: state.type === "Create" ? "" : state.data.mobileNo,
            designation: state.type === "Create" ? "" : state.data.designation,
            gender: "",
            // gender: state.type === "Create" ? "" : state.data.gender,
            course: [],
            // course: state.type === "Create" ? [] : [state.data.course],
            imgUpload: null,
          }}
          validationSchema={validationSchema}
          onSubmit={(values, { resetForm }) => {
            handleSubmit(values, resetForm);
          }}
        >
          {({ setFieldValue }) => (
            <Form className=" px-20 mt-10 grid grid-cols-[1.5fr_5fr] max-w-[600px] gap-y-7 relative">
              <div className="contents ">
                <label className="place-content-center">Name:</label>
                <Field
                  type="text"
                  name="name"
                  placeholder="Enter your name"
                  className=" px-4 py-1.5 rounded-sm border border-slate-500/40"
                />
              </div>

              <div className="contents relative">
                <label className="place-content-center">Email:</label>
                <Field
                  type="text"
                  name="email"
                  placeholder="Enter your email"
                  className=" px-4 py-1.5 rounded-sm border border-slate-500/40"
                />
              </div>

              <div className="contents">
                <label className="place-content-center">Mobile No:</label>
                <Field
                  type="tel"
                  name="mobileNo"
                  maxLength="10"
                  placeholder="Enter mobile number"
                  className=" px-4 py-1.5 rounded-sm border border-slate-500/40"
                  onChange={(e) => {
                    const value = e.target?.value?.replace(/\D/g, "");
                    setFieldValue("mobileNo", value);
                  }}
                />
              </div>

              <div className="contents">
                <label className="place-content-center">Designation:</label>
                <Field
                  as="select"
                  name="designation"
                  className=" px-4 py-1.5 rounded-sm border border-slate-500/40"
                >
                  <option value="">Select Designation</option>
                  <option value="hr">HR</option>
                  <option value="manager">Manager</option>
                  <option value="sales">Sales</option>
                </Field>
              </div>

              <div className="contents">
                <label className="place-content-center">Gender:</label>
                <div className="flex gap-4">
                  <label className="flex gap-1 justify-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="male"
                      // {...(state.type !== "Create" &&
                      //   state.data?.gender === "male" && { checked: true })}
                    />
                    <span>Male</span>
                  </label>
                  <label className="flex gap-1 justify-center">
                    <Field
                      type="radio"
                      name="gender"
                      value="female"
                      // {...(state.type !== "Create" &&
                      //   state.data?.gender === "female" && { checked: true })}
                    />
                    <p>Female</p>
                  </label>
                </div>
              </div>

              <div className="contents">
                <label className="place-content-center">Course:</label>
                <div className="flex gap-4">
                  <label className="flex gap-1 justify-center ">
                    <Field
                      type="checkbox"
                      name="course"
                      value="mca"
                      className="mt-0.5"
                      // {...(state.type !== "Create" &&
                      //   state.data?.course === "mca" && { checked: true })}
                    />
                    <p>MCA</p>
                  </label>
                  <label className="flex gap-1 justify-center">
                    <Field
                      type="checkbox"
                      name="course"
                      value="bca"
                      className="mt-0.5"
                      // {...(state.type !== "Create" &&
                      //   state.data?.course === "bca" && { checked: true })}
                    />
                    <p>BCA</p>
                  </label>
                  <label className="flex gap-1 justify-center">
                    <Field
                      type="checkbox"
                      name="course"
                      value="bsc"
                      className="mt-0.5"
                      // {...(state.type !== "Create" &&
                      //   state.data?.course === "bsc" && { checked: true })}
                    />
                    <p>BSC</p>
                  </label>
                </div>
              </div>

              <div className="contents">
                <label className="place-content-center">Img Upload:</label>
                <input
                  type="file"
                  name="imgUpload"
                  onChange={(event) => {
                    const file = event.currentTarget.files[0];
                    if (
                      file &&
                      (file.type === "image/jpeg" || file.type === "image/png")
                    ) {
                      setFieldValue("imgUpload", file);
                    } else {
                      toast.error("Please upload a JPG or PNG file.");
                      setFieldValue("imgUpload", null);
                    }
                  }}
                />
              </div>
              <div className="col-start-2 bg-green-400 text-center">
                <button type="submit" className="w-full h-full py-1">
                  {state.type === "Create" ? "Submit" : "Update"}
                </button>
              </div>
              <ul className="col-span-2 text-center text-red-500 ">
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage name="name" component="div" className="error" />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="email"
                    component="div"
                    className="error"
                  />
                </div>

                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="mobileNo"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="designation"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="gender"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="course"
                    component="div"
                    className="error"
                  />
                </div>
                <div className="flex gap-2 justify-center items-center">
                  <ErrorMessage
                    name="imgUpload"
                    component="div"
                    className="error"
                  />
                </div>
              </ul>
            </Form>
          )}
        </Formik>
      </div>
    </>
  );
};

export default EmployeeDataUpdatePage;
