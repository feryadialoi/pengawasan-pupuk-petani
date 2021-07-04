export interface PetaniUserResponse {
    id: number;
    nama: string;
    ktp: string;
    tempat_lahir: string;
    tanggal_lahir: string;
    nama_ibu_kandung: string;
    alamat: string;
    subsektor: {
        nama: string;
    };
}
