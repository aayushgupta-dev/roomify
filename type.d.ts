interface AuthState {
    isSignedIn: boolean;
    username: string | null;
    userId: string | null;
}

type AuthContext = {
    isSignedIn: boolean;
    username: string | null;
    userId: string | null;
    refreshAuth: () => Promise<boolean | null>;
    signIn: () => Promise<void>;
    signOut: () => Promise<void>;
}
