import { Kios } from "./Kios";
import { Petani } from "./Petani";

export interface Pembelian {
    id: number;
    kode: string;
    tanggal: string;
    petaniId: number;
    petani: Petani;
    kiosId: number;
    kios: Kios;
    statusAutorisasi: boolean;
    status: "SELESAI" | "MENUNGGU_KONFIRMASI";
}
