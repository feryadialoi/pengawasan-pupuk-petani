import { PenjualanPupukRequestRequest } from "./PenjualanPupukRequestRequest";

export interface PenjualanRequestRequest {
    kelompok_tani_id: number;
    petani_id: number;
    list_pupuk: PenjualanPupukRequestRequest[];
}
