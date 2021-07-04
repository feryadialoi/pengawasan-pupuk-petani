import { PupukResponse } from "./PupukResponse";

export interface PembelianPupukResponse {
    jumlah: number;
    pupuk: PupukResponse;
    pupuk_id: number;
    total: number;
}
