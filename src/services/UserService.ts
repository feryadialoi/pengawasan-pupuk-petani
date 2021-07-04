import {
    getLocalKiosUser,
    getLocalPetaniUser,
    setLocalKiosUser,
    setLocalPetaniUser,
} from "../localpersistences/UserLocalPersistence";
import { KiosUser } from "../models/KiosUser";
import { PetaniUser } from "../models/PetaniUser";

export const setKiosUser = (kiosUser: KiosUser): void => {
    setLocalKiosUser(kiosUser);
};

export const setPetaniUser = (petaniUser: PetaniUser): void => {
    setLocalPetaniUser(petaniUser);
};

export const getKiosUser = (): KiosUser => {
    const kiosUser = getLocalKiosUser();
    if (kiosUser) {
        return kiosUser;
    }
    throw new Error("kios user null");
};

export const getPetaniUser = (): PetaniUser => {
    const petaniUser = getLocalPetaniUser();
    if (petaniUser) {
        return petaniUser;
    }
    throw new Error("petani user null");
};

export const userService = {
    setKiosUser,
    setPetaniUser,
    getKiosUser,
    getPetaniUser,
};
