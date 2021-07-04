import { AddedToKeranjangPupuk } from "../../models/AddedToKeranjangPupuk";
import { KeranjangPupuk } from "../../models/KeranjangPupuk";
import { Pupuk } from "../../models/Pupuk";

export const SET_LIST_OF_PUPUK = "SET_LIST_OF_PUPUK";

export const SET_LIST_OF_KERANJANG_PUPUK = "SET_LIST_OF_KERANJANG_PUPUK";

export const SET_ADDED_TO_KERANJANG_PUPUK = "SET_ADDED_TO_KERANJANG_PUPUK";

export interface SetListOfPupuk {
    type: typeof SET_LIST_OF_PUPUK;
    payload: Pupuk[];
}

export interface SetListOfKeranjangPupuk {
    type: typeof SET_LIST_OF_KERANJANG_PUPUK;
    payload: KeranjangPupuk[];
}

export interface SetAddedToKeranjangPupuk {
    type: typeof SET_ADDED_TO_KERANJANG_PUPUK;
    payload: AddedToKeranjangPupuk;
}

export type PupukActionTypes = SetListOfPupuk | SetListOfKeranjangPupuk | SetAddedToKeranjangPupuk;

export interface PupukState {
    listOfPupuk: Pupuk[];
    listOfKeranjangPupuk: KeranjangPupuk[];
    addedToKeranjangPupuk: AddedToKeranjangPupuk;
}

const initialState: PupukState = {
    listOfPupuk: [],
    listOfKeranjangPupuk: [],
    addedToKeranjangPupuk: {},
};

export const pupukReducer = (state = initialState, action: PupukActionTypes): PupukState => {
    switch (action.type) {
        case SET_LIST_OF_PUPUK:
            return { ...state, listOfPupuk: action.payload };
        case SET_LIST_OF_KERANJANG_PUPUK:
            return { ...state, listOfKeranjangPupuk: action.payload };
        case SET_ADDED_TO_KERANJANG_PUPUK:
            return { ...state, addedToKeranjangPupuk: action.payload };
        default:
            return state;
    }
};
