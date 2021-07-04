import { KelompokTani } from "../models/KelompokTani";
import { KelompokTaniResponse } from "../models/responses/KelompokTaniResponse";

export const mapKelompokTaniResponseToKelompokTani = (
    kelompokTaniResponse: KelompokTaniResponse
): KelompokTani => {
    return {
        id: kelompokTaniResponse.id,
        nama: kelompokTaniResponse.nama,
    };
};
