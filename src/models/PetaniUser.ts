import { Subsektor } from "./Subsektor";

export interface PetaniUser {
    id: number;
    alamat: string;
    ktp: string;
    nama: string;
    namaIbuKandung: string;
    subsektor: Subsektor;
    tanggalLahir: string;
    tempatLahir: string;
}
