import { KelompokTani } from "./KelompokTani";

export interface TransaksiPenjualanPetani {
    nama: string;
    alamat: string;
    kelompokTaniId: number;
    kelompokTani: KelompokTani;
}
