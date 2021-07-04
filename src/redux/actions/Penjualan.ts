import { RincianPenjualan, RincianPenjualan2 } from "../../models/RincianPenjualan";
import {
    PenjualanActionTypes,
    RESET_RINCIAN_PENJUALAN2,
    SET_RINCIAN_PENJUALAN,
    SET_RINCIAN_PENJUALAN2,
} from "../reducers/Penjualan";

export const setRincianPenjualanRedux = (payload: RincianPenjualan): PenjualanActionTypes => ({
    type: SET_RINCIAN_PENJUALAN,
    payload,
});

export const setRincianPenjualan2Redux = (payload: RincianPenjualan2): PenjualanActionTypes => ({
    type: SET_RINCIAN_PENJUALAN2,
    payload,
});

export const resetRincianPenjualan2Redux = (): PenjualanActionTypes => ({
    type: RESET_RINCIAN_PENJUALAN2,
});
