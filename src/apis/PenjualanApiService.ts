import { UnauthorizedError } from "../errors/UnauthorizedError";
import {
    mapDetilTransaksiPenjualanResponseToDetilTransaksiPenjualan,
    mapPenjualanToPenjualanRequest,
    mapRincianPenjualanResponse2ToRincianPenjualan2,
    mapRincianPenjualanResponseToRincianPenjualan,
    mapTransaksiPenjualanResponseToTransaksiPenjualan,
} from "../mappers/PenjualanMapper";
import { ApiResponse } from "../models/responses/ApiResponse";
import { RincianPenjualanResponse, RincianPenjualanResponse2 } from "../models/responses/RincianPenjualanResponse";
import { RincianPenjualan, RincianPenjualan2 } from "../models/RincianPenjualan";
import { TransaksiPenjualan } from "../models/TransaksiPenjualan";
import { TransaksiPenjualanResponse } from "../models/responses/TransaksiPenjualanResponse";
import { apiService } from "./ApiService";
import { DetilTransaksiPenjualan } from "../models/DetilTransaksiPenjualan";
import { DetilTransaksiPenjualanResponse } from "../models/responses/DetilTransaksiPenjualanResponse";
import { PenjualanRequest } from "../models/PenjualanRequest";
import { PenjualanRequestRequest } from "../models/requests/PenjualanRequestRequest";

export const postKiosPenjualan = async (
    token: string,
    penjualanRequest: PenjualanRequest,
): Promise<RincianPenjualan> => {
    try {
        const url = "/api/v1/penjualan";
        const headers = {
            Authorization: "Bearer " + token,
        };

        const response = await apiService<PenjualanRequestRequest, ApiResponse<RincianPenjualanResponse>>({
            url: url,
            data: mapPenjualanToPenjualanRequest(penjualanRequest),
            headers: headers,
            method: "POST",
        });
        console.log(response.data);
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            return mapRincianPenjualanResponseToRincianPenjualan(apiResponseData);
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error);
    }
};

interface GetKiosListOfTransaksiPenjualanQueryString {
    tanggalAwal?: string;
    tanggalAkhir?: string;
    kelompokTaniId?: number;
    petaniId?: number;
}
interface GetKiosListOfTransaksiPenjualanQueryStringRequest {
    tanggal_awal?: string;
    tanggal_akhir?: string;
    kelompok_tani_id?: number;
    petani_id?: number;
}
/**
 * GET Collection of Transaksi Penjualan
 */
export const getKiosListOfTransaksiPenjualan = async (
    token: string,
    queryString: GetKiosListOfTransaksiPenjualanQueryString,
): Promise<TransaksiPenjualan[]> => {
    try {
        const url = "/api/v1/penjualan";
        const headers = {
            Authorization: "Bearer " + token,
        };

        const params: GetKiosListOfTransaksiPenjualanQueryStringRequest = {
            kelompok_tani_id: queryString.kelompokTaniId,
            petani_id: queryString.petaniId,
            tanggal_akhir: queryString.tanggalAkhir,
            tanggal_awal: queryString.tanggalAwal,
        };

        const response = await apiService<any, ApiResponse<TransaksiPenjualanResponse[]>>({
            method: "GET",
            url: url,
            headers: headers,
            params: params,
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            const listOfTransaksiPenjualan: TransaksiPenjualan[] = apiResponseData.map((item) =>
                mapTransaksiPenjualanResponseToTransaksiPenjualan(item),
            );

            return listOfTransaksiPenjualan;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error);
    }
};

interface GetKiosDetilTransaksiPenjualanQueryString {
    transaksiId?: number;
}

interface GetKiosDetilTransaksiPenjualanQueryStringRequest {
    transaksi_id?: number;
}
/**
 *
 * @param token
 * @param penjualanId
 * @param queryString
 */
export const getKiosDetilTransaksiPenjualan = async (
    token: string,
    penjualanId: number,
    queryString: GetKiosDetilTransaksiPenjualanQueryString,
): Promise<DetilTransaksiPenjualan> => {
    try {
        const url = "/api/v1/penjualan/" + penjualanId;
        const headers = {
            Authorization: "Bearer " + token,
        };
        const params: GetKiosDetilTransaksiPenjualanQueryStringRequest = {
            transaksi_id: queryString.transaksiId,
        };
        const response = await apiService<any, ApiResponse<DetilTransaksiPenjualanResponse>>({
            url: url,
            headers: headers,
            method: "GET",
            params: params,
        });
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            const detilTransaksiPenjualan: DetilTransaksiPenjualan = mapDetilTransaksiPenjualanResponseToDetilTransaksiPenjualan(
                apiResponseData,
            );

            return detilTransaksiPenjualan;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        console.log(error);
        throw new Error(error);
    }
};

export const getKiosDetilPenjualanShow = async (token: string, penjualanId: number): Promise<RincianPenjualan> => {
    try {
        const url = "/api/v1/penjualan/" + penjualanId + "/show";
        const headers = {
            Authorization: "Bearer " + token,
        };

        const response = await apiService<any, ApiResponse<RincianPenjualanResponse>>({
            url: url,
            method: "GET",
            headers: headers,
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            return mapRincianPenjualanResponseToRincianPenjualan(apiResponseData);
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error?.response?.data?.message ?? error?.message ?? error);
    }
};

export const usePenjualanApiService = {
    postKiosPenjualan,
    getKiosListOfTransaksiPenjualan,
    getKiosDetilTransaksiPenjualan,
    getKiosDetilPenjualanShow,
};
