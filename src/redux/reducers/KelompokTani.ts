import { KelompokTani } from "../../models/KelompokTani";

export const SET_LIST_OF_KELOMPOK_TANI = "SET_LIST_OF_KELOMPOK_TANI";

export const SET_KELOMPOK_TANI_OF_JUAL_PUPUK = "SET_KELOMPOK_TANI_OF_JUAL_PUPUK";

export interface SetListOfKelompokTani {
    type: typeof SET_LIST_OF_KELOMPOK_TANI;
    payload: KelompokTani[];
}

export interface SetKelompokTaniOfJualPupuk {
    type: typeof SET_KELOMPOK_TANI_OF_JUAL_PUPUK;
    payload: KelompokTani;
}

export type KelompokTaniActionTypes = SetListOfKelompokTani | SetKelompokTaniOfJualPupuk;

export interface KelompokTaniState {
    listOfKelompokTani: KelompokTani[];
    kelompokTaniOfJualPupuk: KelompokTani;
}

const initialState: KelompokTaniState = {
    listOfKelompokTani: [],
    kelompokTaniOfJualPupuk: {
        id: 0,
        nama: "",
    },
};

export const KelompokTaniReducer = (state = initialState, action: KelompokTaniActionTypes): KelompokTaniState => {
    switch (action.type) {
        case SET_LIST_OF_KELOMPOK_TANI:
            return { ...state, listOfKelompokTani: action.payload };
        case SET_KELOMPOK_TANI_OF_JUAL_PUPUK:
            return { ...state, kelompokTaniOfJualPupuk: action.payload };
        default:
            return state;
    }
};
