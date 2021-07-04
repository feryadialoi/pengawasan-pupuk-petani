import { Petani } from "../../models/Petani";
import { PetaniActionTypes, SET_LIST_OF_PETANI } from "../reducers/Petani";

export const setListOfPetaniRedux = (payload: Petani[]): PetaniActionTypes => ({
    type: SET_LIST_OF_PETANI,
    payload,
});
