import { KiosUser } from "./KiosUser";
import { PetaniUser } from "./PetaniUser";
import { Role } from "./Role";

export interface LoginUser {
    user: {
        role: Role;
        petani?: PetaniUser;
        kios?: KiosUser;
    };
    token: string;
}
