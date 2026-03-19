import {create } from "zustand";
import { axiosInstance } from "../lib/axios";
import toast from "react-hot-toast";

interface SignUpPayload {
    fullName: string;
    userName: string;
    email: string;
    password: string;
}

interface UpdateProfilePayload {
  profileImage: string;
}

type LogInPayload =
  | {
      email: string;
      password: string;
      userName?: never;
    }
  | {
      userName: string;
      password: string;
      email?: never;
    };

interface AuthStore {
    authUser: any;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
    signUp: (data: SignUpPayload) => Promise<void>;
  logIn: (data: LogInPayload) => Promise<void>;
  logOut: () => Promise<void>;
  updateProfile: (data: UpdateProfilePayload) => Promise<void>;
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
      toast.error((error as any)?.response?.data?.message || "Signup failed");
    } finally {
      set({ isSigningUp: false });
    }
  },

  logIn : async(data: LogInPayload) => {
    set({ isLoggingIn: true });
    try {
      const res = await axiosInstance.post("/auth/logIn", data);
      set({authUser: res.data});
      toast.success("user logged in successfully");
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "Login failed");
    } finally {
      set({ isLoggingIn: false });
    }
  },

  logOut : async () => {
    try {
        await axiosInstance.post("/auth/logOut");
        set({ authUser: null });
        toast.success("user logged out successfully")
        } catch (error) {
        toast.error((error as any)?.response?.data?.message || " upload failed"); 
    }
  },

  updateProfile : async(data: UpdateProfilePayload) => {
    set({isUpdatingProfile : true});
    try {
      const res = await axiosInstance.put("/auth/update-profile" , data) ;
      set({authUser : res.data});
      toast.success("profile picture uploaded successfully")
    } catch (error) {
      toast.error((error as any)?.response?.data?.message || "Upload failed");
    } finally{
      set({isUpdatingProfile:false})
    }
  }
}))