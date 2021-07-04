import { DetilTransaksiPenjualan } from "../models/DetilTransaksiPenjualan";
import { PenjualanRequest } from "../models/PenjualanRequest";
import { PenjualanRequestRequest } from "../models/requests/PenjualanRequestRequest";
import { DetilTransaksiPenjualanResponse } from "../models/responses/DetilTransaksiPenjualanResponse";
import { RincianPenjualanResponse, RincianPenjualanResponse2 } from "../models/responses/RincianPenjualanResponse";
import { TransaksiPenjualanResponse } from "../models/responses/TransaksiPenjualanResponse";
import { RincianPenjualan, RincianPenjualan2 } from "../models/RincianPenjualan";
import { TransaksiPenjualan } from "../models/TransaksiPenjualan";

export const mapRincianPenjualanResponseToRincianPenjualan = (
    rincianPenjualanResponse: RincianPenjualanResponse,
): RincianPenjualan => {
    const rincianPenjualan: RincianPenjualan = {
        id: rincianPenjualanResponse.id, //
        petaniId: rincianPenjualanResponse.petani_id,
        kelompokTaniId: rincianPenjualanResponse.kelompok_tani_id,
        kode: rincianPenjualanResponse.kode,
        tanggal: rincianPenjualanResponse.tanggal,
        createdAt: rincianPenjualanResponse.created_at, //
        total: rincianPenjualanResponse.total,
        petani: {
            id: rincianPenjualanResponse.petani.id,
            nama: rincianPenjualanResponse.petani.nama,
            alamat: rincianPenjualanResponse.petani.alamat,
        },
        kelompokTani: {
            id: rincianPenjualanResponse.kelompok_tani.id,
            nama: rincianPenjualanResponse.kelompok_tani.nama,
        },
        listRincian: rincianPenjualanResponse.list_rincian.map((item) => ({
            pupukId: item.pupuk_id,
            jumlah: item.jumlah,
            pupuk: {
                id: item.pupuk.id,
                nama: item.pupuk.nama,
                foto: item.pupuk.foto,
                deskripsi: item.pupuk.deskripsi,
                harga: item.pupuk.harga,
            },
            total: item.total,
        })),
    };

    return rincianPenjualan;
};

export const mapRincianPenjualanResponse2ToRincianPenjualan2 = (
    rincianPenjualanResponse: RincianPenjualanResponse2,
): RincianPenjualan2 => {
    return {
        createdAt: rincianPenjualanResponse.created_at,
        detil: rincianPenjualanResponse.detil.map((item) => ({
            harga: item.harga,
            id: item.id,
            kuantitas: item.kuantitas,
            penjualanId: item.penjualan_id,
            pupukId: item.pupuk_id,
            total: item.total,
        })),
        id: rincianPenjualanResponse.id,
        kiosId: rincianPenjualanResponse.kios_id,
        nomorTransaksi: rincianPenjualanResponse.nomor_transaksi,
        petaniId: rincianPenjualanResponse.petani_id,
        statusId: rincianPenjualanResponse.status_id,
        tanggal: rincianPenjualanResponse.tanggal,
        total: rincianPenjualanResponse.total,
    };
};

export const mapTransaksiPenjualanResponseToTransaksiPenjualan = (
    transaksiPenjualanResponse: TransaksiPenjualanResponse,
): TransaksiPenjualan => {
    return {
        id: transaksiPenjualanResponse.id,
        kode: transaksiPenjualanResponse.kode,
        petani: {
            nama: transaksiPenjualanResponse.petani.nama,
            alamat: transaksiPenjualanResponse.petani.alamat,
            kelompokTani: {
                id: transaksiPenjualanResponse.petani.kelompok_tani.id,
                nama: transaksiPenjualanResponse.petani.kelompok_tani.nama,
            },
            kelompokTaniId: transaksiPenjualanResponse.petani.kelompok_tani_id,
        },
        petaniId: transaksiPenjualanResponse.petani_id,
        tanggal: transaksiPenjualanResponse.tanggal,
    };
};

export const mapDetilTransaksiPenjualanResponseToDetilTransaksiPenjualan = (
    detilTransaksiPenjualanResponse: DetilTransaksiPenjualanResponse,
): DetilTransaksiPenjualan => {
    return {
        petaniId: detilTransaksiPenjualanResponse.petani_id,
        petani: {
            id: detilTransaksiPenjualanResponse.petani.id,
            nama: detilTransaksiPenjualanResponse.petani.nama,
            alamat: detilTransaksiPenjualanResponse.petani.alamat,
        },
        statusAuthorisasi: detilTransaksiPenjualanResponse.status_authorisasi,
        listRincian: detilTransaksiPenjualanResponse.list_rincian.map((item) => ({
            pupukId: item.pupuk_id,
            jumlah: item.jumlah,
            pupuk: {
                id: item.pupuk.id,
                nama: item.pupuk.nama,
                foto: item.pupuk.foto,
                deskripsi: item.pupuk.deskripsi,
                harga: item.pupuk.harga,
            },
            total: item.total,
        })),
        total: detilTransaksiPenjualanResponse.total,
    };
};

export const mapPenjualanToPenjualanRequest = (penjualanRequest: PenjualanRequest): PenjualanRequestRequest => {
    return {
        petani_id: penjualanRequest.petaniId,
        kelompok_tani_id: penjualanRequest.kelompokTaniId,
        list_pupuk: penjualanRequest.listPupuk.map((item) => ({
            jumlah: item.jumlah,
            pupuk_id: item.pupukId,
        })),
    };
};
