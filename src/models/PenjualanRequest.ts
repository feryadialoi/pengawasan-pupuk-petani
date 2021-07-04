import { PenjualanPupukRequest } from "./PenjualanPupukRequest";

export interface PenjualanRequest {
    kelompokTaniId: number;
    petaniId: number;
    listPupuk: PenjualanPupukRequest[];
}
