import { UnauthorizedError } from "../errors/UnauthorizedError";
import { mapKuotaPupukPetaniResponseToPupuk, mapPupukTersediaResponseToPupukTersedia } from "../mappers/PupukMapper";
import { KuotaPupukPetani } from "../models/KuotaPupukPetani";
import { PupukTersedia } from "../models/PupukTersedia";
import { ApiResponse } from "../models/responses/ApiResponse";
import { KuotaPupukPetaniResponse } from "../models/responses/KuotaPupukPetaniResponse";
import { PupukTersediaResponse } from "../models/responses/PupukTersediaResponse";
import { apiService } from "./ApiService";

// KIOS
// =====================================================================================
interface GetKiosPupukSubsidiTersediaQueryString {
    kelompokTaniId?: number;
    petaniId?: number;
}
interface GetKiosPupukSubsidiTersediaQueryStringRequest {
    kelompok_tani_id?: number;
    petani_id?: number;
}

export const getPupukSubsidiTersedia = async (
    token: string,
    queryString?: GetKiosPupukSubsidiTersediaQueryString,
): Promise<PupukTersedia[]> => {
    try {
        const url = "/api/v1/pupuk-subsidi-tersedia";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const params: GetKiosPupukSubsidiTersediaQueryStringRequest = {};
        if (queryString) {
            if (queryString.kelompokTaniId) {
                params["kelompok_tani_id"] = queryString.kelompokTaniId;
            }

            if (queryString.petaniId) {
                params["petani_id"] = queryString.petaniId;
            }
        }
        const response = await apiService<
            any,
            ApiResponse<PupukTersediaResponse[]>,
            GetKiosPupukSubsidiTersediaQueryStringRequest
        >({
            url: url,
            headers: headers,
            method: "GET",
            params: params,
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            console.log(response.data);
            const apiResponseData = response.data.data;
            const listOfPupukTersedia = apiResponseData.map((item) => mapPupukTersediaResponseToPupukTersedia(item));
            return listOfPupukTersedia;
        } else if (response.status === 401) {
            throw new UnauthorizedError("auth failed");
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        throw new Error(error);
    }
};

interface GetKiosListOfKuotaPupukPetaniQueryString {
    petaniId?: number;
}
interface GetKiosListOfKuotaPupukPetaniQueryStringRequest {
    petani_id?: number;
}
export const getListOfKuotaPupukPetani = async (
    token: string,
    queryString?: GetKiosListOfKuotaPupukPetaniQueryString,
): Promise<KuotaPupukPetani[]> => {
    try {
        const url = "/api/v1/kuota-pupuk-petani";

        const params: GetKiosListOfKuotaPupukPetaniQueryStringRequest = {};
        if (queryString) {
            if (queryString.petaniId) {
                params["petani_id"] = queryString.petaniId;
            }
        }

        const headers = {
            Authorization: "Bearer " + token,
        };

        const response = await apiService<any, ApiResponse<KuotaPupukPetaniResponse[]>>({
            url: url,
            method: "GET",
            headers: headers,
            params: params,
        });
        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;
            const listOfKuotaPupukPetani: KuotaPupukPetani[] = apiResponseData.map((item) =>
                mapKuotaPupukPetaniResponseToPupuk(item),
            );

            return listOfKuotaPupukPetani;
        } else if (response.status === 401) {
            throw new UnauthorizedError("auth failed");
        } else {
            throw new Error("another error");
        }
    } catch (error) {
        console.log(error?.message);
        throw new Error(error);
    }
};

export const usePupukApiService = {
    getListOfKuotaPupukPetani,
    getPupukSubsidiTersedia,
};
