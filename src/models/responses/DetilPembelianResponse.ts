import { PembelianPupukResponse } from "./PembelianPupukResponse";

export interface DetilPembelianResponse {
    id: number;
    OTP_id: number;
    kode: string;
    total: number;
    tanggal: string;
    list_rincian: PembelianPupukResponse[];
}
