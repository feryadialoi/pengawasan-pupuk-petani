import { Auth } from "../models/Auth";
import { Role } from "../models/Role";

export const getLocalAuth = (): Auth | null => {
    const token = localStorage.getItem("token");
    if (token) {
        const auth: Auth = {
            token: token,
        };
        return auth;
    } else {
        return null;
    }
};

export const setLocalAuth = (auth: Auth): void => {
    localStorage.setItem("token", auth.token);
};

export const getLocalRole = (): Role | null => {
    const role = localStorage.getItem("role");
    if (role) {
        return role as Role;
    } else {
        return null;
    }
};

export const setLocalRole = (role: Role): void => {
    localStorage.setItem("role", role);
};

export const removeLocalAuth = () => {
    localStorage.removeItem("token");
};

export const removeLocalRole = () => {
    localStorage.removeItem("role");
};
