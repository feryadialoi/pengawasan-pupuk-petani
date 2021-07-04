import { UnauthorizedError } from "../errors/UnauthorizedError";
import { mapKelompokTaniResponseToKelompokTani } from "../mappers/KelompokTaniMapper";
import { KelompokTani } from "../models/KelompokTani";
import { ApiResponse } from "../models/responses/ApiResponse";
import { KelompokTaniResponse } from "../models/responses/KelompokTaniResponse";
import { apiService } from "./ApiService";

export const getKiosListOfKelompokTani = async (token: string): Promise<KelompokTani[]> => {
    try {
        const url = "/api/v1/kelompok-tani";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const response = await apiService<any, ApiResponse<KelompokTaniResponse[]>>({
            method: "GET",
            url: url,
            headers: headers,
        });
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;

            const listOfKelompokTani: KelompokTani[] = apiResponseData.map((item) =>
                mapKelompokTaniResponseToKelompokTani(item)
            );

            return listOfKelompokTani;
        } else if (response.status === 401) {
            throw new UnauthorizedError("auth failed");
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const useKelompokTaniApiService = {
    getKiosListOfKelompokTani,
};
