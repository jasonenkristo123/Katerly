import { create } from "zustand";



interface User {
    userId: string;
    namaPemilik: string;
    email: string;
    hasBusinessProfile: boolean;
    premium: boolean;
}

interface AuthState {
    user: User | null;
    isAuthenticated: boolean;
    isLoading: boolean;
    setUser: (data: User | null) => void;
    setLoading: (isLoading: boolean) => void;
    logout: () => void;
}

const useAuthStore = create<AuthState>((set) => ({
    user: null,
    isAuthenticated: false,
    isLoading: true,

    setUser: (user) => set({ user, isAuthenticated: !!user }),
    setLoading: (isLoading) => set({ isLoading }),
    logout: () => set({ user: null, isAuthenticated: false }),

}));

export default useAuthStore;