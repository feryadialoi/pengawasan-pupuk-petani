import { PetaniResponse } from "./PetaniResponse";
import { RincianPupukResponse } from "./RincianPupukResponse";

export interface DetilTransaksiPenjualanResponse {
    petani_id: number;
    petani: PetaniResponse;
    status_authorisasi: boolean;
    list_rincian: RincianPupukResponse[];
    total: number;
}
