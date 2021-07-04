import {
    getLocalAuth,
    getLocalRole,
    removeLocalAuth,
    removeLocalRole,
    setLocalAuth,
    setLocalRole,
} from "../localpersistences/AuthLocalPersistence";
import {
    removeLocalKiosUser,
    removeLocalPetaniUser,
    useUserLocalPersistence,
} from "../localpersistences/UserLocalPersistence";
import { Auth } from "../models/Auth";
import { Role } from "../models/Role";

export const getAuth = (): Auth | null => {
    return getLocalAuth();
};

export const setAuth = (auth: Auth): void => {
    setLocalAuth(auth);
};

export const getRole = (): Role | null => {
    return getLocalRole();
};

export const setRole = (role: Role): void => {
    setLocalRole(role);
};

export const logout = () => {
    removeLocalAuth();
    removeLocalRole();
    removeLocalKiosUser();
    removeLocalPetaniUser();
};

export const login = (auth: Auth, role: Role) => {
    setLocalAuth(auth);
    setLocalRole(role);
};

export const useAuthService = {
    getAuth,
    setAuth,
    getRole,
    setRole,
    logout,
    login,
};
