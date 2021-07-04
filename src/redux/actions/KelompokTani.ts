import { KelompokTani } from "../../models/KelompokTani";
import {
    KelompokTaniActionTypes,
    SET_KELOMPOK_TANI_OF_JUAL_PUPUK,
    SET_LIST_OF_KELOMPOK_TANI,
} from "../reducers/KelompokTani";

export const setListOfKelompokTaniRedux = (payload: KelompokTani[]): KelompokTaniActionTypes => ({
    type: SET_LIST_OF_KELOMPOK_TANI,
    payload,
});

export const setKelompokTaniOfJualPupukRedux = (payload: KelompokTani): KelompokTaniActionTypes => ({
    type: SET_KELOMPOK_TANI_OF_JUAL_PUPUK,
    payload,
});
