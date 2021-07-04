import { TransaksiPenjualanPupukResponse } from "./TransaksiPenjualanPetaniResponse";

export interface TransaksiPenjualanResponse {
    id: number;
    kode: string;
    petani_id: number;
    tanggal: string;
    petani: TransaksiPenjualanPupukResponse;
}
