import { createContext } from "react";

export const AuthContext = createContext<string | undefined | null>(null);
