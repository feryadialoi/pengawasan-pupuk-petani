import { PupukResponse } from "./PupukResponse";

export interface KuotaPupukPetaniResponse {
    pupuk_id: number;
    kuota: number;
    pupuk: PupukResponse;
}
