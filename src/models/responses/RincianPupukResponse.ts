import { PupukResponse } from "./PupukResponse";

export interface RincianPupukResponse {
    pupuk_id: number;
    jumlah: number;
    pupuk: PupukResponse;
    total: number;
}

export interface RincianPupukResponse2 {
    harga: number;
    id: number;
    kuantitas: number;
    penjualan_id: number;
    pupuk_id: number;
    total: number;
}
