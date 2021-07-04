import { UnauthorizedError } from "../errors/UnauthorizedError";
import { mapPetaniResponseToPetani } from "../mappers/PetaniMapper";
import { Petani } from "../models/Petani";
import { ApiResponse } from "../models/responses/ApiResponse";
import { PetaniResponse } from "../models/responses/PetaniResponse";
import { apiService } from "./ApiService";

interface GetKiosListOfPetaniQueryString {
    kelompokTaniId?: number;
}
interface GetKiosListOfPetaniQueryStringRequest {
    kelompok_tani_id?: number;
}
type GetKiosListOfPetaniQueryStringRequestKeys = { [P in keyof GetKiosListOfPetaniQueryStringRequest]: any };
export const getKiosListOfPetani = async (
    token: string,
    queryString?: GetKiosListOfPetaniQueryString
): Promise<Petani[]> => {
    try {
        const url = "/api/v1/petani";
        const headers = {
            Authorization: "Bearer " + token,
        };
        const params: GetKiosListOfPetaniQueryStringRequestKeys = {};
        if (queryString) {
            params["kelompok_tani_id"] = queryString.kelompokTaniId;
        }
        const response = await apiService<any, ApiResponse<PetaniResponse[]>>({
            url: url,
            method: "GET",
            headers: headers,
            params: params,
        });

        const statusCode = response.status.toString();
        if (statusCode.substr(0, 1) === "2") {
            const apiResponseData = response.data.data;

            const listOfPetani: Petani[] = apiResponseData.map((item) => mapPetaniResponseToPetani(item));

            return listOfPetani;
        } else if (response.status === 401) {
            throw new UnauthorizedError("auth failed");
        } else {
            throw new Error("");
        }
    } catch (error) {
        throw new Error(error);
    }
};

export const usePetaniApiService = {
    getKiosListOfPetani,
};
