import { Petani } from "./Petani";
import { RincianPupuk } from "./RincianPupuk";

export interface DetilTransaksiPenjualan {
    petaniId: number;
    petani: Petani;
    statusAuthorisasi: boolean;
    listRincian: RincianPupuk[];
    total: number;
}
