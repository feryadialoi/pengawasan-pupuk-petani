import { KiosResponse } from "./KiosResponse";
import { PetaniResponse } from "./PetaniResponse";

export interface PembelianResponse {
    id: number;
    kode: string;
    tanggal: string;
    petani_id: number;
    petani: PetaniResponse;
    kios_id: number;
    kios: KiosResponse;
    status_autorisasi: boolean;
    status: "SELESAI" | "MENUNGGU_KONFIRMASI";
}
