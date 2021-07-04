import { KiosUser } from "../models/KiosUser";
import { PetaniUser } from "../models/PetaniUser";

export const setLocalKiosUser = (kiosUser: KiosUser): void => {
    const kiosUserStringify = JSON.stringify(kiosUser);
    localStorage.setItem("kios_user", kiosUserStringify);
};

export const getLocalKiosUser = (): KiosUser | null => {
    const stringify = localStorage.getItem("kios_user");
    if (stringify) {
        const kiosUser = JSON.parse(stringify);
        return kiosUser as KiosUser;
    } else {
        return null;
    }
};

export const setLocalPetaniUser = (petaniUser: PetaniUser): void => {
    const petaniUserStringify = JSON.stringify(petaniUser);
    localStorage.setItem("petani_user", petaniUserStringify);
};

export const getLocalPetaniUser = () => {
    const stringify = localStorage.getItem("petani_user");
    if (stringify) {
        const petaniUser = JSON.parse(stringify);
        return petaniUser as PetaniUser;
    } else {
        return null;
    }
};

export const removeLocalKiosUser = () => {
    localStorage.removeItem("kios_user");
};

export const removeLocalPetaniUser = () => {
    localStorage.removeItem("petani_user");
};

export const useUserLocalPersistence = {
    setLocalKiosUser,
    getLocalKiosUser,
    removeLocalKiosUser,
    setLocalPetaniUser,
    getLocalPetaniUser,
    removeLocalPetaniUser,
};
