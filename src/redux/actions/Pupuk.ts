import { AddedToKeranjangPupuk } from "../../models/AddedToKeranjangPupuk";
import { KeranjangPupuk } from "../../models/KeranjangPupuk";
import { Pupuk } from "../../models/Pupuk";
import {
    PupukActionTypes,
    SET_ADDED_TO_KERANJANG_PUPUK,
    SET_LIST_OF_KERANJANG_PUPUK,
    SET_LIST_OF_PUPUK,
} from "../reducers/Pupuk";

export const setListOfPupukRedux = (payload: Pupuk[]): PupukActionTypes => ({
    type: SET_LIST_OF_PUPUK,
    payload,
});

export const setListOfKeranjangPupukRedux = (payload: KeranjangPupuk[]): PupukActionTypes => ({
    type: SET_LIST_OF_KERANJANG_PUPUK,
    payload,
});

export const setAddedToKeranjangPupukRedux = (payload: AddedToKeranjangPupuk): PupukActionTypes => ({
    type: SET_ADDED_TO_KERANJANG_PUPUK,
    payload,
});
