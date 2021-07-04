import { KelompokTani } from "./KelompokTani";
import { Petani } from "./Petani";
import { RincianPupuk, RincianPupuk2 } from "./RincianPupuk";

export interface RincianPenjualan {
    id: number;
    petaniId: number;
    kelompokTaniId: number;
    kode: string;
    tanggal: string;
    createdAt: string;
    total: number;
    petani: Petani;
    kelompokTani: KelompokTani;
    listRincian: RincianPupuk[];
}

export interface RincianPenjualan2 {
    createdAt: string;
    detil: RincianPupuk2[];
    id: number;
    kiosId: number;
    nomorTransaksi: string;
    petaniId: number;
    statusId: number;
    tanggal: string;
    total: number;
}
