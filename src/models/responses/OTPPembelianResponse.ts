import { PembelianPupukResponse } from "./PembelianPupukResponse";

export interface OTPPembelianResponse {
    id: number;
    kode: string;
    list_rincian: PembelianPupukResponse[];
    otp_id: number;
}
