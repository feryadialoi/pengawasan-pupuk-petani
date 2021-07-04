import { KuotaPupukPetani } from "../models/KuotaPupukPetani";
import { Pupuk } from "../models/Pupuk";
import { PupukTersedia } from "../models/PupukTersedia";
import { KuotaPupukPetaniResponse } from "../models/responses/KuotaPupukPetaniResponse";
import { PupukResponse } from "../models/responses/PupukResponse";
import { PupukTersediaResponse } from "../models/responses/PupukTersediaResponse";

export const mapKuotaPupukPetaniResponseToPupuk = (
    kuotaPupukPetaniResponse: KuotaPupukPetaniResponse
): KuotaPupukPetani => {
    return {
        pupukId: kuotaPupukPetaniResponse.pupuk_id,
        kuota: kuotaPupukPetaniResponse.kuota,
        pupuk: mapPupukResponseToPupuk(kuotaPupukPetaniResponse.pupuk),
    };
};

export const mapPupukResponseToPupuk = (pupukResponse: PupukResponse): Pupuk => {
    return {
        id: pupukResponse.id,
        deskripsi: pupukResponse.deskripsi,
        foto: pupukResponse.foto,
        harga: pupukResponse.harga,
        nama: pupukResponse.nama,
    };
};

export const mapPupukTersediaResponseToPupukTersedia = (
    pupukTersediaResponse: PupukTersediaResponse
): PupukTersedia => {
    return {
        jumlahPupukTerjual: pupukTersediaResponse.jumlah_pupuk_terjual,
        kuotaTersedia: pupukTersediaResponse.kuota_tersedia,
        pupuk: mapPupukResponseToPupuk(pupukTersediaResponse.pupuk),
        pupukId: pupukTersediaResponse.pupuk_id,
    };
};
