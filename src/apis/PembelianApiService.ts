import { mapPembelianResponseToPembelian } from "../mappers/PembelianMapper";
import { Pembelian } from "../models/Pembelian";
import { ApiResponse } from "../models/responses/ApiResponse";
import { PembelianResponse } from "../models/responses/PembelianResponse";
import { apiService } from "./ApiService";

// PETANI
export const getPetaniListOfPembelianPupuk = async (token: string): Promise<Pembelian[]> => {
    try {
        const url = "/api/v1/pembelian";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const response = await apiService<any, ApiResponse<PembelianResponse[]>>({
            url: url,
            headers: headers,
            method: "GET",
        });
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            const listOfPembelian = apiResponseData.map((item) => mapPembelianResponseToPembelian(item));
            return listOfPembelian;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error?.response?.data?.message ?? error?.message ?? error);
    }
};

export const getPetaniDetilPembelianPupuk = async (token: string, pembelianId: number): Promise<any> => {
    try {
        const url = "/api/v1/pembelian" + pembelianId;
        const headers = {
            Authorization: "Bearer " + token,
        };
        const response = await apiService<any, ApiResponse<any>>({
            url: url,
            headers: headers,
            method: "GET",
        });
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            return response.data.data;
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error?.response?.data?.message ?? error?.message ?? error);
    }
};

export const usePembelianApiService = {
    getPetaniListOfPembelianPupuk,
    getPetaniDetilPembelianPupuk,
};
