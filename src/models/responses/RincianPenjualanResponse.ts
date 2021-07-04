import { KelompokTaniResponse } from "./KelompokTaniResponse";
import { PetaniResponse } from "./PetaniResponse";
import { RincianPupukResponse, RincianPupukResponse2 } from "./RincianPupukResponse";

export interface RincianPenjualanResponse {
    id: number;
    petani_id: number;
    kelompok_tani_id: number;
    kode: string;
    tanggal: string;
    created_at: string;
    total: number;
    petani: PetaniResponse;
    kelompok_tani: KelompokTaniResponse;
    list_rincian: RincianPupukResponse[];
}

export interface RincianPenjualanResponse2 {
    created_at: string;
    detil: RincianPupukResponse2[];
    id: number;
    kios_id: number;
    nomor_transaksi: string;
    petani_id: number;
    status_id: number;
    tanggal: string;
    total: number;
}
