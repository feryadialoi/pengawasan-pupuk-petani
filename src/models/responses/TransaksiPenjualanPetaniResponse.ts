import { KelompokTaniResponse } from "./KelompokTaniResponse";

export interface TransaksiPenjualanPupukResponse {
    nama: string;
    alamat: string;
    kelompok_tani_id: number;
    kelompok_tani: KelompokTaniResponse;
}
