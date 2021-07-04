import { Kios } from "../models/Kios";
import { KiosResponse } from "../models/responses/KiosResponse";

export const mapKiosResponseToKios = (kiosResponse: KiosResponse): Kios => {
    return {
        id: kiosResponse.id,
        nama: kiosResponse.nama,
        alamat: kiosResponse.nama,
    };
};
