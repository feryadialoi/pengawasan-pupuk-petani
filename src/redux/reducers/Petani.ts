import { Petani } from "../../models/Petani";

export const SET_LIST_OF_PETANI = "SET_LIST_OF_PETANI";

export const SET_PETANI_OF_JUAL_PUPUK = "SET_PETANI_OF_JUAL_PUPUK";

export interface SetListOfPetani {
    type: typeof SET_LIST_OF_PETANI;
    payload: Petani[];
}

export interface SetPetaniOfJualPupuk {
    type: typeof SET_PETANI_OF_JUAL_PUPUK;
    payload: Petani;
}

export type PetaniActionTypes = SetListOfPetani | SetPetaniOfJualPupuk;

export interface PetaniState {
    listOfPetani: Petani[];
    petaniOfJualPupuk: Petani;
}

const initialState: PetaniState = {
    listOfPetani: [],
    petaniOfJualPupuk: {
        id: 0,
        nama: "",
        alamat: "",
    },
};

export const petaniReducer = (state = initialState, action: PetaniActionTypes): PetaniState => {
    switch (action.type) {
        case SET_LIST_OF_PETANI:
            return { ...state, listOfPetani: action.payload };
        case SET_PETANI_OF_JUAL_PUPUK:
            return { ...state, petaniOfJualPupuk: action.payload };
        default:
            return state;
    }
};
