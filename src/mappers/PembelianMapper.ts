import { Pembelian } from "../models/Pembelian";
import { PembelianResponse } from "../models/responses/PembelianResponse";
import { mapKiosResponseToKios } from "./KiosMapper";
import { mapPetaniResponseToPetani } from "./PetaniMapper";

export const mapPembelianResponseToPembelian = (pembelianResponse: PembelianResponse): Pembelian => {
    return {
        id: pembelianResponse.id,
        kios: mapKiosResponseToKios(pembelianResponse.kios),
        kiosId: pembelianResponse.kios_id,
        kode: pembelianResponse.kode,
        petani: mapPetaniResponseToPetani(pembelianResponse.petani),
        petaniId: pembelianResponse.petani_id,
        status: pembelianResponse.status,
        statusAutorisasi: pembelianResponse.status_autorisasi,
        tanggal: pembelianResponse.tanggal,
    };
};
