import { Petani } from "../models/Petani";
import { PetaniResponse } from "../models/responses/PetaniResponse";

export const mapPetaniResponseToPetani = (petaniResponse: PetaniResponse): Petani => {
    return {
        id: petaniResponse.id,
        nama: petaniResponse.nama,
        alamat: petaniResponse.alamat,
    };
};
