import { TransaksiPenjualanPetani } from "./TransaksiPenjualanPetani";

export interface TransaksiPenjualan {
    id: number;
    kode: string;
    petaniId: number;
    tanggal: string;
    petani: TransaksiPenjualanPetani;
}
