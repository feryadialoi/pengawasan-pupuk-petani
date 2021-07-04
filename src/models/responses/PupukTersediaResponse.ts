import { PupukResponse } from "./PupukResponse";

export interface PupukTersediaResponse {
    jumlah_pupuk_terjual: number;
    kuota_tersedia: number;
    pupuk: PupukResponse;
    pupuk_id: number;
}
