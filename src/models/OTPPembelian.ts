import { PembelianPupuk } from "./PembelianPupuk";

export interface OTPPembelian {
    id: number;
    kode: string;
    listRincian: PembelianPupuk[];
    otpId: number;
}
