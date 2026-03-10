import {create } from "zustand";
import { axiosInstance } from "../lib/axios";

interface AuthStore {
    authUser: any;
    isSigningUp: boolean;
    isLoggingIn: boolean;
    isUpdatingProfile: boolean;
    isCheckingAuth: boolean;
    checkAuth: () => Promise<void>;
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
    }
}))