import { RincianPenjualan, RincianPenjualan2 } from "../../models/RincianPenjualan";

export const SET_RINCIAN_PENJUALAN = "SET_RINCIAN_PENJUALAN";
export const SET_RINCIAN_PENJUALAN2 = "SET_RINCIAN_PENJUALAN2";
export const RESET_RINCIAN_PENJUALAN2 = "RESET_RINCIAN_PENJUALAN";

export interface SetRincianPenjualan {
    type: typeof SET_RINCIAN_PENJUALAN;
    payload: RincianPenjualan;
}

export interface SetRincianPenjualan2 {
    type: typeof SET_RINCIAN_PENJUALAN2;
    payload: RincianPenjualan2;
}

export interface ResetRincianPenjualan2 {
    type: typeof RESET_RINCIAN_PENJUALAN2;
}

export type PenjualanActionTypes = SetRincianPenjualan | SetRincianPenjualan2 | ResetRincianPenjualan2;

export interface PenjualanState {
    rincianPenjualan: RincianPenjualan;
    rincianPenjualan2: RincianPenjualan2;
}

const initialStateRincianPenjualan2: RincianPenjualan2 = {
    createdAt: "",
    detil: [],
    id: 0,
    kiosId: 0,
    nomorTransaksi: "",
    petaniId: 0,
    statusId: 0,
    tanggal: "",
    total: 0,
};

const initialState: PenjualanState = {
    rincianPenjualan: {
        id: 0,
        petaniId: 0,
        kelompokTaniId: 1,
        kode: "1233456789",
        tanggal: "2020-20-20",
        createdAt: "12333333333",
        total: 10000,
        petani: {
            id: 0,
            nama: "Subadrun",
            alamat: "Jalan Isekai",
        },
        kelompokTani: {
            id: 0,
            nama: "Tani Isekai",
        },
        listRincian: [],
    },
    rincianPenjualan2: {
        createdAt: "",
        detil: [],
        id: 0,
        kiosId: 0,
        nomorTransaksi: "",
        petaniId: 0,
        statusId: 0,
        tanggal: "",
        total: 0,
    },
};

export const penjualanReducer = (state = initialState, action: PenjualanActionTypes): PenjualanState => {
    switch (action.type) {
        case SET_RINCIAN_PENJUALAN:
            return { ...state, rincianPenjualan: action.payload };
        case SET_RINCIAN_PENJUALAN2:
            return { ...state, rincianPenjualan2: action.payload };
        case RESET_RINCIAN_PENJUALAN2:
            return { ...state, rincianPenjualan2: initialStateRincianPenjualan2 };
        default:
            return state;
    }
};
