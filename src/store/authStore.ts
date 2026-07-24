import { create } from "zustand";
import { persist } from "zustand/middleware";

interface User {
    email: string;
    name: string;
}

interface AuthUserState {
    user: User | null;
    accessToken: string | null;
    refreshToken: string | null;
    expiresIn: number | null;
    expiresAt: Date | null;
}

interface AuthUserStateAction {
    setAuth: (user: User, accessToken: string, expiresIn: number, expiresAt: Date, refreshToken: string) => void;
    logout: () => void;
}

type AuthStore = AuthUserState & AuthUserStateAction;

export const useAuthStore = create<AuthStore>()(
    persist<AuthStore>(
        (set) => ({
            user: null,
            accessToken: null,
            refreshToken: null,
            expiresIn: null,
            expiresAt: null,
            setAuth: (user, accessToken, expiresIn, expiresAt, refreshToken) =>
                set({
                    user,
                    accessToken,
                    expiresIn,
                    expiresAt,
                    refreshToken
                }),
            logout: () =>
                set({
                    user: null,
                    accessToken: null,
                    refreshToken: null,
                    expiresIn: null,
                    expiresAt: null
                })
        }),
        {
            name: 'auth-storage',
            onRehydrateStorage: () => (state) => {
                if (state && state.expiresAt) {
                    state.expiresAt = new Date(state.expiresAt);
                }
            }
        }
    )
)