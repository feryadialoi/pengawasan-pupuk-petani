import { PetaniUserResponse } from "./PetaniUserResponse";
import { KiosUserResponse } from "./KiosUserResponse";
import { Role } from "../Role";
export interface LoginUserResponse {
    user: {
        role: Role;
        petani?: PetaniUserResponse;
        kios?: KiosUserResponse;
    };
    token: string;
}
