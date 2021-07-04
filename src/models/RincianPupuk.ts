import { Pupuk } from "./Pupuk";

export interface RincianPupuk {
    pupukId: number;
    jumlah: number;
    pupuk: Pupuk;
    total: number;
}

export interface RincianPupuk2 {
    harga: number;
    id: number;
    kuantitas: number;
    penjualanId: number;
    pupukId: number;
    total: number;
}
