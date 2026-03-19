import {create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface SignUpPayload {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

interface AuthStore {
    authUser: any;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpPayload) => Promise<void>;
     logOut: () => Promise<void>;
}

export const checkUserAuthenticated = create<AuthStore>((set) => ({
    authUser : null,
    isSigningUp : false,
    isLoggingIn : false,
    isUpdatingProfile : false,
    isCheckingAuth : true,

    checkAuth : async() => {
        try {
            const res = await axiosInstance.get("/auth/check");
            set({ authUser: res.data, isCheckingAuth: false });
        } catch (error) {
            console.log("Not authenticated");
            set({ authUser: null, isCheckingAuth: false });
        }
    },

    signUp: async (data) => {
    set({ isSigningUp: true });
    try {
      const res = await axiosInstance.post("/auth/signUp", data);
      set({ authUser: res.data });
      toast.success("Account created successfully");
    } catch (error) {
      toast.error("hy my is");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logOut : async () => {
    try {
        await axiosInstance.post("/auth/logOut");
        set({ authUser: null });
        toast.success("user logged out successfully")
        } catch (error) {
        toast.error((error as any).response.data.message);
    }
  },

  updateProfile : async(data) => {
    set({isUpdatingProfile : true});
    try {
      const res = await axiosInstance.put("/auth/update-profile" , data) ;
      set({authUser : res.status});
      toast.success("profile picture uploaded successfully")
    } catch (error) {
      console.log(error);
      toast.error("failed to update the profile picture")
    } finally{
      set({isUpdatingProfile:false})
    }
  }
}))