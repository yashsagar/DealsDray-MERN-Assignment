import toast from "react-hot-toast";
import { create } from "zustand";
import { devtools } from "zustand/middleware";

export const useAuthStore = create(
  devtools((set) => ({
    user: "",

    isLoggingIn: false,
    isLoggingOut: false,
    login: async (credentials) => {
      set({ isLoggingIn: true });
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/auth/login`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(credentials),
          }
        );
        const data = await response.json();
        if (data.success) {
          set({ user: data.user, isLoggingIn: false });
          toast.success("login success");
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        set({ isLoggingIn: false });
        toast.error("somting went wrong");
        console.log("error in login", err);
      }
    },
    logout: async () => {
      set({ isLoggingOut: true });
      try {
        await fetch(`${import.meta.env.VITE_BACKEND_BASE_URL}/v1/auth/logout`);
        set({ user: null, isLoggingOut: false });
        toast.success("logout success");
      } catch (err) {
        set({ isLoggingOut: false });
        toast.error("Somting went wrong");
        console.log("error in logout", err);
      }
    },
    update: async (credentials) => {
      try {
        const formData = new FormData();

        Object.keys(credentials).forEach((key) => {
          formData.append(key, credentials[key]);
        });

        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/employee/update`,
          {
            method: "POST",
            credentials: "include",
            body: formData,
          }
        );
        const data = await response.json();
        return data;
      } catch (err) {
        console.log("error in authCheck", err);
      }
    },
    authCheck: async () => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/auth/authCheck`
        );
        const data = await response.json();
        set({ user: data.user });
      } catch (err) {
        set({ user: null });
        console.log("error in authCheck", err);
      }
    },
    deleteEmployee: async (user) => {
      try {
        const response = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/employee/delete`,
          {
            method: "POST",
            credentials: "include",
            headers: {
              "content-type": "application/json",
            },
            body: JSON.stringify(user),
          }
        );
        const data = await response.json();
        if (data.success) {
          toast.success(data.message);
        } else {
          toast.error(data.message);
        }
      } catch (err) {
        toast.error("somting went wrong");
        console.log("error in login", err);
      }
    },
    dataFetch: async () => {
      try {
        const res = await fetch(
          `${import.meta.env.VITE_BACKEND_BASE_URL}/v1/employee/dataFetch`
        );

        const data = await res.json();
        return data.data;
      } catch (err) {
        console.log("error in logout", err);
      }
    },
  }))
);
