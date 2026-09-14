import { create } from "zustand"
import { persist } from 'zustand/middleware';
import type { IAuth } from "../model";

export const useAuth = create<IAuth>()(
    persist(
        (set) => ({
            login: null,
            isLoggedIn: false,
            setLogin: (userName) => set({
                login: userName,
                isLoggedIn: true
            }),
            resetLogin: () => set({
                login: null,
                isLoggedIn: false
            })
        }),
        {
            name: 'user-storage',
            partialize: (state) => ({
                login: state.login,
                isLoggedIn: state.isLoggedIn
            })
        }
    )
);