import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import { useEffect } from "react";

import { useAuthStore } from "./store/userAuth";

// component and page import
import MainLayout from "./layout/MainLayout";
import LandingPageLayout from "./layout/LandingPageLayout";
import LandingPage from "./page/LandingPage";
import LoginPage from "./page/LoginPage";
import EmployeeListPage from "./page/EmployeeListPage";
import EmployeeDataUpdatePage from "./page/EmployeeDataUpdatePage";

const App = () => {
  const authCheck = useAuthStore((store) => store.authCheck);
  const user = useAuthStore((store) => store.user);

  useEffect(() => {
    authCheck();
  }, [authCheck]);

  const routes = createRoutesFromElements(
    <>
      <Route path="/" element={<MainLayout />}>
        <Route path="/" element={user ? <LandingPageLayout /> : <LoginPage />}>
          <Route path="/" element={<LandingPage />} />
          <Route
            path="/employeeList"
            element={user ? <EmployeeListPage /> : <LoginPage />}
          />
          <Route
            path="/employeeUpdate"
            element={user ? <EmployeeDataUpdatePage /> : <LoginPage />}
          />
        </Route>
      </Route>
    </>
  );

  const router = createBrowserRouter(routes);

  return <RouterProvider router={router} />;
};

export default App;
